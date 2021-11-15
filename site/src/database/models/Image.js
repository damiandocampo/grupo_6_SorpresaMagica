module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define(
    'Image', 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        file: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, 
    {
        timestamps: false
    })

    return Image
}