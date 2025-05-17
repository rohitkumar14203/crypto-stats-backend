import axios from "axios";
import CryptoStats from "../model/CryptoStats.js";

import asyncMiddleware from "../middleware/asyncMiddleware.js";

const storeCryptoStats = async () => {
  const coinApi = process.env.COIN_URL;
  // console.log(coinApi);

  try {
    const res = await axios.get(coinApi, {
      params: {
        ids: "bitcoin,ethereum,matic-network",
        vs_currencies: "usd",
        include_market_cap: "true",
        include_24hr_change: "true",
      },
    });

    const data = res.data;

    const coins = ["bitcoin", "ethereum", "matic-network"];

    for (const coin of coins) {
      await CryptoStats.create({
        coin: coin,
        price: data[coin]?.usd,
        marketCap: data[coin].usd_market_cap,
        change24h: data[coin].usd_24h_change,
      });

      console.log("Crypto stats stored successfully.");
    }
  } catch (error) {
    console.log(error);
    console.error("Error fetching crypto stats");
  }
};

const getLatestStats = asyncMiddleware(async (req, res) => {
  const { coin } = req.query;

  const validCoins = ["bitcoin", "ethereum", "matic-network"];

  if (!coin || !validCoins.includes(coin)) {
    return res
      .status(400)
      .json({ message: "Invalid or missing coin parameter" });
  }

  const latestStats = await CryptoStats.findOne({ coin }).sort({
    createdAt: -1,
  });

  if (!latestStats) {
    return res.status(404).json({ message: `No stats found for ${coin}` });
  }
  res.json({
    price: latestStats.price,
    marketCap: latestStats.marketCap,
    "24hChange": latestStats.change24h,
  });
});

const getPriceDeviation = asyncMiddleware(async (req, res) => {
  const { coin } = req.query;
  const validCoins = ["bitcoin", "ethereum", "matic-network"];

  if (!coin || !validCoins.includes(coin)) {
    return res
      .status(400)
      .json({ message: "Invalid or missing coin parameter" });
  }

  const records = await CryptoStats.find({ coin })
    .sort({ createdAt: -1 })
    .limit(100);

  if (records.length === 0) {
    return res.status(404).json({ message: `No records found for ${coin}` });
  }

  const prices = records.map((record) => record.price);

  const deviation = calculateStandardDeviation(prices);

  res.json({ deviation });
});

function calculateStandardDeviation(prices) {
  const n = prices.length;
  if (n === 0) return 0;

  const mean = prices.reduce((sum, val) => sum + val, 0) / n;
  const variance = prices.reduce((sum, val) => sum + (val - mean) ** 2, 0) / n;
  const stdDeviation = Math.sqrt(variance);

  return parseFloat(stdDeviation.toFixed(2));
}

export { storeCryptoStats, getLatestStats, getPriceDeviation };
