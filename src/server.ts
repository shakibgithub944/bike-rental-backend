import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on("uncaughtException", () => {
  console.log("❌ uncaughtException detected successfully, shutting down...");
  process.exit(1);
});

process.on("unhandledRejection", () => {
  console.log("❌ unhandledRejection detected successfully, shutting down...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
