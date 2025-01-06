import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    productCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 15],
      },
    },
    commercialName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 150],
      },
    },
    genericName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 150],
      },
    },
    characteristics: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    batch: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
      },
    },
    manufacturingDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfter: {
          args: new Date().toISOString().split("T")[0],
          msg: "Expiration date must be in the future.",
        },
      },
    },
    status: {
      type: DataTypes.ENUM("produced", "inspected", "in transit", "delivered"),
      allowNull: true,
      defaultValue: "produced",
    },
    manufacturerName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 150],
      },
    },
    cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isCNPJ(value) {
          const cnpjRegex = /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}$/;
          if (!cnpjRegex.test(value)) {
            throw new Error("Invalid CNPJ format.");
          }
        },
      },
    },
    tradeName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 150],
      },
    },
    trackingCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 30],
      },
    },
  },
  {
    timestamps: true,
  }
);

export default Product;
