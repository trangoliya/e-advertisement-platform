import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // get authorization header
    const authHeader = req.headers.authorization;

    // after authorization --> check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No Token Provided",
      });
    }

    // if token exist then extract token
    const token = authHeader.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user data to request
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next(); //allow request (valid user-->allow)
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;
