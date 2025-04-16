// services/guide.service.js
import Guide from "../model/guide.model.js";
import CustomError from "../utils/CustomError.js";

export const createGuide = async (guideData) => {
  try {
    // Validate required fields
    // console.log(guideData);
    if (
      !guideData.topic ||
      !guideData.description ||
      !guideData.category ||
      !guideData.chapters ||
      !guideData.createdBy
    ) {
      throw new CustomError("Missing required fields", 400);
    }

    // Ensure chapters are properly structured
    if (!Array.isArray(guideData.chapters) || guideData.chapters.length === 0) {
      throw new CustomError("Guide must have at least one chapter", 400);
    }

    // Add order to chapters if not provided
    const chaptersWithOrder = guideData.chapters.map((chapter, index) => ({
      ...chapter,
      order: chapter.order || index + 1,
    }));

    // Create new guide
    const guide = await Guide.create({
      ...guideData,
      chapters: chaptersWithOrder
    });

    return guide;
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      throw new CustomError("A guide with this topic already exists", 400);
    }
    throw error;
  }
};
