import Web3 from "web3";
import helloWorldJSON from "../../../blockchain/build/contracts/HelloWorld.json" assert { type: "json" };
import dotenv from "dotenv";

dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});

const { GANACHE_URL, HELLOWORLD_ADDRESS } = process.env;

if (!GANACHE_URL) {
  throw new Error(
    "Por favor, configure a variável GANACHE_URL no arquivo .env"
  );
}

// Inicializar o Web3
const web3 = new Web3(GANACHE_URL);

// Função para obter o endereço do contrato dinamicamente em desenvolvimento
const getContractAddress = async () => {
  if (process.env.NODE_ENV === "production") {
    if (!HELLOWORLD_ADDRESS) {
      throw new Error(
        "Por favor, configure a variável HELLOWORLD_ADDRESS no arquivo .env.production"
      );
    }
    return HELLOWORLD_ADDRESS;
  } else {
    // Em desenvolvimento, obtenha o endereço dinamicamente
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = helloWorldJSON.networks[networkId];

    if (!deployedNetwork) {
      throw new Error("Contrato não implantado na rede especificada.");
    }

    return deployedNetwork.address;
  }
};

// Função para criar uma instância do contrato
const createContractInstance = async () => {
  try {
    const contractAddress = await getContractAddress();
    const helloWorldABI = helloWorldJSON.abi;

    const helloWorldcontractInstance = new web3.eth.Contract(
      helloWorldABI,
      contractAddress
    );

    console.log(`Contrato configurado no endereço: ${contractAddress}`);
    return helloWorldcontractInstance;
  } catch (error) {
    console.error("Erro ao criar a instância do contrato:", error);
    throw error;
  }
};

const helloWorldcontractInstance = await createContractInstance();

export { web3, helloWorldcontractInstance };
