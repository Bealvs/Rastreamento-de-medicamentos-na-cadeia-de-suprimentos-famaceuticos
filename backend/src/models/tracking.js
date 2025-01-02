// Importing necessary modules from Sequelize and other dependencies.
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; // Database configuration.
import Product from "./product.js"; // Importing the Product model.

// Defining the Tracking model, representing tracking updates in the database.
const Tracking = sequelize.define(
  "Tracking",
  {
    // Unique identifier for each tracking update.
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Automatically generates a UUID v4.
      primaryKey: true, // Marks this field as the primary key.
    },
    // Location of the tracking update.
    location: {
      type: DataTypes.STRING,
      allowNull: false, // Location is mandatory.
    },
    // Event related to the tracking update.
    event: {
      type: DataTypes.STRING,
      allowNull: false, // Event is mandatory.
    },
    // Timestamp indicating when the update occurred.
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false, // Timestamp is mandatory.
      validate: {
        isDate: true, // Must be a valid date.
      },
    },
    // Foreign key to associate this tracking update with a product.
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Product, // References the Product model.
        key: "id", // References the primary key of Product.
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt.
  }
);

// Defining the relationship between Tracking and Product.
Tracking.belongsTo(Product, {
  foreignKey: "productId", // Explicit foreign key.
  as: "product", // Alias for the relationship.
  onDelete: "CASCADE", // When a product is deleted, its tracking updates will also be deleted.
});

// Exporting the Tracking model for use in other parts of the application.
export default Tracking;
