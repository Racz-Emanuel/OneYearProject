import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Quote = sequelize.define(
  "Quote",
  {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
  },
);
