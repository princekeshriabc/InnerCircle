// controllers/guide.controller.js
import { validationResult } from "express-validator";
import * as guideService from "../services/guide.service.js";
import { sendResponse } from "../utils/responseHandler.js";

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
