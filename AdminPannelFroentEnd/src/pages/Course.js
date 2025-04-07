import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Course = () => {
  const navigate = useNavigate()
  useEffect(() => {
    getAllCourseData();
  }, []);

  const [showModal, setShowModal] = useState("");
  const [courseData, setCourseData] = useState({ projects: [] });
  const [singleCourseInfo, setSingleCourseInfo] = useState({ topics: [] })
  const [singleTopic, setSingleTopic] = useState("")
   const [filterCourse, setFilterCourse] = useState("")
  const [projects, setProjects] = useState([]);
  const [projectInput, setProjectInput] = useState("");



  const postCoursedata = () => {
    
    axios.post("http://localhost:5001/api/course", courseData).then((res) => {
      alert("Updated Successfully");
      getAllCourseData();
      setShowModal("");
      setCourseData({ projects: [] });
      setProjects([]);
      setProjectInput("");
    });
  };

  const [allCourseData, setAllCourseData] = useState([]);

  const getAllCourseData = () => {
    axios.get("http://localhost:5001/api/course").then(
      (res) => {
        setAllCourseData(res.data.data);
      },
      (err) => {
        alert(err.message);
      }
    );
  };

  const deleteCourse = (id) => {
    axios.delete(`http://localhost:5001/api/course/${id}`).then(
      (res) => {
        alert("Course Deleted!");
        getAllCourseData();
      },
      (err) => alert(err.message)
    );
  };

  const updateCourse = (id) => {
    axios.put(`http://localhost:5001/api/course/${id}`, courseData).then(
      (res) => {
        alert("Updated Successfully!");
        getAllCourseData({ projects: [] } );
        setShowModal("");
        setProjects([]);
        setProjectInput("");
      },
      (err) => alert(err.message)
    );
  };

  const addProject = () => {
    if (projectInput.trim() === "") {
      alert("Please enter a project");
      return;
    }
    setCourseData({ ...courseData, projects: [...courseData.projects, projectInput.trim()] });
    setProjectInput("");
  };

  const addTopic = () => {

    setSingleCourseInfo({ ...singleCourseInfo, topics: [...singleCourseInfo.topics, singleTopic] });
    setSingleTopic("");
  };

  const removeTopic = (index) => {
    setSingleCourseInfo({
      ...singleCourseInfo,
      topics: singleCourseInfo.topics.filter((i, jindex) => index != jindex)
    })
  }


  
  const removeProject = (index) => {
    setCourseData({
      ...courseData,
      projects: courseData.projects.filter((i, jindex) => index != jindex)
    });
  };


  return (
    <div className="p-6 bg-[#161928] min-h-screen">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-[white] font-bold">Course Management</h1>
       
        <button
          onClick={() => {
            
            setShowModal("Add Course");
            setCourseData({ projects: [] });
            setProjects([]);
            setProjectInput("");
          }}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Add New Course
        </button>
      </div>
      <input
          onChange={(e) => setFilterCourse(e.target.value)}
          placeholder="Filter by Course"
          className="p-2 bg-[#576DA5] text-black rounded"
        />

      <div className="overflow-x-auto mt-2 bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-[#140d15]">
            <tr>
              {["S.No", "CourseName", "Duration"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                )
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-[#211622] text-white divide-y divide-[#462f48]">
            {allCourseData.filter((i) => i.title.toLowerCase().includes(filterCourse.toLowerCase())).map((i, index) => (
              <tr className="" key={i._id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4">{i.title}</td>
                <td className="px-6 py-4">{i.courseFeatures.duration}</td>
              
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => {
                      localStorage.setItem('course', JSON.stringify(i))
                      navigate('/edit-course')
                      setCourseData(i);
                      setShowModal("Edit Course");
                      setProjects(i.projects || []);
                      setProjectInput("");
                    }}
                   className="bg-blue-500 text-white hover:bg-blue-600 rounded-md h-8 w-[90px] mx-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCourse(i._id)}
                      className="bg-red-500 text-white hover:bg-red-600 rounded-md h-8 w-[90px] mx-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ----------------------- Add Course Modal ----------------------- */}
      {showModal === "Add Course" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center z-[100] justify-center">
          <div className="bg-white flex flex-col h-[80vh] rounded-lg p-6 w-[80%] max-w-4xl overflow-scroll">
            <h2 className="text-xl font-bold mb-4">Add Course Details</h2>
            {JSON.stringify(courseData)}
            <div className="grid grid-cols-2 gap-4">
              {/* CourseName */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CourseName
                </label>
                <input
                  onChange={(e) =>
                    setCourseData({
                      ...courseData,
                      title: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  onChange={(e) =>
                    setCourseData({
                      ...courseData,
                      type: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Type</option>
                  <option value="with placement">With Placement</option>
                  <option value="without placement">Without Placement</option>
                </select>
              </div>

             

              {/* Duration */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  onChange={(e) =>
                    setCourseData({
                      ...courseData,
                      courseFeatures: {
                        ...courseData.courseFeatures,
                        duration: e.target.value,
                      },
                    })                    
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>


            </div>

            {/* New Projects List Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Add Projects
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={projectInput}
                  onChange={(e) => setProjectInput(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter project name"
                />
                <button
                  onClick={addProject}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
              {courseData.projects.length > 0 && (
                <ul className="list-disc ml-5">
                  {courseData.projects.map((proj, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span>{proj}</span>
                      <button
                        onClick={() => removeProject(index)}
                        className="text-red-500 text-xs"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {JSON.stringify(singleCourseInfo)}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Add Course Detail
              </label>

              <input
                placeholder="Module Name"
                onChange={(e) =>
                  setSingleCourseInfo({
                    ...singleCourseInfo,
                    moduleName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md mb-2"
              />
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={singleTopic}
                  onChange={(e) => setSingleTopic(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter Topic"
                />
                <button
                  onClick={addTopic}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
              {singleCourseInfo.topics.length > 0 && (
                <ul className="list-disc ml-5">
                  {singleCourseInfo.topics.map((proj, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span>{proj}</span>
                      <button
                        onClick={() => removeTopic(index)}
                        className="text-red-500 text-xs"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
               <button
                  onClick={() => {
                    setCourseData({
                      ...courseData,
                      courseDetails: [...(courseData.courseDetails || []), singleCourseInfo],
                    });
                    setSingleCourseInfo({ moduleName: "", topics: [] });
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mt-2"
                >
                  Add to Course Data
                </button>

            </div>


            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowModal("")}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={postCoursedata}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                POST
              </button>
            </div>
          </div>
        </div>
      )}
     

    </div>
  );
};

export default Course;
