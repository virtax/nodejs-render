import cookieParser from 'cookie-parser';
import config from "config";
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import httpLogger from "./middleware/httpLogger";
import userRouter from "./routes/userRouter";
import { databaseService } from "./services/DatabaseService";
import logger from "./utils/logger"
import userAdminRouter from "./routes/userAdminRouter";
import saleAdminRouter from './routes/saleAdminRouter';
const { log, warn, error } = logger("app");

const app = express();
const PORT = config.get("app.port");
const HOSTNAME = config.get("app.hostname");

app.set('view engine', 'pug');
app.set('views', './src/views');

app.use(express.static('public'));
// Middleware for JSON parsing
app.use(express.json());
// Parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Custom Middleware
app.use(httpLogger);

app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
});

app.use("/", userAdminRouter);
app.use("/sales", saleAdminRouter);

// Use the userRouter and set the base path to /api/v1/users
app.use("/api/v1/users", userRouter);

// Global error handler
app.use((err, req: Request, res: Response, next: NextFunction) => {
  error("Error:", err.message);
  res.status(500).json({ error: err.message });
});

// Start the server
app.listen(PORT, HOSTNAME, () => {
  log(`Server is running on http://${HOSTNAME}:${PORT}`);
});

process.on('uncaughtException', (err, origin) => {
  log(`Uncaught Exception`, err, origin);
});

process.on('unhandledRejection', (reason, promise) => {
  log('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle graceful shutdown
process.on("SIGINT", handleShutdown);
process.on("SIGTERM", handleShutdown);

async function handleShutdown(signal: string): Promise<void> {
  log(`Received ${signal}. Closing postgreSQL connection...`);
  await databaseService.disconnect();
  log(`${signal} handled. Exiting process.`);
  process.exit(0);
}
