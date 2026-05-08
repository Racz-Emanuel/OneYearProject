import { Router } from "express";
import { User } from "../database/entities/user.model.js";
import { Progress } from "../database/entities/progress.model.js";
import { Profile } from "../database/entities/profile.model.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing = await User.findOne({ where: { username } });
    if (existing) {
      return res.json({ success: false, message: "Username already taken" });
    }

    const user = await User.create({ username, password });

    const profile = await Profile.create({ userId: user.id });

    res.json({ success: true, user, profile, progress: [] });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("LOGIN BODY:", req.body);

    const user = await User.findOne({ where: { username } });

    console.log("USER FOUND:", user);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.password !== password) {
      return res.json({ success: false, message: "Wrong password" });
    }

    const profile = await Profile.findOne({ where: { userId: user.id } });
    const progress = await Progress.findAll({ where: { userId: user.id } });

    res.json({ success: true, user, profile, progress });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

router.put("/profile/:userId", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      where: { userId: req.params.userId },
    });
    if (!profile)
      return res.json({ success: false, message: "Profile not found" });

    await profile.update(req.body);

    res.json({ success: true, profile });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.json({ success: false, message: "User not found" });

    await user.destroy();
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});
router.delete("/profile/stats/:userId", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      where: { userId: req.params.userId },
    });
    if (!profile)
      return res.json({ success: false, message: "Profile not found" });

    await profile.update({ sessions: 0, minutes: 0 });
    res.json({ success: true, profile });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

export default router;
