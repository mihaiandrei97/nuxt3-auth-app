import express from "express";
import api from "./api";
const app = express();

app.use(express.json());
app.use("/v1", api);

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

export default app;
