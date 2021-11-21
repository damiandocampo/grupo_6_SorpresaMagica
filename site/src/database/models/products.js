'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      Products.belongsTo(models.Categories, {
          as: 'category',
          foreignKey: 'category_id'
      })
    
      Products.belongsTo(models.Brands, {
          as: 'brand',
          foreignKey: 'brand_id'
      })

    }
  };
  Products.init({
    title: DataTypes.STRING,
    price: DataTypes.DECIMAL(10,2),
    featured_product: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    image: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    brand_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};