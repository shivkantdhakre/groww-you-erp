import express from "express";
import cors from "cors";

// Import routers
import authRouter from "./routes/auth.js";
import mastersRouter from "./routes/masters.js";
import transactionsRouter from "./routes/transactions.js";
import reportsRouter from "./routes/reports.js";

const app = express();

app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/auth", authRouter);
app.use("/api/masters", mastersRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/api/reports", reportsRouter);

app.get("/", (req, res) => {
  res.send("Groww You ERP API Running 🚀");
});

// Global standardized error handling middleware
app.use((err, req, res, next) => {
  console.error("Express Error Handler:", err);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "An unexpected error occurred",
    error: err.error || err.message || "Internal Server Error"
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

