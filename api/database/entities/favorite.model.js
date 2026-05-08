import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Favorite = sequelize.define(
  "Favorite",
  {},
  {
    freezeTableName: true,
    paranoid: true,
  },
);
