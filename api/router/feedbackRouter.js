import { Router } from "express";
import { Feedback } from "../database/entities/feedback.model.js";

const router = Router();

router.post("/", async (req, res) => {
  const { userId, message } = req.body;

  try {
    const feedback = await Feedback.create({
      UserId: userId,
      message,
    });

    res.json({ success: true, feedback });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  const feedback = await Feedback.findAll({
    where: { UserId: req.params.userId },
  });

  res.json(feedback);
});

export default router;
