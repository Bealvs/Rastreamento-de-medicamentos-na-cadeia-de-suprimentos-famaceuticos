import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from './routes/userRoutes.js';
import productRoutes from "./routes/productRoutes.js";
import trackingRoutes from "./routes/trackingRoutes.js";

class App {
  constructor() {
    this.app = express();

    dotenv.config({
      path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
    });
    
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // Enable CORS for cross-origin resource sharing
    this.app.use(cors());

    // Enable JSON parsing for incoming requests
    this.app.use(express.json());
  }

  // Configuração das rotas
  routes() {
    this.app.use("/api/v1/users", userRoutes);
    this.app.use("/api/v1/products", productRoutes);
    this.app.use("/api/v1/trackings", trackingRoutes);

    this.app.get("/", (req, res) => {
      res.send("Server is running!");
    });

    this.app.get("/api/config", (req, res) => {
      res.json({
        port: process.env.PORT, // The port the server is running on
        environment: process.env.NODE_ENV, // The current environment (e.g., development or production)
        dbHost: process.env.DB_HOST, // The database host from environment variables
      });
    });
  }

  // Método para iniciar o servidor
  listen() {
    console.log("Iniciando servidor...");
    this.app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  }
}

export default App;
