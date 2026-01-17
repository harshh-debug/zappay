import "dotenv/config";
import express from "express";
import mainRouter from "./routes/mainRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
console.log(process.env.FRONTEND_URL)

app.use(
	cors({
		origin: process.env.FRONTEND_URL||"http://localhost:5173",
		credentials: true,
	})
);

app.use("/api/v1", mainRouter);

app.listen(3000, () => {
	console.log("Listening at 3000");
});
