import { Router } from "express";
import { Lesson } from "../database/entities/lesson.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const { level } = req.query;

  const where = level ? { level } : {};

  const lessons = await Lesson.findAll({ where });

  res.json(lessons);
});

router.post("/create", async (req, res) => {
  const { title, level } = req.body;

  const lesson = await Lesson.create({
    title,
    level,
  });

  res.json(lesson);
});

router.put("/update/:id", async (req, res) => {
  const lesson = await Lesson.findByPk(req.params.id);

  if (!lesson) {
    return res.json({ error: "Not found" });
  }

  await lesson.update(req.body);

  res.json({ success: true });
});

router.delete("/delete/:id", async (req, res) => {
  const lesson = await Lesson.findByPk(req.params.id);

  if (!lesson) {
    return res.json({ error: "Not found" });
  }

  await lesson.destroy();

  res.json({ success: true });
});

export default router;
