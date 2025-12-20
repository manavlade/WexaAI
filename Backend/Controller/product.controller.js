import { Product } from "../models/product.model.js";

export const createProduct = async (req, res) => {
    try {
        const orgId = req.user.organizationId;
        const {
            name,
            sku,
            description,
            quantity,
            costPrice,
            sellingPrice,
            lowStockThreshold
        } = req.body;

        if (!name || !sku || quantity == null || !costPrice || !sellingPrice) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false
            });
        }

        const product = await Product.create({
            organizationId: orgId,
            name,
            sku,
            description,
            quantity,
            costPrice,
            sellingPrice,
            lowStockThreshold
        });

        return res.status(201).json({
            message: "Product created successfully",
            success: true,
            product
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "SKU must be unique within your organization",
                success: false
            });
        }
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const getProducts = async (req, res) => {
    try {
        const orgId = req.user.organizationId;

        const products = await Product.find({
            organizationId: orgId
        }).select("name sku quantity lowStockThreshold costPrice sellingPrice");

        return res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};



export const updateProduct = async (req, res) => {
    try {
        const orgId = req.user.organizationId;
        const productId = req.params.id;
        const updateData = req.body;

        delete updateData.organizationId;
        delete updateData._id;

        const updatedProduct = await Product.findOneAndUpdate(
            { _id: productId, organizationId: orgId},
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found or you don't have permission",
                success: false
            });
        }

        return res.status(200).json({
            message: "Product updated successfully",
            success: true,
            product: updatedProduct
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "SKU must be unique within your organization",
                success: false
            });
        }
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const orgId = req.user.organizationId;
        const productId = req.params.id;

        const deleted = await Product.findOneAndDelete({
            _id: productId,
            organizationId: orgId
        });

        if (!deleted) {
            return res.status(404).json({
                message: "Product not found or you don't have permission",
                success: false
            });
        }

        return res.status(200).json({
            message: "Product deleted successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
