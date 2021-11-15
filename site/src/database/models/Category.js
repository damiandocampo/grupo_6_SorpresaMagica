module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
    'Category', 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING
        }
    }, 
    {
        timestamps: false
    })

    return Category
}