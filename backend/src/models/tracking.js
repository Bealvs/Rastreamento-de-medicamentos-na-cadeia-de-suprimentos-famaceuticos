import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Tracking = sequelize.define("Tracking", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true, 
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  event: {
    type: DataTypes.ENUM(
      "Produto postado",
      "Produto em inspeção",
      "Produto em transporte",
      "Produto entregue"
    ),
    allowNull: false,
    defaultValue: "Produto postado",
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  trackingCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destinationPoint: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Tracking;
