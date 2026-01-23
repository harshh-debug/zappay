import "dotenv/config";
import express from "express";
import mainRouter from "./routes/mainRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 3000;
app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:5173",
		credentials: true,
	}),
);

app.get("/ping", (req, res) => {
	res.status(200).json({ message: "Server is awake" });
});
app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
	console.log(`Listening at ${PORT}`);
});
