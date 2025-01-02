import Product from "../models/product.js"; // Importing the Product model.
import Tracking from "../models/tracking.js"; // Importing the Tracking model.

const productController = {
  // Create a new product
  async createProduct(req, res) {
    try {
      // Creating a new product using the data from the request body
      const product = await Product.create(req.body);
      res.status(201).json(product); // Responding with the created product and status 201
    } catch (error) {
      res.status(400).json({ error: error.message }); // Handling errors and sending status 400
    }
  },

  // Get all products
  async getAllProducts(req, res) {
    try {
      // Fetching all products from the database
      const products = await Product.findAll();
      res.status(200).json(products); // Responding with the list of products and status 200
    } catch (error) {
      res.status(400).json({ error: error.message }); // Handling errors and sending status 400
    }
  },

  // Get products by manufacturer
  async getProductsByManufacturer(req, res) {
    const { manufacturerName } = req.params; // Extracting the manufacturer name from the request parameters
    try {
      // Fetching products filtered by the manufacturer name
      const products = await Product.findAll({
        where: { manufacturerName },
      });
      res.status(200).json(products); // Responding with the filtered list of products
    } catch (error) {
      res.status(400).json({ error: error.message }); // Handling errors and sending status 400
    }
  },

  // Get products by status
  async getProductsByStatus(req, res) {
    const { status } = req.params; // Extracting the status from the request parameters
    try {
      // Fetching products filtered by the status
      const products = await Product.findAll({
        where: { status },
      });
      res.status(200).json(products); // Responding with the filtered list of products
    } catch (error) {
      res.status(400).json({ error: error.message }); // Handling errors and sending status 400
    }
  },

  // Add a Tracking entry for a product
  async addTracking(req, res) {
    const { productId } = req.params; // Extracting the product ID from the request parameters
    const { location, event, timestamp } = req.body; // Extracting the tracking information from the request body

    try {
      // Checking if the product exists
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" }); // Responding with error if product is not found
      }

      // Creating a new Tracking entry linked to the product
      const tracking = await Tracking.create({
        location,
        event,
        timestamp,
        productId,
      });

      res.status(201).json(tracking); // Responding with the created tracking and status 201
    } catch (error) {
      res.status(400).json({ error: error.message }); // Handling errors and sending status 400
    }
  },

  // Get all Trackings for a product
  async getTrackingsByProduct(req, res) {
    const { productId } = req.params; // Extracting the product ID from the request parameters

    try {
      // Checking if the product exists
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" }); // Responding with error if product is not found
      }

      // Fetching all Tracking entries related to the product
      const trackings = await Tracking.findAll({
        where: { productId },
      });

      res.status(200).json(trackings); // Responding with the list of trackings related to the product
    } catch (error) {
      res.status(400).json({ error: error.message }); // Handling errors and sending status 400
    }
  },
};

export default productController;
