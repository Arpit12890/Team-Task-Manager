// ==========================================
// routes/taskRoutes.js
// ==========================================

const express = require("express");

const router = express.Router();

const Task = require("../models/Task");

const auth = require(
  "../middleware/authMiddleware"
);


// ==========================================
// CREATE TASK
// ADMIN ONLY
// ==========================================

router.post(
  "/create",
  auth,
  async (req, res) => {

    try {

      if (
        req.user.role !==
        "Admin"
      ) {

        return res.status(403).json({
          message:
            "Only Admin Can Create Tasks",
        });

      }

      const task =
        await Task.create({

          title:
            req.body.title,

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


// ==========================================
// GET TASKS
// ==========================================

router.get(
  "/all",
  auth,
  async (req, res) => {

    try {

      let tasks;

      // ADMIN

      if (
        req.user.role ===
        "Admin"
      ) {

        tasks =
          await Task.find()
          .populate(
            "assignedTo"
          )
          .populate(
            "project"
          );

      }

      // MEMBER

      else {

        tasks =
          await Task.find({

            assignedTo:
              req.user._id,

          })
          .populate(
            "assignedTo"
          )
          .populate(
            "project"
          );

      }

      res.json(tasks);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);


// ==========================================
// UPDATE STATUS
// ==========================================

router.put(
  "/update-status/:id",
  auth,
  async (req, res) => {

    try {

      const task =
        await Task.findById(
          req.params.id
        );

      // ADMIN CAN UPDATE ALL

      if (
        req.user.role ===
        "Admin"
      ) {

        task.status =
          req.body.status;

        await task.save();

        return res.json({

          message:
            "Task Updated",

          task,

        });

      }

      // MEMBER ONLY OWN TASK

      if (
        task.assignedTo.toString() !==
        req.user._id.toString()
      ) {

        return res.status(403).json({
          message:
            "You Can Update Only Assigned Tasks",
        });

      }

      task.status =
        req.body.status;

      await task.save();

      res.json({

        message:
          "Task Updated",

        task,

      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);


// ==========================================
// DELETE TASK
// ADMIN ONLY
// ==========================================

router.delete(
  "/delete/:id",
  auth,
  async (req, res) => {

    try {

      if (
        req.user.role !==
        "Admin"
      ) {

        return res.status(403).json({
          message:
            "Only Admin Can Delete Tasks",
        });

      }

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