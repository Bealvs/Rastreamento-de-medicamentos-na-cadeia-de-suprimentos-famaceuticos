import {
  web3,
  medicationTrackingContractInstance,
} from "../config/blockchain.js";

import Product from "../models/product.js";
import Tracking from "../models/tracking.js";

export async function createProduct(req, res) {
  try {
    const {
      productCode,
      commercialName,
      genericName,
      characteristics,
      batch,
      manufacturingDate,
      expirationDate,
      manufacturerName,
      cnpj,
      tradeName,
      trackingCode,
      location,
      event,
      destinationPoint,
    } = req.body;

    let product;
    let tracking;
    try {
      // Criar o produto no banco de dados
      product = await Product.create({
        productCode,
        commercialName,
        genericName,
        characteristics,
        batch,
        manufacturingDate,
        expirationDate,
        manufacturerName,
        cnpj,
        tradeName,
        trackingCode, // dangerLevel removido
      });

      // Criar o rastreamento no banco de dados
      tracking = await Tracking.create({
        location,
        event,
        trackingCode,
        destinationPoint,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Erro ao salvar no banco de dados:", error);
      return res.status(500).json({
        error:
          "Erro ao salvar produto e rastreamento no banco de dados. Tente novamente.",
      });
    }

    // Verificar o endereço blockchain do usuário
    const account = req.user?.blockchainAddress;
    if (!account) {
      return res.status(401).json({
        error: "Usuário não autenticado ou endereço blockchain inválido.",
      });
    }

    let gasEstimate = await medicationTrackingContractInstance.methods
      .owner()
      .estimateGas();

    // Obter o endereço do proprietário do contrato devido ao ganache não reconhecer outros endereço
    let ownerAddress;
    try {
      ownerAddress = await medicationTrackingContractInstance.methods
        .owner()
        .call();
    } catch (error) {
      console.error(
        "Erro ao obter o endereço do proprietário do contrato:",
        error
      );
      return res.status(500).json({
        error:
          "Erro ao obter o endereço do proprietário do contrato. Tente novamente.",
      });
    }

    // Converter datas para timestamps Unix (em segundos)
    const manufacturingTimestamp = Math.floor(
      new Date(manufacturingDate).getTime() / 1000
    );
    const expirationTimestamp = Math.floor(
      new Date(expirationDate).getTime() / 1000
    );

    try {
      gasEstimate = await medicationTrackingContractInstance.methods
        .createManufacturer(manufacturerName, tradeName, cnpj)
        .estimateGas({ from: ownerAddress });

      // Adiciona 10% a mais como margem de segurança
      let gasWithBuffer = (gasEstimate * 110n) / 100n; // 10% a mais de gás

      // Interagir com o contrato inteligente para criar o fabricante
      await medicationTrackingContractInstance.methods
        .createManufacturer(manufacturerName, tradeName, cnpj)
        .send({ from: ownerAddress, gas: gasWithBuffer });

      gasEstimate = await medicationTrackingContractInstance.methods
        .createProduct(
          product.id,
          productCode,
          commercialName,
          genericName,
          characteristics,
          batch,
          manufacturingTimestamp, // Passando o timestamp
          expirationTimestamp, // Passando o timestamp
          trackingCode,
          cnpj
        )
        .estimateGas({ from: ownerAddress });

      // Adiciona 10% a mais como margem de segurança
      gasWithBuffer = (gasEstimate * 110n) / 100n; // 10% a mais de gás

      // Criar o produto no contrato inteligente
      await medicationTrackingContractInstance.methods
        .createProduct(
          product.id,
          productCode,
          commercialName,
          genericName,
          characteristics,
          batch,
          manufacturingTimestamp, // Passando o timestamp
          expirationTimestamp, // Passando o timestamp
          trackingCode,
          cnpj
        )
        .send({ from: ownerAddress, gas: gasWithBuffer });

      gasEstimate = await medicationTrackingContractInstance.methods
        .addTracking(
          tracking.id,
          location,
          event,
          Math.floor(new Date(tracking.timestamp).getTime() / 1000),
          trackingCode,
          destinationPoint
        )
        .estimateGas({ from: ownerAddress });

      // Adiciona 10% a mais como margem de segurança
      gasWithBuffer = (gasEstimate * 110n) / 100n; // 10% a mais de gás

      // Adicionar o rastreamento no contrato inteligente
      await medicationTrackingContractInstance.methods
        .addTracking(
          tracking.id,
          location,
          event,
          Math.floor(new Date(tracking.timestamp).getTime() / 1000),
          trackingCode,
          destinationPoint
        )
        .send({ from: ownerAddress, gas: gasWithBuffer });
    } catch (error) {
      console.error("Erro ao interagir com o contrato inteligente:", error);
      return res.status(500).json({
        error:
          "Erro ao interagir com o contrato inteligente. Verifique o endereço da blockchain ou tente novamente.",
      });
    }

    // Responder com sucesso
    res.status(201).json({
      message: "Produto e rastreamento criados com sucesso!",
      product,
      tracking,
    });
  } catch (error) {
    console.error("Erro ao criar produto e rastreamento:", {
      message: error.message,
      stack: error.stack,
      data: req.body,
    });
    res.status(500).json({ error: "Erro ao criar produto e rastreamento." });
  }
}

export async function getAllProducts(req, res) {
  try {
    // Obter todos os produtos
    const products = await medicationTrackingContractInstance.methods
      .getAllProducts()
      .call();

    // Converter BigInt para objetos Date e reestruturar dados
    const productsWithDates = products.map((product) => {
      return {
        id: product[0],
        productCode: product[1],
        commercialName: product[2],
        genericName: product[3],
        characteristics: product[4],
        batch: product[5],
        manufacturingDate: new Date(Number(product[6].toString()) * 1000),
        expirationDate: new Date(Number(product[7].toString()) * 1000),
        trackingCode: product[8],
        manufacturer: {
          manufacturerName: product[9][0],
          tradeName: product[9][1],
          cnpj: product[9][2],
        },
      };
    });

    res.status(200).json({ products: productsWithDates });
  } catch (error) {
    console.error("Erro ao obter todos os produtos:", error);
    res.status(500).json({
      error: "Erro ao obter produtos do contrato inteligente. Tente novamente.",
    });
  }
}

export async function getProductsByCNPJ(req, res) {
  const { cnpj } = req.body;

  try {
    // Obter os produtos pelo CNPJ
    const products = await medicationTrackingContractInstance.methods
      .getProductsByCnpj(cnpj)
      .call();

    // Verificar se não há produtos encontrados
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum produto encontrado para este CNPJ." });
    }

    // Converter BigInt para objetos Date e reestruturar os produtos
    const productsWithDates = products.map((product) => ({
      id: product[0],
      productCode: product[1],
      commercialName: product[2],
      genericName: product[3],
      characteristics: product[4],
      batch: product[5],
      manufacturingDate: new Date(Number(product[6].toString()) * 1000), // Converter para milissegundos
      expirationDate: new Date(Number(product[7].toString()) * 1000), // Converter para milissegundos
      trackingCode: product[8],
      manufacturer: {
        manufacturerName: product[9][0],
        tradeName: product[9][1],
        cnpj: product[9][2],
      },
    }));

    // Retornar os produtos com as datas convertidas
    res.status(200).json({ products: productsWithDates });
  } catch (error) {
    console.error("Erro ao obter produtos pelo CNPJ:", error);
    res.status(500).json({
      error:
        "Erro ao buscar produtos pelo CNPJ no contrato inteligente. Tente novamente.",
    });
  }
}

export async function addTracking(req, res) {
  const { trackingCode, location, event, destinationPoint } = req.body;

  try {
    // Verificar se o trackingCode já existe no contrato
    const product = await medicationTrackingContractInstance.methods
      .getTrackingsByCode(trackingCode)
      .call();

    console.log(product)

    if (!product) {
      return res
        .status(404)
        .json({ error: "Produto com esse trackingCode não encontrado." });
    }

    const products = await Product.findAll({ where: { trackingCode } });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ error: "Nenhum produto encontrado com esse trackingCode" });
    }

    // Criar o novo tracking
    const tracking = await Tracking.create({
      location,
      event,
      timestamp: new Date(),
      destinationPoint,
      trackingCode,
    });

    // Associar o tracking a todos os produtos encontrados
    await Promise.all(products.map((product) => product.addTracking(tracking)));

    // Verificar o endereço blockchain do usuário
    const account = req.user?.blockchainAddress;
    if (!account) {
      return res.status(401).json({
        error: "Usuário não autenticado ou endereço blockchain inválido.",
      });
    }

    // Obter o endereço do proprietário do contrato devido ao ganache não reconhecer outros endereço
    let ownerAddress;
    try {
      ownerAddress = await medicationTrackingContractInstance.methods
        .owner()
        .call();
    } catch (error) {
      console.error(
        "Erro ao obter o endereço do proprietário do contrato:",
        error
      );
      return res.status(500).json({
        error:
          "Erro ao obter o endereço do proprietário do contrato. Tente novamente.",
      });
    }

    console.log(ownerAddress);

    // Estimar o gás para a transação
    let gasEstimate = await medicationTrackingContractInstance.methods
      .addTracking(
        tracking.id,
        location,
        event,
        Math.floor(new Date().getTime() / 1000), // Em segundos
        trackingCode,
        destinationPoint
      )
      .estimateGas({ from: ownerAddress });

    // Adicionar 10% a mais como margem de segurança
    let gasWithBuffer = (gasEstimate * 110n) / 100n; // 10% a mais de gás
    console.log("Gás estimado com margem de segurança:", gasWithBuffer);

    // Adicionar rastreamento ao contrato
    await medicationTrackingContractInstance.methods
      .addTracking(
        tracking.id,
        location,
        event,
        Math.floor(new Date().getTime() / 1000), // Em segundos
        trackingCode,
        destinationPoint
      )
      .send({ from: ownerAddress, gas: gasWithBuffer });

    res
      .status(200)
      .json({ message: "Rastreamento adicionado com sucesso!", tracking });
  } catch (error) {
    console.error("Erro ao adicionar rastreamento:", error);
    res.status(500).json({
      error:
        "Erro ao adicionar rastreamento ao contrato inteligente. Tente novamente.",
    });
  }
}

