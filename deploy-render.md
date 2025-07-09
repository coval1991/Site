# Deploy no Render - CasinoFound

Este guia explica como fazer deploy do projeto CasinoFound na plataforma Render.

## Pré-requisitos

1. Conta no [Render](https://render.com)
2. Conta no [GitHub](https://github.com) (para conectar o repositório)
3. Projeto CasinoFound em um repositório Git

## Passo 1: Preparar o Repositório

1. Faça upload do projeto para um repositório GitHub
2. Crie um arquivo `render.yaml` na raiz do projeto:

```yaml
services:
  - type: web
    name: casinofound-backend
    env: node
    buildCommand: cd backend && npm install
    startCommand: cd backend && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5000
      - key: MONGODB_URI
        fromDatabase:
          name: casinofound-mongodb
          property: connectionString
      - key: JWT_SECRET
        generateValue: true
      - key: POLYGON_RPC_URL
        value: https://polygon-rpc.com
      - key: CFD_TOKEN_ADDRESS
        value: 0x7fE9eE1975263998D7BfD7ed46CAD44Ee62A63bE
      - key: AFFILIATE_MANAGER_ADDRESS
        value: 0x2f6737CFDE18D201C3300C1C87e70f620C38F68C
      - key: ICO_PHASE1_ADDRESS
        value: 0x8008A571414ebAF2f965a5a8d34D78cEfa8BD8bD
      - key: USDT_ADDRESS
        value: 0xc2132D05D31c914a87C6611C10748AEb04B58e8F

  - type: web
    name: casinofound-frontend
    env: static
    buildCommand: cd frontend/casinofound-frontend && npm install && npm run build
    staticPublishPath: frontend/casinofound-frontend/dist
    envVars:
      - key: VITE_API_URL
        value: https://casinofound-backend.onrender.com

databases:
  - name: casinofound-mongodb
    databaseName: casinofound
    user: casinofound_user
```

## Passo 2: Configurar MongoDB

### Opção A: MongoDB Atlas (Recomendado)

1. Crie uma conta no [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crie um cluster gratuito
3. Configure acesso de rede (0.0.0.0/0 para Render)
4. Crie um usuário de banco de dados
5. Obtenha a string de conexão

### Opção B: MongoDB no Render

1. No Render, vá em "New" → "PostgreSQL" (Render não oferece MongoDB nativo)
2. Para MongoDB, use um provedor externo como MongoDB Atlas

## Passo 3: Deploy do Backend

1. No Render, clique em "New" → "Web Service"
2. Conecte seu repositório GitHub
3. Configure:
   - **Name**: casinofound-backend
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Auto-Deploy**: Yes

4. Configure variáveis de ambiente:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/casinofound
   JWT_SECRET=sua-chave-jwt-super-secreta
   POLYGON_RPC_URL=https://polygon-rpc.com
   CFD_TOKEN_ADDRESS=0x7fE9eE1975263998D7BfD7ed46CAD44Ee62A63bE
   AFFILIATE_MANAGER_ADDRESS=0x2f6737CFDE18D201C3300C1C87e70f620C38F68C
   ICO_PHASE1_ADDRESS=0x8008A571414ebAF2f965a5a8d34D78cEfa8BD8bD
   USDT_ADDRESS=0xc2132D05D31c914a87C6611C10748AEb04B58e8F
   ADMIN_WALLET_ADDRESS=0xSeuEnderecoDeAdmin
   ```

## Passo 4: Deploy do Frontend

1. Crie outro Web Service para o frontend
2. Configure:
   - **Name**: casinofound-frontend
   - **Environment**: Static Site
   - **Build Command**: `cd frontend/casinofound-frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/casinofound-frontend/dist`

3. Configure variáveis de ambiente:
   ```
   VITE_API_URL=https://casinofound-backend.onrender.com
   VITE_NETWORK_ID=137
   VITE_CFD_TOKEN_ADDRESS=0x7fE9eE1975263998D7BfD7ed46CAD44Ee62A63bE
   ```

## Passo 5: Configurar Domínios Personalizados

1. **Backend**:
   - Vá em Settings → Custom Domains
   - Adicione `api.seudominio.com`
   - Configure DNS CNAME apontando para o Render

2. **Frontend**:
   - Adicione `seudominio.com` e `www.seudominio.com`
   - Configure DNS conforme instruído

## Passo 6: Configurar CORS

Atualize o backend para aceitar requisições do frontend:

```javascript
// No arquivo server.js
app.use(cors({
  origin: [
    'https://casinofound-frontend.onrender.com',
    'https://seudominio.com',
    'https://www.seudominio.com'
  ],
  credentials: true
}));
```

## Passo 7: Configurar Health Checks

Adicione um endpoint de health check no backend:

```javascript
// No arquivo server.js
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

## Passo 8: Inicializar Dados

Após o deploy, inicialize as fases da ICO:

```bash
curl -X POST https://casinofound-backend.onrender.com/api/ico/admin/initialize \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_ADMIN"
```

## Configurações Avançadas

### 1. Configurar Redis (Opcional)

Para cache, use Redis Cloud:
1. Crie conta no [Redis Cloud](https://redis.com/redis-enterprise-cloud/)
2. Adicione a URL do Redis nas variáveis de ambiente
3. Configure no backend para usar Redis

### 2. Configurar Logs

```javascript
// Adicionar no backend
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### 3. Configurar Monitoramento

Integre com serviços como:
- **Sentry** para error tracking
- **LogRocket** para session replay
- **New Relic** para APM

## Custos Estimados

- **Web Services**: $7/mês cada (2 serviços = $14/mês)
- **MongoDB Atlas**: $0-9/mês (cluster gratuito disponível)
- **Total estimado**: $14-23/mês

## Backup e Segurança

### Backup do MongoDB Atlas
```bash
# Usando mongodump
mongodump --uri="mongodb+srv://usuario:senha@cluster.mongodb.net/casinofound"

# Backup automático via GitHub Actions
name: Backup Database
on:
  schedule:
    - cron: '0 2 * * *'  # Diário às 2h
jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - name: Backup MongoDB
        run: |
          mongodump --uri="${{ secrets.MONGODB_URI }}"
          # Upload para S3 ou outro storage
```

### Configurações de Segurança
```javascript
// Adicionar no backend
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por IP
}));
```

## Troubleshooting

### Build Falha
- Verifique os logs de build no Render
- Confirme que todas as dependências estão no package.json
- Verifique se os caminhos estão corretos

### Erro de Conexão com MongoDB
- Teste a string de conexão localmente
- Verifique se o IP do Render está na whitelist do MongoDB Atlas
- Confirme usuário e senha

### Frontend não carrega API
- Verifique se VITE_API_URL está correto
- Confirme que o backend está rodando
- Verifique configuração de CORS

## Comandos Úteis

```bash
# Testar API localmente
curl https://casinofound-backend.onrender.com/health

# Ver logs (via Render CLI se disponível)
render logs casinofound-backend

# Redeploy manual
git push origin main  # Se auto-deploy estiver ativo
```

## CI/CD com GitHub Actions

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Render
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: |
          curl -X POST "${{ secrets.RENDER_DEPLOY_HOOK }}"
```

## Próximos Passos

1. Configure SSL personalizado se necessário
2. Implemente monitoramento de uptime
3. Configure alertas para erros
4. Otimize performance com CDN
5. Configure backup automático

Para suporte adicional, consulte a [documentação do Render](https://render.com/docs).

