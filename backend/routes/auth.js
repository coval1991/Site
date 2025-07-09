const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const blockchainService = require('../utils/blockchain');
const { rateLimiter } = require('../middleware/auth');

const router = express.Router();

// Rate limiting para rotas de auth
router.use(rateLimiter(15 * 60 * 1000, 20)); // 20 requests por 15 minutos

// Login com wallet (MetaMask)
router.post('/wallet-login', async (req, res) => {
  try {
    const { walletAddress, signature, message } = req.body;

    if (!walletAddress || !signature || !message) {
      return res.status(400).json({ 
        error: 'Endereço da wallet, assinatura e mensagem são obrigatórios' 
      });
    }

    // Verificar se o endereço é válido
    if (!blockchainService.isValidAddress(walletAddress)) {
      return res.status(400).json({ error: 'Endereço da wallet inválido' });
    }

    // Buscar ou criar usuário
    let user = await User.findOne({ 
      walletAddress: walletAddress.toLowerCase() 
    });

    if (!user) {
      user = new User({
        walletAddress: walletAddress.toLowerCase()
      });
      
      // Gerar código de afiliado
      user.generateAffiliateCode();
      await user.save();
    }

    // Atualizar saldo de tokens CFD
    try {
      const cfdBalance = await blockchainService.getCFDBalance(walletAddress);
      user.cfdBalance = parseFloat(cfdBalance);
      
      // Verificar período de posse se ainda não foi definido
      if (!user.firstTokenPurchase && user.cfdBalance > 0) {
        const holdingInfo = await blockchainService.checkHoldingPeriod(walletAddress);
        if (holdingInfo.firstPurchase) {
          user.firstTokenPurchase = holdingInfo.firstPurchase;
        }
      }
      
      await user.save();
    } catch (error) {
      console.error('Erro ao atualizar saldo CFD:', error);
    }

    // Gerar JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        walletAddress: user.walletAddress 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        walletAddress: user.walletAddress,
        cfdBalance: user.cfdBalance,
        isAdmin: user.isAdmin,
        isEligibleForDividends: user.isEligibleForDividends,
        affiliateCode: user.affiliateCode,
        firstTokenPurchase: user.firstTokenPurchase
      }
    });

  } catch (error) {
    console.error('Erro no login com wallet:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Login admin com senha
router.post('/admin-login', async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Senha é obrigatória' });
    }

    // Verificar senha admin
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Buscar ou criar usuário admin
    let adminUser = await User.findOne({ isAdmin: true });
    
    if (!adminUser) {
      adminUser = new User({
        walletAddress: '0x0000000000000000000000000000000000000000',
        isAdmin: true
      });
      await adminUser.save();
    }

    // Gerar JWT token
    const token = jwt.sign(
      { 
        userId: adminUser._id, 
        walletAddress: adminUser.walletAddress,
        isAdmin: true
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: adminUser._id,
        walletAddress: adminUser.walletAddress,
        isAdmin: adminUser.isAdmin
      }
    });

  } catch (error) {
    console.error('Erro no login admin:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Verificar token
router.get('/verify', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    res.json({
      valid: true,
      user: {
        id: user._id,
        walletAddress: user.walletAddress,
        cfdBalance: user.cfdBalance,
        isAdmin: user.isAdmin,
        isEligibleForDividends: user.isEligibleForDividends,
        affiliateCode: user.affiliateCode
      }
    });

  } catch (error) {
    console.error('Erro na verificação do token:', error);
    res.status(401).json({ error: 'Token inválido' });
  }
});

// Logout (invalidar token no frontend)
router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logout realizado com sucesso' });
});

module.exports = router;

