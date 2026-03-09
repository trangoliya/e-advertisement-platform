const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // Check if user exists
      if (!req.user) {
        return res.status(401).json({
          message: "Authentication required",
        });
      }

      // Ensure roles exist and are an array
      const userRoles = Array.isArray(req.user.roles) ? req.user.roles : [];

      // Check if user has any allowed role
      const hasRole = userRoles.some((role) => allowedRoles.includes(role));

      if (!hasRole) {
        return res.status(403).json({
          message: "Access denied. Insufficient permissions.",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: "Role authorization error",
      });
    }
  };
};

export default roleMiddleware;
