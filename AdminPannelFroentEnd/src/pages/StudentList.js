import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const [allStudentData, setAllStudentData] = useState([]);
  const [filterStudent, setFilterStudent] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState("");
  const [studentDetail, setStudentDetail] = useState({});
  const [allCourseData, setAllCourseData] = useState([]);

  useEffect(() => {
    getAllStudentData();
    getAllCourseData();
  }, []);

  const getAllStudentData = () => {
    axios.get("http://localhost:5001/api/student").then((res) => {
      setAllStudentData(res.data);
    });
  };

  const updateStudent = () => {
    axios.put(`http://localhost:5001/api/student/${studentDetail._id}`, {
      ...studentDetail,
      course: studentDetail.course?._id, // Ensure only course ID is sent
    })
      .then(res => {
        alert("Student Data Updated!");
        getAllStudentData();
        setShowModal("");
      })
      .catch(err => console.error(err));
  };

  const getAllCourseData = () => {
    axios.get("http://localhost:5001/api/course").then((res) => {
      setAllCourseData(res.data.data);
    });
  };
  const selectCourse = (e) => {
    const courseObj = allCourseData.find((i) => i.title == e.target.value)
    setStudentDetail({
      ...studentDetail, course: {
        title: courseObj.title,
        description: courseObj.description,

      }
    })
  }

  const filteredStudents = allStudentData.filter((student) =>
    (student.studentName || "").toLowerCase().includes((filterStudent || "").toLowerCase())
  );

  return (
    <div className="p-6 bg-[#161928] h-full">
      <h1 className="text-3xl text-white font-bold mb-4">Check Student Progress</h1>

      <input
        onChange={(e) => setFilterStudent(e.target.value)}
        type="text"
        placeholder="Filter by Name"
        className="p-2 border border-gray-300 rounded mb-4"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#26322d] text-white rounded-lg shadow-lg">
          <thead className="bg-[#19221E]">
            <tr>
              <th className="py-3 px-4 text-left">Sr.</th>
              <th className="py-3 px-4 text-left">Student Name</th>
              <th className="py-3 px-4 text-left">Course</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#446c5a]">
            {filteredStudents.map((i, index) => (
              <tr key={i._id}>
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{i.studentName}</td>
                <td className="py-2 px-4">{i.course.title}</td>
                <td className="py-2 px-4 gap-2 flex">
                  <button
                    onClick={() => navigate(`/progress/${i._id}`)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    View Progress
                  </button>
                  <button
                    onClick={() => { setStudentDetail(i); setShowModal("updatecourse"); }}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Update Course
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal === "updatecourse" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center z-[100] justify-center">
          <div className="bg-white flex flex-col h-[80vh] rounded-lg p-6 w-[80%] max-w-4xl overflow-scroll">
            <h2 className="text-xl font-bold mb-4">Update Student Course</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  value={studentDetail.studentName || ""}
                  type="text"
                  className="w-full p-2 border rounded-md"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course
                </label>
                <select
                  onChange={(e) => selectCourse(e)}
                  className="w-full p-2 border rounded-md"
                  value={studentDetail.course.title}
                >
                  <option value="" selected disabled>Select Course</option>
                  {
                    allCourseData.map((i) => (
                      <option key={i._id} value={i.title}>
                        {i.title}
                      </option>
                    ))

                  }
                </select>
              </div>

              <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Completed</label>

                <div>
                  //yha pr paste kro//
                </div>

              </div>


            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowModal("")}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={() => updateStudent()}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
