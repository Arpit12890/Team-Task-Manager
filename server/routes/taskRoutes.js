const express = require("express");

const router = express.Router();

const Task = require("../models/Task");

const auth = require(
  "../middleware/authMiddleware"
);

router.post(
  "/create",
  auth,
  async (req, res) => {

    try {

      const task =
        await Task.create({
          title: req.body.title,
          description:
            req.body.description,
          dueDate:
            req.body.dueDate,
          priority:
            req.body.priority,
          status:
            req.body.status,
          assignedTo:
            req.body.assignedTo,
          project:
            req.body.project,
        });

      res.status(201).json({
        message:
          "Task Created Successfully",
        task,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

router.get(
  "/all",
  auth,
  async (req, res) => {

    try {

      const tasks =
        await Task.find()
        .populate("assignedTo")
        .populate("project");

      res.json(tasks);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

router.put(
  "/update-status/:id",
  auth,
  async (req, res) => {

    try {

      const task =
        await Task.findById(
          req.params.id
        );

      task.status =
        req.body.status;

      await task.save();

      res.json({
        message:
          "Task Status Updated",
        task,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

router.delete(
  "/delete/:id",
  auth,
  async (req, res) => {

    try {

      await Task.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Task Deleted Successfully",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

module.exports = router;