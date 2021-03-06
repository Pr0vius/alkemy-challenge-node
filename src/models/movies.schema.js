const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../loaders/database/database");

class Movie extends Model {}
Movie.init(
  {
    //Model Attributes
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image_url: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    releaseDate: { type: DataTypes.DATEONLY, allowNull: false },
    rating: { type: DataTypes.INTEGER().UNSIGNED.ZEROFILL, allowNull: false, validate:{min:1 ,max:5} },
  },
  {
    //Model Options
    sequelize,
    tableName:"movies",
    modelName: "Movies",
    timestamps: false
  }
);

module.exports = Movie;

Movie.belongsToMany(require("./characters.schema"), {
  through:"charactersMovies",
  as: "characters",
  foreignKey:'movieId',
  targetKey: 'id'
})

Movie.belongsToMany(require("./genre.schema"), {
  through:"moviesGenre",
  as: "genre",
  foreignKey:'movieId',
  targetKey: 'id'
})
