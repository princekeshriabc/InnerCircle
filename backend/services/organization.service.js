import Organization from "../model/organization.model.js";

export const getOrganizationNameById = async (id) => {
  try {
    const organization = await Organization.findById(id);
    return organization;
  } catch (error) {
    throw error;
  }
};
