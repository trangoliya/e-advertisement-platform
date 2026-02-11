const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user from authMiddleware
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    next(); // if valid role then allowed for role
  };
};

export default roleMiddleware;
