import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import env from "./_config/env.config";
import userRoutes from "./users/http/routes/user.routes";
import reportRoutes from "./reports/http/routes/report.routes";
import { connectWithRetry } from "./_helper/db.connection";

const app = express();
const port = env.port;

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(limiter);

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/reports", reportRoutes);

connectWithRetry(10, 10000, () => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port} 🚀`);
  });
});
