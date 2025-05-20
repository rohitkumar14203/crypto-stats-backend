# 📊 Crypto Stats API Server

This is the **API Server** for the Crypto Stats Service. A backend service that provides REST APIs to fetch cryptocurrency stats stored in MongoDB. It listens to NATS events for real-time updates from the Worker Server.

---

## 📑 Features

- Exposes public APIs for fetching cryptocurrency stats.
- Subscribes to NATS for receiving new stats from the Worker Server.
- Connects to MongoDB for storing and retrieving data.
- Modular and scalable Express.js backend structure.

---

## 📦 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **NATS**
- **Dotenv**

---## 📮 API Endpoints

- **GET** `/api/stats` → Get latest stats for a specific coin.
- **GET** `/api/deviation` → Get price standard deviation (from latest 100 records) for a specific coin.

et all bookings for the logged-in user

## ⚙️ Setup Environment Variables

- Create a .env file in the project root with the following content:

- PORT=8000
- MONGO_URI=your_mongo_connection_string
- COIN_URL=CoinGecko_api


## 🚀 Run Project Locally

### 📦 Install Dependencies

```bash
npm install
```

### 📦 Start the Server

```bash
npm run dev
```
