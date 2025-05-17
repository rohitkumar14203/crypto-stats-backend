import express from "express";

import {
  storeCryptoStats,
  getLatestStats,
  getPriceDeviation,
} from "../controllers/statsController.js";

const router = express.Router();

router.get("/stats", getLatestStats);

router.get("/deviation", getPriceDeviation);

// Testing
router.get("/fetch", async (req, res) => {
  await storeCryptoStats();
  res.json({ message: "Data fetched and stored" });
});

export default router;
