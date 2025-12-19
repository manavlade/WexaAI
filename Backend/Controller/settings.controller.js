import { Organization } from "../models/organization.model.js";

export const getOrgSettings = async (req, res) => {
  try {
    const org = await Organization.findById(req.user.organizationId);

    return res.status(200).json({
      success: true,
      settings: {
        defaultLowStockThreshold: org.defaultLowStockThreshold
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

export const updateOrgSettings = async (req, res) => {
  try {
    const { defaultLowStockThreshold } = req.body;

    await Organization.findByIdAndUpdate(
      req.user.organizationId,
      { defaultLowStockThreshold },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Settings updated"
    });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};
