# Medication Tracking System

Este projeto é um sistema de rastreamento de medicamentos baseado em blockchain, utilizando Truffle, Ganache, Node.js, PostgreSQL, e React com Vite. O objetivo é fornecer uma aplicação confiável para rastrear medicamentos na cadeia de suprimentos farmacêuticos.

## Tecnologias Utilizadas

### Back-end
- **Node.js**: Plataforma para execução de código JavaScript no servidor.
- **Express**: Framework web para o back-end.
- **PostgreSQL**: Banco de dados relacional para armazenar informações persistentes.
- **Sequelize**: ORM (Object-Relational Mapping) para interação com o banco de dados PostgreSQL.

### Blockchain
- **Truffle**: Framework para desenvolvimento de contratos inteligentes.
- **Ganache**: Ferramenta para simular um blockchain Ethereum local.
- **Solidity**: Linguagem de programação para contratos inteligentes.

### Front-end
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Vite**: Ferramenta para desenvolvimento front-end, otimizada para performance.
- **React-Bootstrap**: Biblioteca de componentes de interface baseada no Bootstrap.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:
- **Node.js** (versão 18 ou superior)
- **PostgreSQL**
- **Ganache** (disponível como interface gráfica ou CLI)
- **Truffle** (instalado globalmente via npm)

## Configuração do Banco de Dados

Crie um banco de dados PostgreSQL com as seguintes credenciais:
```
DB_NAME=medicationTracking
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
```
Container Docker se tiver instalado docker:
```bash
docker run -e POSTGRES_DB=medicationTracking -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

## Instruções para Execução

### 1. Configurar o Blockchain Local

1. Inicie o Ganache para criar um blockchain local.
2. Navegue para o diretório do blockchain:
   ```bash
   cd blockchain
   ```
3. No diretório, compile e implante os contratos inteligentes com os comandos:
   ```bash
   truffle compile
   truffle migrate
   ```
4. Verifique se os contratos foram devidamente registrado na rede do ganache.

> [!NOTE]
> Porta do ganache = 7545
> 
> Se for alterar os dados do ganache, alterar no `.env` do backend e no arquivo `truffle-config.js` (blockchain\truffle-config.js)

### 2. Configurar o Back-end

1. Navegue para o diretório do back-end:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` no diretório `backend` e adicione as seguintes variáveis de ambiente:
   ```env
   NODE_ENV=development
   JWT_SECRET=chave
   PORT=3000
   
   DB_NAME=medicationTracking
   DB_USER=postgres
   DB_PASSWORD=nlmfr2018
   DB_HOST=localhost
   
   GANACHE_URL=http://127.0.0.1:7545
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```

### 3. Configurar o Front-end

1. Navegue para o diretório do front-end:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

### 4. Testar a Aplicação

1. Acesse o front-end em seu navegador através de `http://localhost:5173`.
2. O back-end estará disponível em `http://localhost:3000`.
3. O Ganache estará ouvindo em `http://127.0.0.1:7545`.

## Estrutura do Projeto

```
Rastreamento-de-medicamentos-na-cadeia-de-suprimentos-famaceuticos/
├── backend/       # Código do back-end
├── frontend/      # Código do front-end
├── blockchain/    # Código da blockchain
└── README.md      # Documentação do projeto
```

## Contribuidores

- **Responsáveis pelo Front-end**:
  - [Beatriz Alves](https://github.com/Bealvs)
  - [Rakel Torres](https://github.com/rakeltorres)
- **Responsáveis pelos Contratos Inteligentes**:
  - [Jennyfer Rocha](https://github.com/jennyferrocha)
  - [Maria Dalva](https://github.com/Mariadalva25)
- **Responsável pelo Back-end**:
  - [Felipe Ferraz](https://github.com/FelipeFerraz4)

## Considerações Finais

Se encontrar algum problema ou tiver dúvidas sobre o projeto, entre em contato com os responsáveis ou abra uma issue no repositório do projeto.
