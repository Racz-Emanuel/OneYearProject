import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { User } from "./user.model.js";

export const Feedback = sequelize.define(
  "Feedback",
  {
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
  },
);

User.hasMany(Feedback);
Feedback.belongsTo(User);
