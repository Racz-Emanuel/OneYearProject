import { Router } from "express";
import { Sign } from "../database/entities/sign.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const signs = await Sign.findAll();
  res.json(signs);
});

router.get("/lesson/:lessonId", async (req, res) => {
  const signs = await Sign.findAll({
    where: { lessonId: req.params.lessonId },
  });

  res.json(signs);
});

router.post("/create", async (req, res) => {
  const sign = await Sign.create(req.body);
  res.json(sign);
});

router.put("/update/:id", async (req, res) => {
  const sign = await Sign.findByPk(req.params.id);

  if (!sign) return res.json({ error: "Not found" });

  await sign.update(req.body);

  res.json({ success: true });
});

router.delete("/delete/:id", async (req, res) => {
  const sign = await Sign.findByPk(req.params.id);

  if (!sign) return res.json({ error: "Not found" });

  await sign.destroy();

  res.json({ success: true });
});

export default router;
