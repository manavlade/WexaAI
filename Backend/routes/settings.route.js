import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getOrgSettings, updateOrgSettings } from "../Controller/settings.controller.js";

const router = express.Router();

router.route("/").get(isAuthenticated, getOrgSettings);
router.route("/").put(isAuthenticated, updateOrgSettings);
export default router;