// middleware/validation.middleware.js
import { isValidObjectId } from "../utils/mongooseUtils.js";
import { sendResponse } from "../utils/responseHandler.js";

export const validateMongoId = (req, res, next) => {
  const { id } = req.params;
  // console.log("ID:", id);
  if (!isValidObjectId(id)) {
    return sendResponse(res, 400, false, "Invalid ID format");
  }

  next();
};
