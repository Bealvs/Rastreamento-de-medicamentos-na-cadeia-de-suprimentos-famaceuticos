import express from 'express';
import { JsonRpcProvider, ethers } from 'ethers';
import batchRoutes from './routers/batchRouters.js';
// import PharmaSupplyChainABI from './abi/PharmaSupplyChainABI.json';

class App {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
    // this.blockchainSetup();
  }

  // Configuração do servidor
  config() {
    this.app.use(express.json());
  }

  // Configuração das rotas
  routes() {
    this.app.use('/api/batches', batchRoutes);
  }

  // Conexão com a blockchain
  // blockchainSetup() {
  //   const provider = new JsonRpcProvider(
  //     `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
  //   );

  //   const contractAddress = process.env.CONTRACT_ADDRESS;
  //   const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  //   const contract = new ethers.Contract(contractAddress, PharmaSupplyChainABI, wallet);

  //   // Middleware para disponibilizar o contrato na request
  //   this.app.use((req, res, next) => {
  //     req.contract = contract;
  //     next();
  //   });
  // }

  // Método para iniciar o servidor
  listen(port) {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}

export default App;
