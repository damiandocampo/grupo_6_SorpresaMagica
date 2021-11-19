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
          as: 'Categoría',
          foreignKey: 'category_id'
      })
    
      Products.belongsTo(models.Brands, {
          as: 'Marca',
          foreignKey: 'brand_id'
      })
    
      Products.hasMany(models.Images, {
          as: 'Imágenes',
          foreignKey: 'product_id'
      })

    }
  };
  Products.init({
    title: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    featured_product: DataTypes.BOOLEAN,
    discount: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    brand_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};