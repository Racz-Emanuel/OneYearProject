import { Router } from "express";
import { Profile } from "../database/entities/profile.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const profiles = await Profile.findAll();
  res.json(profiles);
});

router.get("/user/:userId", async (req, res) => {
  const profile = await Profile.findOne({
    where: { userId: req.params.userId },
  });

  res.json(profile);
});

router.post("/create", async (req, res) => {
  const profile = await Profile.create(req.body);
  res.json(profile);
});

router.put("/update/:id", async (req, res) => {
  const profile = await Profile.findByPk(req.params.id);

  if (!profile) return res.json({ error: "Not found" });

  await profile.update(req.body);

  res.json({ success: true });
});

router.delete("/delete/:id", async (req, res) => {
  const profile = await Profile.findByPk(req.params.id);

  if (!profile) return res.json({ error: "Not found" });

  await profile.destroy();

  res.json({ success: true });
});

export default router;
