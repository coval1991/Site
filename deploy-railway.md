# Deploy no Railway - CasinoFound

Este guia explica como fazer deploy do projeto CasinoFound na plataforma Railway.

## Pré-requisitos

1. Conta no [Railway](https://railway.app)
2. Conta no [GitHub](https://github.com) (para conectar o repositório)
3. Projeto CasinoFound em um repositório Git

## Passo 1: Preparar o Repositório

1. Faça upload do projeto para um repositório GitHub
2. Certifique-se de que todos os arquivos estão commitados:
   ```bash
   git add .
   git commit -m "Deploy inicial CasinoFound"
   git push origin main
   ```

## Passo 2: Configurar MongoDB

1. No Railway, clique em "New Project"
2. Selecione "Deploy from GitHub repo"
3. Conecte seu repositório
4. Adicione um serviço MongoDB:
   - Clique em "Add Service" → "Database" → "MongoDB"
   - Anote as credenciais geradas

## Passo 3: Configurar Backend

1. Adicione um novo serviço para o backend:
   - Clique em "Add Service" → "GitHub Repo"
   - Selecione seu repositório
   - Configure o Root Directory: `backend`

2. Configure as variáveis de ambiente:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb://[usuario]:[senha]@[host]:[porta]/casinofound
   JWT_SECRET=sua-chave-jwt-super-secreta
   POLYGON_RPC_URL=https://polygon-rpc.com
   CFD_TOKEN_ADDRESS=0x7fE9eE1975263998D7BfD7ed46CAD44Ee62A63bE
   AFFILIATE_MANAGER_ADDRESS=0x2f6737CFDE18D201C3300C1C87e70f620C38F68C
   ICO_PHASE1_ADDRESS=0x8008A571414ebAF2f965a5a8d34D78cEfa8BD8bD
   USDT_ADDRESS=0xc2132D05D31c914a87C6611C10748AEb04B58e8F
   ADMIN_WALLET_ADDRESS=0xSeuEnderecoDeAdmin
   ```

3. Configure o comando de build e start:
   - Build Command: `npm install`
   - Start Command: `npm start`

## Passo 4: Configurar Frontend

1. Adicione outro serviço para o frontend:
   - Clique em "Add Service" → "GitHub Repo"
   - Selecione seu repositório
   - Configure o Root Directory: `frontend/casinofound-frontend`

2. Configure as variáveis de ambiente:
   ```
   VITE_API_URL=https://[seu-backend-url].railway.app
   VITE_NETWORK_ID=137
   VITE_CFD_TOKEN_ADDRESS=0x7fE9eE1975263998D7BfD7ed46CAD44Ee62A63bE
   ```

3. Configure os comandos:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run preview`

## Passo 5: Configurar Domínios

1. Para o backend:
   - Vá em Settings → Networking
   - Configure um domínio personalizado ou use o gerado
   - Anote a URL (ex: `https://backend-production-xxxx.railway.app`)

2. Para o frontend:
   - Configure domínio personalizado
   - Atualize a variável `VITE_API_URL` com a URL do backend

## Passo 6: Configurar CORS

No backend, certifique-se de que o CORS está configurado para aceitar requisições do frontend:

```javascript
// No arquivo server.js
app.use(cors({
  origin: [
    'https://seu-frontend.railway.app',
    'https://seu-dominio-personalizado.com'
  ],
  credentials: true
}));
```

## Passo 7: Inicializar Banco de Dados

1. Acesse o terminal do serviço backend no Railway
2. Execute o comando para inicializar as fases da ICO:
   ```bash
   curl -X POST https://seu-backend.railway.app/api/ico/admin/initialize \
     -H "Authorization: Bearer SEU_TOKEN_ADMIN"
   ```

## Passo 8: Configurar SSL e Domínio Personalizado

1. No Railway, vá em Settings → Networking
2. Adicione seu domínio personalizado
3. Configure os registros DNS conforme instruído
4. O SSL será configurado automaticamente

## Monitoramento e Logs

1. **Logs**: Acesse através do painel Railway
2. **Métricas**: Monitore CPU, memória e rede
3. **Alertas**: Configure notificações para problemas

## Backup do Banco de Dados

Configure backups regulares do MongoDB:

1. Use o Railway CLI para fazer backup:
   ```bash
   railway run mongodump --uri="sua-mongodb-uri"
   ```

2. Configure backups automáticos usando GitHub Actions ou cron jobs

## Custos Estimados

- **Starter Plan**: $5/mês por serviço
- **MongoDB**: ~$5-10/mês dependendo do uso
- **Total estimado**: $15-25/mês

## Troubleshooting

### Erro de Conexão com MongoDB
- Verifique se a URI está correta
- Confirme que o MongoDB está rodando
- Verifique as configurações de rede

### Frontend não carrega
- Verifique se a build foi bem-sucedida
- Confirme se a variável `VITE_API_URL` está correta
- Verifique os logs do serviço

### Erro de CORS
- Atualize a configuração de CORS no backend
- Certifique-se de que o domínio do frontend está na lista

## Comandos Úteis

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Conectar ao projeto
railway link

# Ver logs
railway logs

# Executar comandos no serviço
railway run [comando]

# Deploy manual
railway up
```

## Próximos Passos

1. Configure monitoramento com ferramentas como Sentry
2. Implemente CI/CD com GitHub Actions
3. Configure backups automáticos
4. Monitore performance e otimize conforme necessário

Para suporte adicional, consulte a [documentação do Railway](https://docs.railway.app).

