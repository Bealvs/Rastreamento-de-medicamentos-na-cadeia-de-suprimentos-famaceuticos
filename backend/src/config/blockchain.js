import Web3 from "web3";
import helloWorldJSON from "../../../blockchain/build/contracts/HelloWorld.json" assert { type: "json" };
import MedicationTrackingJSON from "../../../blockchain/build/contracts/MedicationTracking.json" assert { type: "json" };
import dotenv from "dotenv";

dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});

const { GANACHE_URL, HELLOWORLD_ADDRESS, MEDICATIONTRACKING_ADDRESS } =
  process.env;

if (!GANACHE_URL) {
  throw new Error(
    "Por favor, configure a variável GANACHE_URL no arquivo .env"
  );
}

// Inicializar o Web3
const web3 = new Web3(GANACHE_URL);

// Função para obter o endereço do contrato dinamicamente em desenvolvimento
const getContractAddress = async (contractJSON, envAddress) => {
  if (process.env.NODE_ENV === "production") {
    if (!envAddress) {
      throw new Error(
        "Por favor, configure a variável de endereço do contrato no arquivo .env.production"
      );
    }
    return envAddress;
  } else {
    // Em desenvolvimento, obtenha o endereço dinamicamente
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = contractJSON.networks[networkId];

    if (!deployedNetwork) {
      throw new Error("Contrato não implantado na rede especificada.");
    }

    return deployedNetwork.address;
  }
};

// Função para criar uma instância de um contrato
const createContractInstance = async (contractJSON, envAddress) => {
  try {
    const contractAddress = await getContractAddress(contractJSON, envAddress);
    const contractABI = contractJSON.abi;

    const contractInstance = new web3.eth.Contract(
      contractABI,
      contractAddress
    );

    console.log(`Contrato configurado no endereço: ${contractAddress}`);
    return contractInstance;
  } catch (error) {
    console.error("Erro ao criar a instância do contrato:", error);
    throw error;
  }
};

// Criar instâncias dos contratos
const helloWorldContractInstance = await createContractInstance(
  helloWorldJSON,
  HELLOWORLD_ADDRESS
);

const medicationTrackingContractInstance = await createContractInstance(
  MedicationTrackingJSON,
  MEDICATIONTRACKING_ADDRESS
);

export { web3, helloWorldContractInstance, medicationTrackingContractInstance };
