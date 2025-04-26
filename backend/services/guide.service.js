// services/guide.service.js
import Guide from "../model/guide.model.js";
import CustomError from "../utils/CustomError.js";
import mongoose from "mongoose";


export const createGuide = async (guideData) => {
  try {
    // Validate required fields
    // console.log(guideData);
    if (
      !guideData.topic ||
      !guideData.description ||
      !guideData.category ||
      !guideData.chapters ||
      !guideData.createdBy ||
      !guideData.organization
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

// Get All Guides
export const getAllGuides = async ({ category, difficulty, search }) => {
  try {
    let query = {};
    
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$or = [
        { topic: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    const guides = await Guide.find(query)
      .populate('createdBy', 'name email')
      .populate('comments.user', 'name')
      .sort({ createdAt: -1 });

    return guides;
  } catch (error) {
    throw error;
  }
};

// Get Single Guide
export const getGuideById = async (guideId) => {
  try {
    const guide = await Guide.findById(guideId)
      .populate('createdBy', 'name email')
      .populate('comments.user', 'name');

    if (!guide) {
      throw new CustomError("Guide not found", 404);
    }

    // Increment views
    guide.views += 1;
    await guide.save();

    return guide;
  } catch (error) {
    throw error;
  }
};

// Update Guide
export const updateGuide = async (guideId, updateData, userId) => {
  try {
    const guide = await Guide.findById(guideId);

    if (!guide) {
      throw new CustomError("Guide not found", 404);
    }

    if (guide.createdBy.toString() !== userId) {
      throw new CustomError("Not authorized to update this guide", 403);
    }

    const updatedGuide = await Guide.findByIdAndUpdate(
      guideId,
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    return updatedGuide;
  } catch (error) {
    throw error;
  }
};

// Delete Guide
export const deleteGuide = async (guideId, userId) => {
  try {
    const guide = await Guide.findById(guideId);

    if (!guide) {
      throw new CustomError("Guide not found", 404);
    }

    if (guide.createdBy.toString() !== userId) {
      throw new CustomError("Not authorized to delete this guide", 403);
    }

    await guide.deleteOne();
  } catch (error) {
    throw error;
  }
};

// Toggle Like
export const toggleLike = async (guideId, userId) => {
  try {
    const guide = await Guide.findById(guideId);

    if (!guide) {
      throw new CustomError("Guide not found", 404);
    }

    const likeIndex = guide.likes.indexOf(userId);

    if (likeIndex === -1) {
      guide.likes.push(userId);
    } else {
      guide.likes.splice(likeIndex, 1);
    }

    await guide.save();
    return guide;
  } catch (error) {
    throw error;
  }
};

// Add Comment
export const addComment = async (guideId, userId, text, isAnonymous = false) => {
  try {
    const guide = await Guide.findById(guideId);

    if (!guide) {
      throw new CustomError("Guide not found", 404);
    }

    guide.comments.push({
      user: userId,
      text,
      isAnonymous
    });

    await guide.save();

    return await Guide.findById(guideId)
      .populate('comments.user', 'name email');
  } catch (error) {
    throw error;
  }
};