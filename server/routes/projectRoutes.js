// ==========================================
// routes/projectRoutes.js
// ==========================================

const express = require("express");

const router = express.Router();

const Project = require("../models/Project");

const auth = require(
  "../middleware/authMiddleware"
);


// ==========================================
// CREATE PROJECT
// ==========================================

router.post(
  "/create",
  auth,
  async (req, res) => {

    try {

      const project =
        await Project.create({
          title: req.body.title,
          description:
            req.body.description,
          admin: req.user.id,
          members: [req.user.id],
        });

      res.status(201).json({
        message:
          "Project Created Successfully",
        project,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);


// ==========================================
// JOIN PROJECT
// ==========================================

router.put(
  "/join/:projectId",
  auth,
  async (req, res) => {

    try {

      const project =
        await Project.findById(
          req.params.projectId
        );

      if (!project) {

        return res.status(404).json({
          message:
            "Project Not Found",
        });

      }

      if (
        !project.members.includes(
          req.user.id
        )
      ) {

        project.members.push(
          req.user.id
        );

        await project.save();

      }

      res.json({
        message:
          "Joined Project Successfully",
        project,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);


// ==========================================
// GET ALL PROJECTS
// ==========================================

router.get(
  "/all",
  auth,
  async (req, res) => {

    try {

      const projects =
        await Project.find()
        .populate("admin")
        .populate("members");

      res.json(projects);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);


// ==========================================
// GET MY PROJECTS
// ==========================================

router.get(
  "/my-projects",
  auth,
  async (req, res) => {

    try {

      const projects =
        await Project.find({
          members: req.user.id,
        })
        .populate("admin")
        .populate("members");

      res.json(projects);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  }
);

module.exports = router;