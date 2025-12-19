import express from "express";
import { createProduct, getProducts, updateProduct, deleteProduct } from "../Controller/product.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/").post( isAuthenticated, createProduct)

export default router;
