# 🛠️ Crypto Stats Event Publisher Worker

This Worker connects to a NATS server and publishes a `"crypto.updates"` event every 15 minutes to trigger updates in the Crypto Stats system.

---

## 🔧 Setup Instructions

### 📥 Install dependencies

```bash
npm install nats
```

## ⚙️ Setup environment variables

This script uses the default NATS server URL localhost:4222.
Change the server URL in the code if your NATS server runs elsewhere.

### 🚀 Run the Worker

```bash
npm run dev
```
