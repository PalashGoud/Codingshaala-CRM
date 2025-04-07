const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// Get all courses
router.get("/", async (req, res) => {
  try {
    const course = await Course.find();
    res.status(200).json({ data: course });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single course by ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ data: course });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new course
router.post("/", async (req, res) => {
  try {
    const course = new Course(req.body);
    const newCourse = await course.save();
    res.status(201).json({ data: newCourse });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

// Update a course (PUT)
router.put("/:id", async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Returns updated document & runs validation
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ data: updatedCourse });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Delete a course
router.delete("/:id", async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndRemove(req.params.id);
    
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
