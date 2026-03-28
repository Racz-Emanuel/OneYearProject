import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Task = sequelize.define(
  "Task",
  {
    //ASTA IL MODIFIC IN FC DE CE AM IN ROUTER PRACTIC TU LUCREZI CU CE AI IN  ROUTER//
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    done: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    paranoid: true,
  },
);
