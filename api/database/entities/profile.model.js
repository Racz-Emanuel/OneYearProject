import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { User } from "./user.model.js";

export const Profile = sequelize.define(
  "Profile",
  {
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    level: {
      type: DataTypes.STRING,
      defaultValue: "Beginner",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sessions: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    minutes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
  },
);

User.hasOne(Profile, { foreignKey: "userId", onDelete: "CASCADE" });
Profile.belongsTo(User, { foreignKey: "userId" });
