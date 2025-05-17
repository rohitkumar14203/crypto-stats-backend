import express from "express";

import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
connectDB();
import startNatsSubscriber from "./startNatsSubscriber.js";
startNatsSubscriber().catch(console.error);

import statsRoutes from "./routes/statsRoutes.js";

const app = express();

const port = process.env.PORT || 8000;

app.get("/api", (req, res) => {
  res.send("i am alive now");
});

app.use("/", statsRoutes);

app.listen(port, () => {
  console.log("server is up");
});
