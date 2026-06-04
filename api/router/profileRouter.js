// profileRouter.js
import { Router } from "express";
import { Profile } from "../database/entities/profile.model.js";
import { authenticateToken } from "../middleware/authMiddleware.js"; // Import your middleware

const router = Router();

// GET current logged-in user's profile
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      where: { userId: req.user.id },
    });

    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE current logged-in user's profile
router.put("/update", authenticateToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      where: { userId: req.user.id },
    });

    if (!profile) return res.status(404).json({ error: "Profile not found" });

    await profile.update(req.body);
    res.json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// RESET STATS (Moved cleanly from authRouter)
router.delete("/stats/reset", authenticateToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      where: { userId: req.user.id },
    });
    if (!profile)
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });

    await profile.update({ sessions: 0, minutes: 0 });
    res.json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
