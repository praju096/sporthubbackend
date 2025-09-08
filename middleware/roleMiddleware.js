exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admin access only" });
  next();
};

exports.hasRole = (allowedRoles = []) => {
  return (req, res, next) => {
    const user = req.user; 

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({
        status: "error",
        message: "Access denied",
      });
    }

    next();
  };
};

