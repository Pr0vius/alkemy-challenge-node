const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../loaders/database/database");

class Characters extends Model {}

Characters.init(
  {
    // Model attributes
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    history: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    //Model Options
    sequelize,
    modelName: "Character",
    tableName: "characters",
    timestamps: false
  }
);

module.exports = Characters;

Characters.belongsToMany(require("./movies.schema"), {
  through:"charactersMovies",
  as: "movies",
  foreignKey:'charId',
  targetKey: 'id'
})
