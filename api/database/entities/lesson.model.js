import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Lesson = sequelize.define(
  "Lesson",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    level: {
      type: DataTypes.ENUM("Beginner", "Intermediate", "Advanced"),
      allowNull: false,
      defaultValue: "Beginner",
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
  },
);
