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

## Instruções para Execução

### 1. Configurar o Blockchain Local

1. Inicie o Ganache para criar um blockchain local.
2. No diretório do projeto, compile e implante os contratos inteligentes com os comandos:
   ```bash
   truffle compile
   truffle migrate
   ```
3. Anote o endereço do contrato implantado fornecido no terminal.

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
   DB_NAME=medicationTracking
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_HOST=localhost
   BLOCKCHAIN_CONTRACT_ADDRESS=<endereço_do_contrato>
   BLOCKCHAIN_PROVIDER=http://127.0.0.1:7545
   JWT_SECRET=<sua_chave_secreta>
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
project-root/
├── backend/       # Código do back-end
├── contracts/     # Contratos inteligentes em Solidity
├── frontend/      # Código do front-end
├── migrations/    # Scripts de migração para contratos
├── build/         # Artefatos compilados do Truffle
└── README.md      # Documentação do projeto
```

## Contribuidores

- **Responsáveis pelo Front-end**:
  - Desenvolvedor 1
  - Desenvolvedor 2
- **Responsáveis pelos Contratos Inteligentes**:
  - Desenvolvedor 3
  - Desenvolvedor 4
- **Responsável pelo Back-end**:
  - Desenvolvedor 5

## Considerações Finais

Se encontrar algum problema ou tiver dúvidas sobre o projeto, entre em contato com os responsáveis ou abra uma issue no repositório do projeto.
