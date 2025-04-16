// utils/responseHandler.js
export const sendResponse = (
  res,
  statusCode,
  success,
  message,
  data = null
) => {
  const response = {
    success,
    message,
    ...(data && { data }),
  };
  return res.status(statusCode).json(response);
};
