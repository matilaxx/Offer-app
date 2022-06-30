'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Penawaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Penawaran.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "Product",
      });

      Penawaran.belongsTo(models.User, {
        foreignKey: "buyerId",
        as: "User",
      });

    }
  }
  Penawaran.init({
    productId: DataTypes.INTEGER,
    buyerId: DataTypes.INTEGER,
    harga: DataTypes.INTEGER,
    agreement: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Penawaran',
  });
  return Penawaran;
};