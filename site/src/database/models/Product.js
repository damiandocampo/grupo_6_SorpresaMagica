module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
    'Product', 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        featured_product: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        discount: {
            type: DataTypes.INTEGER
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        brand_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, 
    {
        timestamps: false
    })

    return Product
}