export async function getTrackingsByTrackingCode(req, res) {
  const { trackingCode } = req.params;

  try {
    const trackings = await medicationTrackingContractInstance.methods
      .getTrackingsByCode(trackingCode)
      .call();

    // Verificar se não há rastreamentos encontrados
    if (trackings.length === 0) {
      return res.status(404).json({
        message: "Nenhum rastreamento encontrado para esse trackingCode.",
      });
    }

    // Converter BigInt para objetos Date e reestruturar os rastreamentos
    const formattedTrackings = trackings.map((tracking) => ({
      id: tracking[0], // ID do rastreamento
      location: tracking[1], // Localização
      status: tracking[2], // Status
      timestamp: new Date(
        Number(BigInt(tracking[3].toString())) * 1000 // Converter BigInt para milissegundos e para Date
      ).toISOString(), // Convertido para formato ISO
      trackingCode: tracking[4], // Tracking code
      destinationPoint: tracking[5], // Destino
    }));

    res.status(200).json({ trackings: formattedTrackings });
  } catch (error) {
    console.error("Erro ao obter rastreamentos pelo trackingCode:", error);
    res.status(500).json({
      error:
        "Erro ao buscar rastreamentos pelo trackingCode no contrato inteligente. Tente novamente.",
    });
  }
}

export async function getFinalDestinationByTrackingCode(req, res) {
  const { trackingCode } = req.params;

  try {
    const destination = await medicationTrackingContractInstance.methods
      .getDestinationPointByTrackingCode(trackingCode)
      .call();

    if (!destination) {
      return res.status(404).json({
        message: "Destino final não encontrado para esse trackingCode.",
      });
    }

    res.status(200).json({ destination });
  } catch (error) {
    console.error("Erro ao obter destino final pelo trackingCode:", error);
    res.status(500).json({
      error:
        "Erro ao buscar destino final no contrato inteligente. Tente novamente.",
    });
  }
}
