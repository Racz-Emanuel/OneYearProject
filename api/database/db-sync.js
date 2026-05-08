// import { sequelize } from "./db.js";
// sequelize.sync({ force: true }).then(() => {
//   console.log("FINISHED SUCCESS");
//   process.exit(0);
// });

import { sequelize } from "./db.js";

import { Lesson } from "./entities/lesson.model.js";
import { Sign } from "./entities/sign.model.js";
import { User } from "./entities/user.model.js";
import { Progress } from "./entities/progress.model.js";
import { Profile } from "./entities/profile.model.js";
import { Favorite } from "./entities/favorite.model.js";

User.hasMany(Favorite, {
  foreignKey: "userId",
});

Favorite.belongsTo(User, {
  foreignKey: "userId",
});

Lesson.hasMany(Favorite, {
  foreignKey: "lessonId",
});

Favorite.belongsTo(Lesson, {
  foreignKey: "lessonId",
});

User.hasMany(Progress, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Progress.belongsTo(User, {
  foreignKey: "userId",
});

Lesson.hasMany(Progress, {
  foreignKey: "lessonId",
  onDelete: "CASCADE",
});

Progress.belongsTo(Lesson, {
  foreignKey: "lessonId",
});

Lesson.hasMany(Sign, {
  foreignKey: "lessonId",
  onDelete: "CASCADE",
});

Sign.belongsTo(Lesson, {
  foreignKey: "lessonId",
});

User.hasOne(Profile, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Profile.belongsTo(User, {
  foreignKey: "userId",
});

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("DB synced successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error syncing DB:", err);
  });
