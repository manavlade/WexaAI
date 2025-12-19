import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getDashboardSummary } from "../Controller/dashboard.controller.js";

const router = express.Router();

router.route("/").get( isAuthenticated, getDashboardSummary);
export default router;
