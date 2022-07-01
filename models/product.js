"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Wishlist, { foreignKey: "product_id" });

      Product.hasMany(models.Penawaran, {
        foreignKey: "productId",
        as: "Interested",
      });

    }
  }
  Product.init(
    {
      nama: DataTypes.STRING,
      deskripsi: DataTypes.TEXT,
      harga: DataTypes.INTEGER,
      product_photos: DataTypes.ARRAY(DataTypes.STRING),
      categories: DataTypes.ARRAY(DataTypes.STRING),
      seller_id: DataTypes.INTEGER,
      sold: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
