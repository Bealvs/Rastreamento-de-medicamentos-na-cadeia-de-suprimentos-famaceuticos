import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Tracking = sequelize.define("Tracking", {
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  event: {
    type: DataTypes.STRING,
    allowNull: false,
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
