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

    // Criar o produto no banco de dados
    const product = await Product.create({
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
    const tracking = await Tracking.create({
      location,
      event,
      trackingCode,
      destinationPoint,
      timestamp: new Date(),
    });

    // Verificar o endereço blockchain do usuário
    const account = req.user?.blockchainAddress;
    if (!account) {
      return res.status(401).json({
        error: "Usuário não autenticado ou endereço blockchain inválido.",
      });
    }

    try {
      // Interagir com o contrato inteligente para criar o fabricante
      await medicationTrackingContractInstance.methods
        .createManufacturer(manufacturerName, tradeName, cnpj)
        .send({ from: account });

      // Criar o produto no contrato inteligente
      await medicationTrackingContractInstance.methods
        .createProduct(
          product.id,
          productCode,
          commercialName,
          genericName,
          characteristics,
          batch,
          new Date(manufacturingDate).toISOString(),
          new Date(expirationDate).toISOString(),
          trackingCode,
          cnpj
        )
        .send({ from: account });

      // Adicionar o rastreamento no contrato inteligente
      await medicationTrackingContractInstance.methods
        .addTracking(
          tracking.id,
          location,
          event,
          tracking.timestamp.toISOString(),
          trackingCode,
          destinationPoint
        )
        .send({ from: account });
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
    const products = await medicationTrackingContractInstance.methods
      .getAllProducts()
      .call();

    res.status(200).json({ products });
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
    const products = await medicationTrackingContractInstance.methods
      .getProductsByCnpj(cnpj)
      .call();

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum produto encontrado para este CNPJ." });
    }

    res.status(200).json({ products });
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
      .getProductByTrackingCode(trackingCode)
      .call();

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

    // Adicionar rastreamento ao contrato
    await medicationTrackingContractInstance.methods
      .addTracking(
        trackingCode,
        location,
        event,
        new Date().toISOString(),
        destinationPoint
      )
      .send({ from: account });

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
      .getTrackingsByTrackingCode(trackingCode)
      .call();

    if (trackings.length === 0) {
      return res.status(404).json({
        message: "Nenhum rastreamento encontrado para esse trackingCode.",
      });
    }

    res.status(200).json({ trackings });
  } catch (error) {
    console.error("Erro ao obter rastreamentos pelo trackingCode:", error);
    res.status(500).json({
      error:
        "Erro ao buscar rastreamentos pelo trackingCode no contrato inteligente. Tente novamente.",
    });
  }
}

export async function getFinalDestinationByTrackingCode(req, res) {
  const { trackingCode } = req.params; // Espera que o trackingCode seja passado na URL

  try {
    const destination = await medicationTrackingContractInstance.methods
      .getFinalDestinationByTrackingCode(trackingCode)
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
