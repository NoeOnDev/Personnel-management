import "reflect-metadata";
import express from "express";
import { pool } from "./config/dbConnection";
import { envConfig } from "./config/env.config";
import { errorHandler } from "./errors/errorHandler";
import userRoutes from "./users/infrastructure/userRoutes";
import storeRoutes from "./stores/infrastructure/storeRoutes";
import employeeRoutes from "./employees/infrastructure/employeeRoutes";

const app = express();
const port = envConfig.port;

app.use(express.json());
app.use(errorHandler);

app.use("/api/v1", userRoutes);
app.use("/api/v1", storeRoutes);
app.use("/api/v1", employeeRoutes);

app.get("/", (_req, res) => {
  res.send("Welcome to the API");
});

async function connectWithRetry(retries: number, delay: number) {
  for (let i = 0; i < retries; i++) {
    try {
      await pool.connect();
      console.log("Connected to database");
      return true;
    } catch (err) {
      console.error(
        `Database connection error (attempt ${i + 1} of ${retries})`,
        err
      );
      if (i < retries - 1) {
        await new Promise((res) => setTimeout(res, delay));
      }
    }
  }
  return false;
}

async function startServer() {
  const connected = await connectWithRetry(10, 3000);
  if (connected) {
    app.listen(port, () => {
      console.log("Server is running on port " + port);
    });
  } else {
    console.error(
      "Failed to connect to the database after multiple attempts, exiting."
    );
    process.exit(1);
  }
}

startServer();
