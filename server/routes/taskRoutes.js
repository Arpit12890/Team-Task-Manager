// ==========================================
// routes/taskRoutes.js
// ==========================================

const express = require("express");

const router = express.Router();

const Task = require("../models/Task");


// ==========================================
// CREATE TASK
// ==========================================

router.post("/create", async (req, res) => {

  try {

    const {
      title,
      description,
      dueDate,
      priority,
      status,
      assignedTo,
      project,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      status,
      assignedTo,
      project,
    });

    res.status(201).json({
      message: "Task Created Successfully",
      task,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

});


// ==========================================
// GET ALL TASKS
// ==========================================

router.get("/all", async (req, res) => {

  try {

    const tasks = await Task.find()
      .populate("assignedTo")
      .populate("project");

    res.status(200).json(tasks);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

});


// ==========================================
// GET SINGLE TASK
// ==========================================

router.get("/:id", async (req, res) => {

  try {

    const task = await Task.findById(
      req.params.id
    )
      .populate("assignedTo")
      .populate("project");

    if (!task) {

      return res.status(404).json({
        message: "Task Not Found",
      });

    }

    res.status(200).json(task);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

});


// ==========================================
// UPDATE TASK
// ==========================================

router.put("/update/:id", async (req, res) => {

  try {

    const updatedTask =
      await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json({
      message: "Task Updated",
      updatedTask,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

});


// ==========================================
// UPDATE TASK STATUS
// ==========================================

router.put(
  "/update-status/:id",
  async (req, res) => {

    try {

      const task = await Task.findById(
        req.params.id
      );

      if (!task) {

        return res.status(404).json({
          message: "Task Not Found",
        });

      }

      task.status = req.body.status;

      await task.save();

      res.status(200).json({
        message: "Status Updated",
        task,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message,
      });

    }

  }
);


// ==========================================
// DELETE TASK
// ==========================================

router.delete("/delete/:id", async (req, res) => {

  try {

    const task = await Task.findByIdAndDelete(
      req.params.id
    );

    if (!task) {

      return res.status(404).json({
        message: "Task Not Found",
      });

    }

    res.status(200).json({
      message: "Task Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;