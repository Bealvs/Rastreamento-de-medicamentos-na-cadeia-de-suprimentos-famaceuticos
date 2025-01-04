import Product from "./product.js";
import Tracking from "./tracking.js";

// Definir associações após a definição dos modelos
Product.belongsToMany(Tracking, {
  through: "ProductTracking",
  foreignKey: "productId",
  otherKey: "trackingId",
});

Tracking.belongsToMany(Product, {
  through: "ProductTracking",
  foreignKey: "trackingId",
  otherKey: "productId",
});

export { Product, Tracking };
