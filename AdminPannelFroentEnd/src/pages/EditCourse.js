import axios from "axios";
import React, { useState } from "react";

const EditCourse = ({ courseData }) => {
  const [course, setCourse] = useState(JSON.parse(localStorage.getItem("course")));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleModuleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedModules = [...course.courseModules];
    updatedModules[index][name] = value;
    setCourse({ ...course, courseModules: updatedModules });
  };

  const handleLessonChange = (moduleIndex, lessonIndex, e) => {
    const { name, value } = e.target;
    const updatedModules = [...course.courseModules];
    updatedModules[moduleIndex].lessons[lessonIndex][name] = value;
    setCourse({ ...course, courseModules: updatedModules });
  };

  const handleTechnologyChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTechnologies = [...course.technologies];
    updatedTechnologies[index][name] = value;
    setCourse({ ...course, technologies: updatedTechnologies });
  };

  const updateCourse = () => {
    axios.put("http://localhost:5001/api/course/" + course._id, course)
      .then((res) => {
        alert("Course Data Updated!");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Edit Course</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <label className="block text-lg font-semibold">Course Title</label>
        <input
          type="text"
          name="title"
          value={course.title}
          onChange={handleInputChange}
          className="w-full p-2 mt-2 rounded bg-gray-700"
        />

        <label className="block mt-4 text-lg font-semibold">Description</label>
        <textarea
          name="description"
          value={course.description}
          onChange={handleInputChange}
          className="w-full p-2 mt-2 rounded bg-gray-700"
        />

        <label className="block mt-4 text-lg font-semibold">Duration</label>
        <input
          type="text"
          name="courseFeatures.duration"
          value={course.courseFeatures.duration}
          onChange={handleInputChange}
          className="w-full p-2 mt-2 rounded bg-gray-700"
        />
      </div>

      <h2 className="text-2xl font-bold mt-6">Modules</h2>
      {course.courseModules.map((module, moduleIndex) => (
        <div key={module.id} className="bg-gray-800 p-4 mt-4 rounded-lg">
          <label className="block text-lg font-semibold">Module Name</label>
          <input
            type="text"
            name="name"
            value={module.name}
            onChange={(e) => handleModuleChange(moduleIndex, e)}
            className="w-full p-2 mt-2 rounded bg-gray-700"
          />

          <label className="block mt-2 text-lg font-semibold">Description</label>
          <textarea
            name="description"
            value={module.description}
            onChange={(e) => handleModuleChange(moduleIndex, e)}
            className="w-full p-2 mt-2 rounded bg-gray-700"
          />

          <h3 className="text-xl font-semibold mt-4">Lessons</h3>
          {module.lessons.map((lesson, lessonIndex) => (
            <div key={lesson.id} className="bg-gray-700 p-3 mt-2 rounded-md">
              <label className="block font-semibold">Lesson Title</label>
              <input
                type="text"
                name="title"
                value={lesson.title}
                onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, e)}
                className="w-full p-2 mt-2 rounded bg-gray-600"
              />
            </div>
          ))}
        </div>
      ))}

      <h2 className="text-2xl font-bold mt-6">Technologies</h2>
      {course.technologies.map((tech, index) => (
        <div key={tech.id} className="bg-gray-800 p-4 mt-4 rounded-lg">
          <label className="block text-lg font-semibold">Technology Name</label>
          <input
            type="text"
            name="name"
            value={tech.name}
            onChange={(e) => handleTechnologyChange(index, e)}
            className="w-full p-2 mt-2 rounded bg-gray-700"
          />

          <label className="block mt-2 text-lg font-semibold">Description</label>
          <textarea
            name="description"
            value={tech.description}
            onChange={(e) => handleTechnologyChange(index, e)}
            className="w-full p-2 mt-2 rounded bg-gray-700"
          />
        </div>
      ))}

      <button
        onClick={updateCourse}
        className="mt-6 px-6 py-2 bg-blue-500 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditCourse;
