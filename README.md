# CasinoFound (CFD) - Plataforma de Casino Online

![CasinoFound Logo](https://via.placeholder.com/400x100/1a1a2e/ffd700?text=CasinoFound)

**CasinoFound** é uma plataforma inovadora de casino online financiada por criptomoeda, construída na rede Polygon. O projeto oferece uma experiência completa de investimento e participação nos lucros através do token CFD.

## 🎯 Visão Geral

O CasinoFound combina entretenimento de casino com oportunidades de investimento em criptomoeda, permitindo que holders do token CFD recebam dividendos mensais dos lucros da plataforma.

### Características Principais

- 🎰 **Plataforma de Casino**: Jogos online com tecnologia blockchain
- 💰 **Token CFD**: Token ERC-20 na rede Polygon
- 📈 **ICO em 3 Fases**: Venda estruturada de tokens
- 💎 **Dividendos Mensais**: 60% dos lucros distribuídos para holders
- 🔗 **Integração Web3**: Conectividade com MetaMask
- 👥 **Sistema de Afiliados**: Programa de referência
- 📊 **Painéis Administrativos**: Gestão completa da plataforma

## 🏗️ Arquitetura do Projeto

```
casinofound/
├── frontend/                 # React + Vite + TailwindCSS
│   └── casinofound-frontend/
├── backend/                  # Node.js + Express + MongoDB
├── docker-compose.yml        # Orquestração de containers
├── Dockerfile.backend        # Container do backend
├── Dockerfile.frontend       # Container do frontend
├── install.sh               # Script de instalação
└── docs/                    # Documentação adicional
```

## 🚀 Início Rápido

### Pré-requisitos

- Docker e Docker Compose
- Node.js 20+ (para desenvolvimento local)
- Git

### Instalação com Docker (Recomendado)

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/casinofound.git
   cd casinofound
   ```

2. **Execute o script de instalação**:
   ```bash
   chmod +x install.sh
   ./install.sh
   ```

3. **Configure as variáveis de ambiente**:
   - Edite o arquivo `.env` com suas configurações
   - Altere senhas e chaves de segurança

4. **Acesse a aplicação**:
   - Frontend: http://localhost
   - Backend API: http://localhost:5000

### Instalação Manual

#### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edite o arquivo .env com suas configurações
npm run dev
```

#### Frontend
```bash
cd frontend/casinofound-frontend
npm install
npm run dev
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env.production`:

```env
# Banco de Dados
MONGODB_URI=mongodb://localhost:27017/casinofound
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=SuaSenhaSegura123!

# Segurança
JWT_SECRET=sua-chave-jwt-super-secreta

# Blockchain
POLYGON_RPC_URL=https://polygon-rpc.com
CFD_TOKEN_ADDRESS=0x7fE9eE1975263998D7BfD7ed46CAD44Ee62A63bE
AFFILIATE_MANAGER_ADDRESS=0x2f6737CFDE18D201C3300C1C87e70f620C38F68C
ICO_PHASE1_ADDRESS=0x8008A571414ebAF2f965a5a8d34D78cEfa8BD8bD
USDT_ADDRESS=0xc2132D05D31c914a87C6611C10748AEb04B58e8F

# Admin
ADMIN_WALLET_ADDRESS=0xSeuEnderecoDeAdmin
```

### Contratos Inteligentes

O projeto integra com os seguintes contratos na rede Polygon:

- **Token CFD**: `0x7fE9eE1975263998D7BfD7ed46CAD44Ee62A63bE`
- **Affiliate Manager**: `0x2f6737CFDE18D201C3300C1C87e70f620C38F68C`
- **ICO Fase 1**: `0x8008A571414ebAF2f965a5a8d34D78cEfa8BD8bD`
- **USDT**: `0xc2132D05D31c914a87C6611C10748AEb04B58e8F`

## 📋 Funcionalidades

### 🏠 Página Principal
- Apresentação do projeto CasinoFound
- Whitepaper integrado
- Links para redes sociais e contratos
- Timer de contagem regressiva para fases da ICO
- Botão de compra de tokens com integração MetaMask

### 💰 Sistema de ICO

#### Fase 1 - Early Bird
- **Preço**: $0,01 por token
- **Supply**: 8% (1.680.000 tokens)
- **Bônus**: 20%
- **Período**: Janeiro - Junho 2024

#### Fase 2 - Public Sale
- **Preço**: $0,05 por token
- **Supply**: 20% (4.200.000 tokens)
- **Bônus**: 10%
- **Período**: Julho - Dezembro 2024

#### Fase 3 - Final Sale
- **Preço**: $1,00 por token
- **Supply**: 10% (2.100.000 tokens)
- **Bônus**: 0%
- **Período**: Janeiro - Junho 2025

### 📊 Dashboard do Holder

- Visualização de saldo CFD atual
- Histórico de compras na ICO
- Dividendos disponíveis e histórico
- Projeção de rendimentos
- Status de elegibilidade para dividendos

### 👑 Painel Administrativo

- Gestão de fases da ICO
- Criação de distribuições de dividendos
- Estatísticas detalhadas
- Gerenciamento de usuários
- Monitoramento de transações

### 💎 Sistema de Dividendos

- **Elegibilidade**: Manter tokens por 30+ dias
- **Distribuição**: 60% dos lucros mensais
- **Moeda**: USDT
- **Frequência**: Mensal
- **Reivindicação**: Manual através do dashboard

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19** - Framework principal
- **Vite** - Build tool e dev server
- **TailwindCSS** - Framework CSS
- **Ethers.js** - Integração Web3
- **Framer Motion** - Animações
- **Radix UI** - Componentes acessíveis

### Backend
- **Node.js** - Runtime
- **Express** - Framework web
- **MongoDB** - Banco de dados
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação
- **Ethers.js** - Integração blockchain

### DevOps
- **Docker** - Containerização
- **Docker Compose** - Orquestração
- **Nginx** - Proxy reverso
- **GitHub Actions** - CI/CD

## 🔐 Segurança

### Medidas Implementadas

- **Autenticação JWT** com tokens seguros
- **Rate Limiting** para prevenir ataques
- **Validação de entrada** em todas as rotas
- **CORS** configurado adequadamente
- **Helmet.js** para headers de segurança
- **Validação de endereços** Ethereum
- **Sanitização de dados** de entrada

### Auditoria de Contratos

Os contratos inteligentes foram auditados e verificados:
- ✅ Token CFD verificado no PolygonScan
- ✅ Contratos de ICO auditados
- ✅ Sistema de afiliados testado

## 📈 API Documentation

### Endpoints Principais

#### Autenticação
```
POST /api/auth/login          # Login com carteira
POST /api/auth/verify-wallet  # Verificar assinatura
```

#### Blockchain
```
GET  /api/blockchain/wallet/:address           # Info da carteira
GET  /api/blockchain/balance/cfd/:address      # Saldo CFD
GET  /api/blockchain/holding-period/:address   # Período de posse
```

#### ICO
```
GET  /api/ico/status                    # Status atual da ICO
POST /api/ico/purchase                  # Comprar tokens
GET  /api/ico/purchases/:walletAddress  # Histórico de compras
```

#### Dividendos
```
GET  /api/dividends/info/:walletAddress      # Info de dividendos
POST /api/dividends/claim                    # Reivindicar dividendos
GET  /api/dividends/projection/:walletAddress # Projeção de rendimentos
```

### Exemplos de Uso

#### Obter Status da ICO
```bash
curl -X GET https://api.casinofound.com/api/ico/status
```

#### Comprar Tokens
```bash
curl -X POST https://api.casinofound.com/api/ico/purchase \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "walletAddress": "0x...",
    "amountInMatic": 10,
    "phase": 1,
    "txHash": "0x...",
    "affiliateCode": "REF123"
  }'
```

## 🚀 Deploy

### Opções de Deploy

1. **Railway** - [Guia completo](deploy-railway.md)
2. **Render** - [Guia completo](deploy-render.md)
3. **VPS próprio** - Use Docker Compose

### Deploy Rápido no Railway

1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Deploy Rápido no Render

1. Conecte seu repositório GitHub
2. Configure MongoDB Atlas
3. Configure variáveis de ambiente
4. Deploy automático

## 🧪 Testes

### Executar Testes

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend/casinofound-frontend
npm test

# Testes de integração
npm run test:integration

# Testes E2E
npm run test:e2e
```

### Testar Contratos

```bash
cd backend
node scripts/test-contracts.js
```

## 📊 Monitoramento

### Métricas Importantes

- **Uptime** da aplicação
- **Tempo de resposta** da API
- **Uso de recursos** (CPU, memória)
- **Transações blockchain** processadas
- **Erros** e exceções

### Ferramentas Recomendadas

- **Sentry** - Error tracking
- **New Relic** - APM
- **LogRocket** - Session replay
- **Uptime Robot** - Monitoramento de uptime

## 🤝 Contribuição

### Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- **ESLint** para JavaScript/TypeScript
- **Prettier** para formatação
- **Conventional Commits** para mensagens
- **Testes** obrigatórios para novas features

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Suporte

### Canais de Suporte

- **Email**: suporte@casinofound.com
- **Telegram**: @CasinoFoundSupport
- **Discord**: [CasinoFound Community](https://discord.gg/casinofound)
- **GitHub Issues**: Para bugs e feature requests

### FAQ

**P: Como compro tokens CFD?**
R: Conecte sua carteira MetaMask e use o botão "Comprar Tokens" na página principal.

**P: Quando recebo dividendos?**
R: Dividendos são distribuídos mensalmente para holders que mantêm tokens por 30+ dias.

**P: Como me torno elegível para dividendos?**
R: Mantenha tokens CFD em sua carteira por pelo menos 30 dias consecutivos.

**P: Posso vender meus tokens?**
R: Sim, após o lançamento oficial na exchange.

## 🗺️ Roadmap

### Q1 2024
- ✅ Lançamento da ICO Fase 1
- ✅ Desenvolvimento da plataforma
- ✅ Integração Web3

### Q2 2024
- 🔄 ICO Fase 2
- 🔄 Beta da plataforma de casino
- 🔄 Programa de afiliados

### Q3 2024
- 📅 Lançamento oficial do casino
- 📅 Primeiras distribuições de dividendos
- 📅 Listagem em exchanges

### Q4 2024
- 📅 ICO Fase 3
- 📅 Expansão de jogos
- 📅 Mobile app

## 📈 Tokenomics

### Distribuição do Token CFD (21M total)

- **ICO**: 38% (8M tokens)
- **Equipe**: 15% (3.15M tokens)
- **Marketing**: 10% (2.1M tokens)
- **Reserva**: 20% (4.2M tokens)
- **Liquidez**: 10% (2.1M tokens)
- **Parcerias**: 7% (1.47M tokens)

### Uso dos Fundos

- **Desenvolvimento**: 40%
- **Marketing**: 25%
- **Operações**: 20%
- **Legal/Compliance**: 10%
- **Reserva**: 5%

---

**Desenvolvido com ❤️ pela equipe CasinoFound**

*Este projeto é apenas para fins educacionais e de demonstração. Não constitui aconselhamento financeiro.*

