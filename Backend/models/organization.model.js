import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    defaultLowStockThreshold: {
      type: Number,
      default: 5
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  },
  { timestamps: true }
);

export const Organization = mongoose.model(
  "Organization",
  organizationSchema
);
