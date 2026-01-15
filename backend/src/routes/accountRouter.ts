import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getBalance, transferFund } from "../controllers/accountControllers.js";
const accountRouter = express.Router();

accountRouter.get("/balance",authMiddleware,getBalance);

accountRouter.post("/transfer",authMiddleware,transferFund)

export default accountRouter;
