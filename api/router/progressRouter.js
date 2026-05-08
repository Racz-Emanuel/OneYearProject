import { Router } from "express";
import { Progress } from "../database/entities/progress.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const progress = await Progress.findAll();
  res.json(progress);
});

router.get("/user/:userId", async (req, res) => {
  const progress = await Progress.findAll({
    where: { userId: req.params.userId },
  });

  res.json(progress);
});

router.post("/create", async (req, res) => {
  const progress = await Progress.create(req.body);
  res.json(progress);
});

router.put("/update/:id", async (req, res) => {
  const progress = await Progress.findByPk(req.params.id);

  if (!progress) return res.json({ error: "Not found" });

  await progress.update(req.body);

  res.json({ success: true });
});

router.delete("/delete/:id", async (req, res) => {
  const progress = await Progress.findByPk(req.params.id);

  if (!progress) return res.json({ error: "Not found" });

  await progress.destroy();

  res.json({ success: true });
});

export default router;
