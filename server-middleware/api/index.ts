import express, { Request, Response } from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.get("/test", (req, res) => {
  res.json({
    message: "API TEST 🧪",
    data: "test",
    values: ["test1", "test2", "test3"],
  });
});
export default router;
