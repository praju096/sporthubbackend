const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const authRoutes = require("./routes/auth");
const adminAuthRoutes = require('./routes/adminAuth');
const db = require("./config/db");
const productRoutes = require('./routes/product');
const categoryProductsRoutes = require('./routes/categoryProductsRoutes');
const orderRoutes = require('./routes/order');
const orderItemRoutes = require('./routes/orderItem');
const wishlistRoutes = require('./routes/wishlist');
const cartRoutes = require('./routes/cart');

var app = express();

require("dotenv").config();

db.query("SELECT 1")
  .then(() => console.log("MySQL connected"))
  .catch((err) => console.error("DB connection failed:", err));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRoutes);
app.use('/api/admin', adminAuthRoutes);
app.use('/api/products', productRoutes);
app.use("/api/categories", categoryProductsRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order-items', orderItemRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/cart', cartRoutes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
