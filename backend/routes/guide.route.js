// routes/guide.route.js
import { Router } from "express";
import { body } from "express-validator";
import * as guideController from "../controllers/guide.controller.js";
import { authUser } from "../middleware/auth.middleware.js";
import { validateMongoId } from "../middleware/validation.middleware.js";

const router = Router();

// Validation middleware
const createGuideValidation = [
  body("topic").notEmpty().withMessage("Topic is required").trim(),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 20 })
    .withMessage("Description must be at least 20 characters long")
    .trim(),
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn([
      "Technical",
      "Soft Skills",
      "Career Development",
      "Industry Knowledge",
      "Other",
    ])
    .withMessage("Invalid category"),
  body("difficulty")
    .optional()
    .isIn(["Beginner", "Intermediate", "Advanced"])
    .withMessage("Invalid difficulty level"),
  body("chapters")
    .isArray({ min: 1 })
    .withMessage("At least one chapter is required"),
  body("chapters.*.chapterTitle")
    .notEmpty()
    .withMessage("Chapter title is required"),
  body("chapters.*.content")
    .isArray({ min: 1 })
    .withMessage("Each chapter must have at least one content item"),
  body("chapters.*.content.*.subtopic")
    .notEmpty()
    .withMessage("Subtopic is required"),
];

router.post(
  "/create",
  authUser,
  createGuideValidation,
  guideController.createGuideController
);

router.get('/test-auth', authUser, (req, res) => {
  res.json({
    success: true,
    message: "Authentication working",
    user: req.user
  });
});

// Public routes
router.get('/all',guideController.getAllGuidesController);

router.get('/:id',validateMongoId, guideController.getGuideByIdController);

router.put(
  "/:id",
  authUser,
  validateMongoId,
  createGuideValidation,
  guideController.updateGuideController
);

router.delete("/:id", authUser,validateMongoId, guideController.deleteGuideController);

router.post("/:id/like", authUser, guideController.toggleLikeController);

router.post(
  "/:id/comment",
  authUser,
  body("text").notEmpty().withMessage("Comment text is required"),
  guideController.addCommentController
);


export default router;
