# U4Hero Ranking - Guia de Inicialização

## Pré-requisitos
- Node.js 18+
- npm 9+
- MYSQL instalado para uso no CLI ou XAMPP

---

## 1. Clonando o projeto
```bash
git clone https://github.com/PedroOrPeter/ranking-test.git
cd ranking-test
```

---

## 2. Configurando o Backend

### Instale as dependências:
```bash
cd backend
npm install
```

### Configure o banco de dados
- Edite o arquivo `.env` na pasta `backend` com sua string de conexão do PostgreSQL:
  ```env
  DATABASE_URL="mysql://root:@localhost:3306/u4hero_ranking"
  ```

### Crie o banco de dados e rode as migrations:
```bash
npx prisma migrate deploy
```

### Inicie o backend:
```bash
npm run dev
```
A API estará disponível em `http://localhost:3000` (ou porta definida no .env).

---

## 3. Configurando o Frontend

### Instale as dependências:
```bash
cd ../frontend
npm install
```

### Inicie o frontend:
```bash
npm run dev
```
Acesse `http://localhost:5173` no navegador.

---

## 4. Documentação da API
Acesse `http://localhost:3000/api-docs` para visualizar a documentação Swagger interativa.

---

## Scripts úteis

- **Iniciar backend:**
  ```bash
  cd backend && npm run dev
  ```
- **Iniciar frontend:**
  ```bash
  cd frontend && npm run dev
  ```
- **Criar nova migration Prisma:**
  ```bash
  cd backend
  npx prisma migrate dev --name nome_da_migration
  ```
- **Abrir o Prisma Studio:**
  ```bash
  cd backend
  npx prisma studio
  ```

---

## Novas Funcionalidades
**Conquistas**
Pretendo inserir, como já é possível verificar, conquistas dentro do sistema. A ideia é fazer com que conquistas vire algo bem importante, como *10 Vendas em 1 semana* e ai o usuário poderia ser sinalizado com uma conquista por isso. Enfim, é algo que vou incrementar e infelizmente ainda não deu tempo.

**Hospedagem Vercel**
Pretendo hospedar em breve na Vercel, para isso, gostaria da aplicação mais robusta e preparada para requisições em massa
