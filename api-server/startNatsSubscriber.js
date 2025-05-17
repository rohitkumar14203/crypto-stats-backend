import { connect, StringCodec } from "nats";
import { storeCryptoStats } from "./controllers/statsController.js";

async function startNatsSubscriber() {
  const nc = await connect({ servers: "localhost:4222" });
  console.log("Connected to NATS in api-server");

  const sc = StringCodec();

  const sub = nc.subscribe("crypto.updates");
  (async () => {
    for await (const msg of sub) {
      const data = JSON.parse(sc.decode(msg.data));
      console.log("Received event from NATS:", data);

      if (data.trigger === "update") {
        console.log("Trigger received. Calling storeCryptoStats...");
        await storeCryptoStats();
      }
    }
  })().catch(console.error);

  process.on("SIGINT", () => {
    nc.close();
    console.log("NATS connection closed in api-server");
    process.exit();
  });
}

export default startNatsSubscriber;
