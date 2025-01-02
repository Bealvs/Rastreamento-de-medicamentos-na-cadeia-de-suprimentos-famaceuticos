// Importing necessary modules from Sequelize and other dependencies.
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; // Database configuration.

// Defining the Product model, representing pharmaceutical products in the database.
const Product = sequelize.define(
  "Product",
  {
    // Unique identifier for each product, generated as a UUID.
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Automatically generates a UUID v4.
      primaryKey: true, // Marks this field as the primary key.
    },
    // Unique code of the product.
    productCode: {
      type: DataTypes.STRING, // String type for product code.
      allowNull: false, // Product code is required.
      unique: true, // Each product code must be unique.
      validate: {
        len: [4, 15], // Product code must be between 4 and 15 characters.
      },
    },
    // Commercial name of the pharmaceutical product.
    commercialName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 100], // Must be between 3 and 100 characters.
      },
    },
    // Generic name of the pharmaceutical product.
    genericName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 100], // Must be between 3 and 100 characters.
      },
    },
    // Characteristics of the product.
    characteristics: {
      type: DataTypes.TEXT, // Allows detailed descriptions.
      allowNull: true,
    },
    // Danger level of the product.
    dangerLevel: {
      type: DataTypes.ENUM("low", "medium", "high", "critical"), // Enum for danger levels.
      allowNull: false,
      defaultValue: "low", // Default level is 'low'.
    },
    // Batch number of the product.
    batch: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50], // Must be between 1 and 50 characters.
      },
    },
    // Manufacturing date of the product.
    manufacturingDate: {
      type: DataTypes.DATE,
      allowNull: false, // Manufacturing date is required.
      validate: {
        isDate: true, // Must be a valid date.
      },
    },
    // Expiration date of the product.
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: false, // Expiration date is required.
      validate: {
        isDate: true, // Must be a valid date.
        isAfter: {
          args: new Date().toISOString().split("T")[0], // Must be after today.
          msg: "Expiration date must be in the future.",
        },
      },
    },
    // Status of the product in the tracking process.
    status: {
      type: DataTypes.ENUM("produced", "inspected", "in transit", "delivered"), // Enum for product statuses.
      allowNull: false,
      defaultValue: "produced", // Default status is 'produced'.
    },
    // Manufacturer's name.
    manufacturerName: {
      type: DataTypes.STRING,
      allowNull: false, // Manufacturer name is required.
      validate: {
        len: [3, 100], // Name must be between 3 and 100 characters.
      },
    },
    // CNPJ of the manufacturer (Brazilian company registration).
    cnpj: {
      type: DataTypes.STRING,
      allowNull: false, // CNPJ is required.
      unique: true, // CNPJ must be unique.
      validate: {
        isCNPJ(value) {
          const cnpjRegex = /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}$/; // Brazilian CNPJ format.
          if (!cnpjRegex.test(value)) {
            throw new Error("Invalid CNPJ format.");
          }
        },
      },
    },
    // Contact email for the manufacturer.
    manufacturerEmail: {
      type: DataTypes.STRING,
      allowNull: false, // Email is required.
      validate: {
        isEmail: true, // Must be a valid email address.
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt.
  }
);

// Exporting the Product model for use in other parts of the application.
export default Product;
