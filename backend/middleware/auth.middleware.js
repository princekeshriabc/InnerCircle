import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
    try {
      const token =
        req.cookies.token || req.headers["authorization"]?.split(" ")[1]; // Bearer token
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "unauthorized user",
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "unauthorized user",
      });
    }
}