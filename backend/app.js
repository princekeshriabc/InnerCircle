import express from "express";
import morgan from "morgan";
import connectDB from "./db/db.js";
import userRoutes from "./routes/user.route.js";
import guideRoutes from "./routes/guide.route.js";
import organizationRoutes from "./routes/organization.route.js";
import projectRoutes from "./routes/project.route.js";
import aiRoutes from "./routes/ai.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
connectDB(); // Connect to MongoDB
// Initialize express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(morgan("dev")); // Logging middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Cookie parser middleware

app.use("/api/users", userRoutes); // User routes
app.use("/api/guides", guideRoutes); // Guide routes
app.use("/api/organization", organizationRoutes); // Organization routes
app.use("/api/projects", projectRoutes);
app.use("/api/ai", aiRoutes); // AI routes

// Import routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
