import * as organizationService from "../services/organization.service.js";

export const getOrganizationNameById = async (req, res) => {
  try {
    const organization = await organizationService.getOrganizationNameById(
      req.params.id
    );

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Organization fetched successfully",
      data: organization,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
