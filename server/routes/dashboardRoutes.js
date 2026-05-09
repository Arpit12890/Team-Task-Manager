// ==========================================
// routes/dashboardRoutes.js
// ==========================================

const express = require("express");

const Task = require("../models/Task");

const auth = require("../middleware/authMiddleware");

const router = express.Router();


// ==========================================
// DASHBOARD STATS
// ==========================================

router.get("/stats", auth, async (req, res) => {

  try {

    const totalTasks = await Task.countDocuments({
      assignedTo: req.user.id,
    });

    const todoTasks = await Task.countDocuments({
      assignedTo: req.user.id,
      status: "To Do",
    });

    const progressTasks =
      await Task.countDocuments({
        assignedTo: req.user.id,
        status: "In Progress",
      });

    const doneTasks = await Task.countDocuments({
      assignedTo: req.user.id,
      status: "Done",
    });

    const overdueTasks =
      await Task.countDocuments({
        assignedTo: req.user.id,
        dueDate: {
          $lt: new Date(),
        },
        status: {
          $ne: "Done",
        },
      });

    res.json({
      totalTasks,
      todoTasks,
      progressTasks,
      doneTasks,
      overdueTasks,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;