import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Sign = sequelize.define(
  "Sign",
  {
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
  },
);
