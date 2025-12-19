import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        sku: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        costPrice: {
            type: Number,
            required: true,
        },
        sellingPrice: {
            type: Number,
            required: true,
        },
        lowStockThreshold: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true }
);

productSchema.index({ organizationId: 1, sku: 1 }, { unique: true });

export const Product = mongoose.model("Product", productSchema);
