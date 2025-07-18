module.exports = (req, res, next) => {
  const validCategories = ["men", "women", "kids", "sale", "new-arrivals"];
  const { category } = req.params;

  if (!validCategories.includes(category)) {
    return res.status(400).json({ message: "Invalid category type." });
  }

  next();
};
