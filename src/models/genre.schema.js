const {  DataTypes, Model } = require("sequelize");
const { sequelize } = require("../loaders/database/database");

class Genre extends Model {}

Genre.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    image_url: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName:"genres",
    modelName: "Genre",
    timestamps: false
  }
);

module.exports = Genre;

Genre.belongsToMany(require("./movies.schema"), {
  through:"moviesGenre",
  as: "movies",
  foreignKey:'genreId',
  targetKey: 'id'
})
