import mongoose from "mongoose";

const cryptoStatsSchema = new mongoose.Schema(
  {
    coin: { type: String, required: true },
    price: { type: Number, required: true },
    marketCap: { type: Number, required: true },
    change24h: { type: Number, required: true },
  },
  { timestamps: true }
);

const CryptoStats = mongoose.model("cryptoStats", cryptoStatsSchema);

export default CryptoStats;
