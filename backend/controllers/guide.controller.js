// controllers/guide.controller.js
import { validationResult } from "express-validator";
import * as guideService from "../services/guide.service.js";
import { sendResponse } from "../utils/responseHandler.js";
import { isValidObjectId } from "../utils/mongooseUtils.js";


export const getguideByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return sendResponse(res, 400, false, "Invalid guide ID format");
    }

    const guide = await guideService.getguideById(id);
    return sendResponse(res, 200, true, "Guide fetched successfully", guide);
  } catch (error) {
    return sendResponse(
      res,
      error.statusCode || 500,
      false,
      error.message || "Error fetching guide"
    );
  }
};

export const createGuideController = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, false, "Validation failed", errors.array());
    }
    // console.log(req.user)
    if (!req.user || !req.user.id) {
      return sendResponse(res, 401, false, "User not authenticated");
    }
    const guideData = {
      topic: req.body.topic,
      description: req.body.description,
      category: req.body.category,
      difficulty: req.body.difficulty,
      tags: req.body.tags,
      chapters: req.body.chapters,
      isAnonymous: req.body.isAnonymous || false,
      status: req.body.status || "published",
      createdBy: req.user.id,
    };

    const guide = await guideService.createGuide(guideData);

    return sendResponse(res, 201, true, "Guide created successfully", guide);
  } catch (error) {
    return sendResponse(res, error.statusCode || 500, false, error.message);
  }
};

// Get All Guides
export const getAllGuidesController = async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;
    const guides = await guideService.getAllGuides({ category, difficulty, search });
    return sendResponse(res, 200, true, "Guides fetched successfully", guides);
  } catch (error) {
    return sendResponse(res, error.statusCode || 500, false, error.message);
  }
};

// Get Single Guide
export const getGuideByIdController = async (req, res) => {
  try {
    const guide = await guideService.getGuideById(req.params.id);
    return sendResponse(res, 200, true, "Guide fetched successfully", guide);
  } catch (error) {
    return sendResponse(res, error.statusCode || 500, false, error.message);
  }
};

// Update Guide
export const updateGuideController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, false, "Validation failed", errors.array());
    }

    if (!req.user || !req.user.id) {
      return sendResponse(res, 401, false, "User not authenticated");
    }

    const updatedGuide = await guideService.updateGuide(
      req.params.id,
      req.body,
      req.user.id
    );
    return sendResponse(res, 200, true, "Guide updated successfully", updatedGuide);
  } catch (error) {
    return sendResponse(res, error.statusCode || 500, false, error.message);
  }
};

// Delete Guide
export const deleteGuideController = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return sendResponse(res, 401, false, "User not authenticated");
    }

    await guideService.deleteGuide(req.params.id, req.user.id);
    return sendResponse(res, 200, true, "Guide deleted successfully");
  } catch (error) {
    return sendResponse(res, error.statusCode || 500, false, error.message);
  }
};

// Toggle Like
export const toggleLikeController = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return sendResponse(res, 401, false, "User not authenticated");
    }

    const guide = await guideService.toggleLike(req.params.id, req.user.id);
    return sendResponse(
      res, 
      200, 
      true, 
      "Guide like status updated successfully", 
      guide
    );
  } catch (error) {
    return sendResponse(res, error.statusCode || 500, false, error.message);
  }
};

// Add Comment
export const addCommentController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, false, "Validation failed", errors.array());
    }

    if (!req.user || !req.user.id) {
      return sendResponse(res, 401, false, "User not authenticated");
    }

    const guide = await guideService.addComment(
      req.params.id,
      req.user.id,
      req.body.text,
      req.body.isAnonymous
    );
    return sendResponse(res, 200, true, "Comment added successfully", guide);
  } catch (error) {
    return sendResponse(res, error.statusCode || 500, false, error.message);
  }
};