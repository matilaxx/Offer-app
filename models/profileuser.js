'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProfileUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProfileUser.belongsTo(models.User,{foreignKey:'user_id'})
    }
  }
  ProfileUser.init({
    user_id: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    kota: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    no_handphone: DataTypes.STRING,
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProfileUser',
  });
  return ProfileUser;
};