import express from "express";
import { createProduct, getProducts, updateProduct, deleteProduct } from "../Controller/product.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/").post( isAuthenticated, createProduct);

router.route("/getAllProducts").get( isAuthenticated, getProducts);

router.route("/:id").put( isAuthenticated, updateProduct);

router.route("/:id").delete( isAuthenticated, deleteProduct);

export default router;
