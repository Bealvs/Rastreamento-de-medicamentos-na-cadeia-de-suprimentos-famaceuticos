import Product from "../models/product.js"; // Importing the Product model.
import Tracking from "../models/tracking.js"; // Importing the Tracking model.

const productController = {
  // Create a new product and add initial tracking
  async createProduct(req, res) {
    const { trackingCode, destinationPoint, ...productData } = req.body;

    try {
      // Creating a new product using the data from the request body
      const product = await Product.create({
        ...productData,
        trackingCode,
        destinationPoint,
      });

      // Automatically adding an initial tracking entry for the product
      const tracking = await Tracking.create({
        productId: product.id,
        location: "Initial location", // You can modify this default value as needed
        event: "Product created",
        timestamp: new Date(),
      });

      res.status(201).json({
        product,
        tracking,
      }); // Responding with the created product and tracking
    } catch (error) {
      res.status(400).json({ error: error.message }); // Handling errors and sending status 400
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
    const { location, event, timestamp } = req.body;

    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const tracking = await Tracking.create({
        location,
        event,
        timestamp,
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
