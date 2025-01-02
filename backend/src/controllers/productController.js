import Product from "../models/product.js"; // Importing the Product model.
import Tracking from "../models/tracking.js"; // Importing the Tracking model.

const productController = {
  // Create a new product and add initial tracking
  async createProduct(req, res) {
    // Destructuring the incoming request body to extract the product data and tracking information
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
      location,  // Expecting location for tracking
      event,      // Expecting event for tracking
    } = req.body;

    try {
      // Creating a new product using the data from the request body
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

      // If location and event are provided, automatically adding an initial tracking entry for the product
      if (location && event) {
        const tracking = await Tracking.create({
          productId: product.id,
          location,   // Location for the tracking entry
          event,      // Event for the tracking entry
          timestamp: new Date(),  // Current timestamp for the tracking event
        });

        // Responding with the created product and the initial tracking entry
        res.status(201).json({
          product,
          tracking,
        });
      } else {
        // If location and event are not provided, returning the product created without tracking
        res.status(201).json({
          product,
          message: "Product created, but tracking information was not provided.",
        });
      }
    } catch (error) {
      // Handling errors and sending status 400
      res.status(400).json({ error: error.message });
    }
  },

  // Get all products
  async getAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get product by tracking code
  async getProductByTrackingCode(req, res) {
    const { trackingCode } = req.params;

    try {
      const product = await Product.findOne({
        where: { trackingCode },
      });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get products by manufacturer
  async getProductsByManufacturer(req, res) {
    const { manufacturerName } = req.params;
    try {
      const products = await Product.findAll({
        where: { manufacturerName },
      });
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get products by status
  async getProductsByStatus(req, res) {
    const { status } = req.params;
    try {
      const products = await Product.findAll({
        where: { status },
      });
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Add a Tracking entry for a product
  async addTracking(req, res) {
    const { productId } = req.params;
    const { location, event } = req.body;

    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const tracking = await Tracking.create({
        location,
        event,
        timestamp: new Date(), // Automatically using the current date and time
        productId,
      });

      res.status(201).json(tracking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all Trackings for a product
  async getTrackingsByProduct(req, res) {
    const { productId } = req.params;

    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const trackings = await Tracking.findAll({
        where: { productId },
      });

      res.status(200).json(trackings);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default productController;
