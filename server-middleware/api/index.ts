import express, { Request, Response } from "express";
import auth from "./auth/auth.routes";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/auth", auth);

export default router;
