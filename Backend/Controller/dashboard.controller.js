import { Product } from "../models/product.model.js";
import { Organization } from "../models/organization.model.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const orgId = req.user.organizationId;

    const organization = await Organization.findById(orgId);
    const defaultThreshold = organization.defaultLowStockThreshold || 5;

    const products = await Product.find({ organizationId: orgId });

    const totalProducts = products.length;
    const totalQuantity = products.reduce((sum, p) => sum + p.quantity, 0);

    const lowStockProducts = products.filter(p =>
      p.quantity <= (p.lowStockThreshold ?? defaultThreshold)
    );

    return res.status(200).json({
      success: true,
      data: {
        totalProducts,
        totalQuantity,
        lowStockProducts
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};
