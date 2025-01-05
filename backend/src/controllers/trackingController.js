import { Product, Tracking } from "../models/index.js";

const trackingController = {
  // Criar uma nova entrada de Tracking
  async createTracking(req, res) {
    const { location, event, trackingCode, destinationPoint } = req.body;

    try {
      // Criando um novo rastreamento com os dados passados
      const tracking = await Tracking.create({
        location,
        event,
        timestamp: new Date(),
        trackingCode,
        destinationPoint,
      });

      // Buscar todos os produtos com o trackingCode fornecido
      const products = await Product.findAll({ where: { trackingCode } });
      if (products.length === 0) {
        return res
          .status(404)
          .json({ error: "Nenhum produto encontrado com esse trackingCode" });
      }

      // Associar o rastreamento a todos os produtos encontrados
      await Promise.all(
        products.map((product) => product.addTracking(tracking))
      );

      res.status(201).json(tracking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Buscar todos os rastreamentos
  async getAllTrackings(req, res) {
    try {
      const trackings = await Tracking.findAll();
      res.status(200).json(trackings);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Buscar uma entrada de Tracking pelo ID
  async getTrackingById(req, res) {
    const { trackingId } = req.params;

    try {
      const tracking = await Tracking.findByPk(trackingId, {
        include: Product, // Incluindo os produtos associados ao tracking
      });
      if (!tracking) {
        return res.status(404).json({ error: "Tracking não encontrado" });
      }
      res.status(200).json(tracking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default trackingController;
