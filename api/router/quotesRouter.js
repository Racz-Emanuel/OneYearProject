import { Router } from "express";
import { Quote } from "../database/entities/quote.model.js";

const quotesRouter = Router();

quotesRouter.get("/", async (req, res) => {
  const quotes = await Quote.findAll();
  res.json(quotes);
});

quotesRouter.get("/:id", async (req, res) => {
  const quote = await Quote.findByPk(req.params.id);
  if (!quote) return res.status(404).json({ message: "Quote not found" });
  res.json(quote);
});

quotesRouter.post("/create", async (req, res) => {
  const { text, author } = req.body;
  const quote = await Quote.create({ text, author });
  res.json(quote);
});

quotesRouter.put("/update/:id", async (req, res) => {
  const quote = await Quote.findByPk(req.params.id);
  if (!quote) return res.status(404).json({ message: "Quote not found" });
  await quote.update(req.body);
  res.json(quote);
});

quotesRouter.delete("/delete/:id", async (req, res) => {
  const quote = await Quote.findByPk(req.params.id);
  if (!quote) return res.status(404).json({ message: "Quote not found" });
  await quote.destroy();
  res.json({ deleted: true });
});

export default quotesRouter;
