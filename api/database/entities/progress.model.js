import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Progress = sequelize.define(
  "Progress",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
  },
);
