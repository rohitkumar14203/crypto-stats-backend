import { connect, StringCodec } from "nats";

async function main() {
  // Connect to NATS server
  const nc = await connect({ servers: "localhost:4222" });
  console.log("Connected to NATS");

  const sc = StringCodec();

  const publishUpdate = () => {
    const message = JSON.stringify({ trigger: "update" });
    nc.publish("crypto.updates", sc.encode(message));
    console.log("Published update event at", new Date().toISOString());
  };

  // Publish immediately once
  publishUpdate();

  // Publish every 15 minutes
  setInterval(publishUpdate, 15 * 60 * 1000);

  // Keep process alive
  process.on("SIGINT", () => {
    nc.close();
    console.log("NATS connection closed");
    process.exit();
  });
}

main().catch(console.error);
