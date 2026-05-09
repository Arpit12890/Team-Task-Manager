// ==========================================
// routes/projectRoutes.js
// ==========================================

const express = require("express");

const Project = require("../models/Project");
const User = require("../models/User");

const auth = require("../middleware/authMiddleware");

const router = express.Router();


// ==========================================
// CREATE PROJECT
// CREATOR BECOMES ADMIN
// ==========================================

router.post("/create", auth, async (req, res) => {

  try {

    await User.findByIdAndUpdate(
      req.user.id,
      {
        role: "Admin",
      }
    );

    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      admin: req.user.id,
      members: [req.user.id],
    });

    res.status(201).json(project);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// ==========================================
// ADD MEMBER
// ==========================================

router.put(
  "/add-member/:projectId",
  auth,
  async (req, res) => {

    try {

      const project = await Project.findById(
        req.params.projectId
      );

      if (
        project.admin.toString() !== req.user.id
      ) {
        return res.status(403).json({
          message: "Only Admin Can Add Members",
        });
      }

      project.members.push(req.body.userId);

      await project.save();

      res.json({
        message: "Member Added",
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
// REMOVE MEMBER
// ==========================================

router.put(
  "/remove-member/:projectId",
  auth,
  async (req, res) => {

    try {

      const project = await Project.findById(
        req.params.projectId
      );

      if (
        project.admin.toString() !== req.user.id
      ) {
        return res.status(403).json({
          message: "Only Admin Can Remove Members",
        });
      }

      project.members = project.members.filter(
        (member) =>
          member.toString() !== req.body.userId
      );

      await project.save();

      res.json({
        message: "Member Removed",
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
// VIEW PROJECTS
// ==========================================

router.get("/all", auth, async (req, res) => {

  try {

    const projects = await Project.find({
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

});

module.exports = router;