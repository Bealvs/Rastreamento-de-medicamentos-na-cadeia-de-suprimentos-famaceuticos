import Tracking from "../models/tracking.js"; // Importing the Tracking model.

const trackingController = {
  // Create a new Tracking entry
  async createTracking(req, res) {
    const { productId } = req.params; // Extracting the product ID from the request parameters
    const { location, event } = req.body; // Extracting tracking data from the request body

    try {
      // Creating a new tracking entry for the given product
      const tracking = await Tracking.create({
        location,
        event,
        timestamp: new Date(), // Automatically using the current date and time
        productId,
      });
      res.status(201).json(tracking); // Responding with the created tracking and status 201
    } catch (error) {
      res.status(400).json({ error: error.message }); // Handling errors and sending status 400
    }
  },

  // Get all Trackings
  async getAllTrackings(req, res) {
    try {
      // Fetching all tracking entries from the database
      const trackings = await Tracking.findAll();
      res.status(200).json(trackings); // Responding with the list of all trackings
    } catch (error) {
      res.status(400).json({ error: error.message }); // Handling errors and sending status 400
    }
  },

  // Get a Tracking entry by its ID
  async getTrackingById(req, res) {
    const { trackingId } = req.params; // Extracting the tracking ID from the request parameters

    try {
      // Fetching the tracking entry by its ID
      const tracking = await Tracking.findByPk(trackingId);
      if (!tracking) {
        return res.status(404).json({ error: "Tracking not found" }); // Responding with error if tracking is not found
      }
      res.status(200).json(tracking); // Responding with the found tracking entry
    } catch (error) {
      res.status(400).json({ error: error.message }); // Handling errors and sending status 400
    }
  },
};

export default trackingController;
