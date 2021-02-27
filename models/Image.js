const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Image extends Model {}

Image.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "user",
      key: "id",
    },
    onDelete: "SET NULL",
  },
  post_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "post",
      key: "id",
    },
    onDelete: "SET NULL",
  },
});
