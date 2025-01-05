import { Product, Tracking } from "../models/index.js";

const productController = {
  // Criar um novo produto e adicionar o rastreamento inicial
  async createProduct(req, res) {
    const {
      productCode,
      commercialName,
      genericName,
      characteristics,
      dangerLevel,
      batch,
      manufacturingDate,
      expirationDate,
      manufacturerName,
      cnpj,
      tradeName,
      trackingCode,
      destinationPoint,
      location, // Esperando localização para rastreamento
      event, // Esperando evento para rastreamento
    } = req.body;

    try {
      // Criando um novo produto com os dados da requisição
      const product = await Product.create({
        productCode,
        commercialName,
        genericName,
        characteristics,
        dangerLevel,
        batch,
        manufacturingDate,
        expirationDate,
        manufacturerName,
        cnpj,
        tradeName,
        trackingCode,
        destinationPoint,
      });

      // Se localização e evento forem fornecidos, cria-se uma entrada de rastreamento
      if (location && event) {
        const tracking = await Tracking.create({
          location, // Localização para a entrada de rastreamento
          event, // Evento para a entrada de rastreamento
          trackingCode,
          destinationPoint,
          timestamp: new Date(), // Timestamp para o evento de rastreamento
        });

        res.status(201).json({
          product,
          tracking,
        });
      } else {
        // Caso localização e evento não sejam fornecidos, retorna o produto sem rastreamento
        res.status(201).json({
          product,
          message:
            "Produto criado, mas as informações de rastreamento não foram fornecidas.",
        });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Obter todos os produtos
  async getAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Obter produto pelo código de rastreamento
  async getProductByTrackingCode(req, res) {
    const { trackingCode } = req.params;

    try {
      const product = await Product.findOne({
        where: { trackingCode },
      });

      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Adicionar uma entrada de Tracking para os produtos
  async addTracking(req, res) {
    const { trackingCode, location, event, destinationPoint } = req.body;

    try {
      // Buscar todos os produtos com o trackingCode fornecido
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
      await Promise.all(
        products.map((product) => product.addTracking(tracking))
      );

      res.status(201).json(tracking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Obter todos os rastreamentos pelo trackingCode
  async getTrackingsByTrackingCode(req, res) {
    const { trackingCode } = req.params;

    try {
      const trackings = await Tracking.findAll({
        where: { trackingCode },
      });

      if (trackings.length === 0) {
        return res.status(404).json({
          error: "Nenhum rastreamento encontrado para esse trackingCode",
        });
      }

      res.status(200).json(trackings);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Obter produtos pelo CNPJ
  async getProductsByCNPJ(req, res) {
    const { cnpj } = req.body;

    try {
      // Buscar produtos com o CNPJ fornecido
      const products = await Product.findAll({ where: { cnpj } });

      if (products.length === 0) {
        return res
          .status(404)
          .json({ error: "Nenhum produto encontrado para esse CNPJ" });
      }

      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Obter o destino final a partir de um código de rastreamento
  async getFinalDestinationByTrackingCode(req, res) {
    const { trackingCode } = req.params;

    try {
      // Buscar o rastreamento mais recente com o trackingCode fornecido
      const tracking = await Tracking.findOne({
        where: { trackingCode },
        order: [["timestamp", "DESC"]], // Garantir que pegamos o rastreamento mais recente
      });

      if (!tracking) {
        return res.status(404).json({
          error: "Nenhum rastreamento encontrado para esse trackingCode",
        });
      }

      // Retornar o destino final
      res.status(200).json({ destinationPoint: tracking.destinationPoint });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default productController;
