import express from "express";
import cors from "cors";

// Import routers
import authRouter from "./server/routes/auth.js";
import mastersRouter from "./server/routes/masters.js";
import transactionsRouter from "./server/routes/transactions.js";
import reportsRouter from "./server/routes/reports.js";

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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});