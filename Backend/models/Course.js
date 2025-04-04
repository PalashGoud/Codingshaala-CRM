const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
    title: String,
    image:String, 
    description: String,
    courseModules: Array,
    projects: Array,
    technologies: Array,
    courseFeatures: Object
});

module.exports = mongoose.model("Course", CourseSchema);
