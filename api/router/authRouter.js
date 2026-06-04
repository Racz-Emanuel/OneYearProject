import { Router } from "express";
import { User } from "../database/entities/user.model.js";
import { Progress } from "../database/entities/progress.model.js";
import { Profile } from "../database/entities/profile.model.js";
import jwt from "jsonwebtoken"; // MUST BE IMPORTED

const router = Router();

// Fallback key string used to guarantee alignment with your middleware
const JWT_SECRET = process.env.JWT_SECRET || "MY_TOTAL_SECRET_KEY_12345";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "MY_REFRESH_SECRET_KEY_12345";

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await User.findOne({ where: { username } });
    if (existing) {
      return res.json({ success: false, message: "Username already taken" });
    }

    const user = await User.create({ username, password });
    const profile = await Profile.create({ userId: user.id });

    // Generate access token (short-lived)
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "15m" },
    );

    // Generate refresh token (long-lived)
    const refreshToken = jwt.sign(
      { id: user.id, username: user.username },
      REFRESH_SECRET,
      { expiresIn: "7d" },
    );

    // Store refresh token in database
    await user.update({ refreshToken });

    res.json({ success: true, token, refreshToken, user, profile, progress: [] });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log("LOGIN BODY:", req.body);
    const user = await User.findOne({ where: { username } });

    if (!user || user.password !== password) {
      return res.json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const profile = await Profile.findOne({ where: { userId: user.id } });
    const progress = await Progress.findAll({ where: { userId: user.id } });

    // Generate access token (short-lived)
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "15m" },
    );

    // Generate refresh token (long-lived)
    const refreshToken = jwt.sign(
      { id: user.id, username: user.username },
      REFRESH_SECRET,
      { expiresIn: "7d" },
    );

    // Store refresh token in database
    await user.update({ refreshToken });

    res.json({ success: true, token, refreshToken, user, profile, progress });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// Refresh token endpoint
router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;
  try {
    if (!refreshToken) {
      return res.json({ success: false, message: "Refresh token required" });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user || user.refreshToken !== refreshToken) {
      return res.json({ success: false, message: "Invalid refresh token" });
    }

    // Generate new access token
    const newToken = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "15m" },
    );

    res.json({ success: true, token: newToken });
  } catch (err) {
    res.json({ success: false, message: "Invalid or expired refresh token" });
  }
});

// Logout endpoint - invalidate refresh token
router.post("/logout", async (req, res) => {
  const { refreshToken } = req.body;
  try {
    if (!refreshToken) {
      return res.json({ success: false, message: "Refresh token required" });
    }

    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
    await User.update(
      { refreshToken: null },
      { where: { id: decoded.id } }
    );

    res.json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    res.json({ success: false, message: "Invalid refresh token" });
  }
});

// Protect profile updates securely using token payload info
router.put("/profile/update", async (req, res) => {
  try {
    const profile = await Profile.findOne({ where: { userId: req.user.id } });
    if (!profile)
      return res.json({ success: false, message: "Profile not found" });

    await profile.update(req.body);
    res.json({ success: true, profile });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.json({ success: false, message: "User not found" });

    await user.destroy();
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

export default router;
