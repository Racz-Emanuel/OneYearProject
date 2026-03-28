import { Router } from "express";

const router = Router();

const USERNAME = "admin";
const PASSWORD = "admin";

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt:", username, password); // <- verificăm ce vine
  if (username === USERNAME && password === PASSWORD) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

export default router;
