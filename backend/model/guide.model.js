// models/guide.model.js
import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  subtopic: {
    type: String,
    required: [true, "Subtopic is required"],
    trim: true,
  },
  link: {
    type: String,
    trim: true,
    // validate: {
    //   validator: function (v) {
    //     // Basic URL validation
    //     return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(
    //       v
    //     );
    //   },
    //   message: (props) => `${props.value} is not a valid URL!`,
    // },
  },
  explanation: {
    type: String,
    // required: [true, "Explanation is required"],
    trim: true,
    // minlength: [10, "Explanation must be at least 10 characters long"],
  },
});

const chapterSchema = new mongoose.Schema({
  chapterTitle: {
    type: String,
    required: [true, "Chapter title is required"],
    trim: true,
  },
//   chapterDescription: {
//     type: String,
//     required: [true, "Chapter description is required"],
//     trim: true,
//   },
  content: [contentSchema],
  order: {
    type: Number,
    required: true,
  },
});

const guideSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: [true, "Topic is required"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      // minlength: [20, "Description must be at least 20 characters long"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    chapters: [chapterSchema],
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Technical",
        "Soft Skills",
        "Career Development",
        "Industry Knowledge",
        "Other",
      ],
      trim: true,
    },
    difficulty: {
      type: String,
      required: [true, "Difficulty level is required"],
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        text: {
          type: String,
          required: true,
          trim: true,
        },
        isAnonymous: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index for better search performance
guideSchema.index({ topic: "text", description: "text", tags: "text" });

// Pre-save middleware to validate chapters array
guideSchema.pre("save", function (next) {
  if (this.chapters.length === 0) {
    next(new Error("Guide must have at least one chapter"));
  }

  // Validate that each chapter has at least one content item
  const invalidChapters = this.chapters.filter(
    (chapter) => !chapter.content || chapter.content.length === 0
  );
  if (invalidChapters.length > 0) {
    next(new Error("Each chapter must have at least one content item"));
  }

  // Ensure chapter orders are unique and sequential
  const orders = this.chapters
    .map((chapter) => chapter.order)
    .sort((a, b) => a - b);
  const isSequential = orders.every(
    (num, index) => index === 0 || num === orders[index - 1] + 1
  );
  if (!isSequential) {
    next(new Error("Chapter orders must be sequential"));
  }

  next();
});

// Method to increment views
guideSchema.methods.incrementViews = async function () {
  this.views += 1;
  return this.save();
};

// Method to add new chapter
guideSchema.methods.addChapter = async function (chapterData) {
  const nextOrder = this.chapters.length + 1;
  this.chapters.push({ ...chapterData, order: nextOrder });
  return this.save();
};

// Method to reorder chapters
guideSchema.methods.reorderChapters = async function (newOrder) {
  this.chapters = newOrder.map((chapterId, index) => {
    const chapter = this.chapters.id(chapterId);
    chapter.order = index + 1;
    return chapter;
  });
  return this.save();
};

// Static method to find popular guides
guideSchema.statics.findPopular = function () {
  return this.find()
    .sort({ views: -1, likes: -1 })
    .limit(10)
    .populate("createdBy", "name");
};

// Virtual for getting the total likes count
guideSchema.virtual("likesCount").get(function () {
  return this.likes.length;
});

// Virtual for getting the total comments count
guideSchema.virtual("commentsCount").get(function () {
  return this.comments.length;
});

// Virtual for getting total chapters count
guideSchema.virtual("chaptersCount").get(function () {
  return this.chapters.length;
});

const Guide = mongoose.model("Guide", guideSchema);

export default Guide;
