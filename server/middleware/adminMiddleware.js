// ==========================================
// middleware/adminMiddleware.js
// ==========================================

const User = require("../models/User");

module.exports = async (req, res, next) => {

  try {

    const user = await User.findById(req.user.id);

    if (user.role !== "Admin") {

      return res.status(403).json({
        message: "Admin Access Only",
      });

    }

    next();

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};