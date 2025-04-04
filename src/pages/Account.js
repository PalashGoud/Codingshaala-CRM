import React, { useEffect, useState } from "react";
import axios from "axios";

const Account = () => {
  const [allStudentData, setAllStudentData] = useState([]);
  const [filterStudent, setFilterStudent] = useState("");
  const [studentDetail, setStudentDetail] = useState({});
  const [showModal, setShowModal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getStudentData();
  }, []);

  // Fetch Student Data
  const getStudentData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5001/api/student");
      setAllStudentData(res.data);
    } catch (err) {
      setError("Error fetching student data.");
    }
    setLoading(false);
  };

  // Delete Student
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/student/${id}`);
      alert("Student Deleted!");
      getStudentData();
    } catch (err) {
      alert("Failed to delete student.");
    }
  };

  // Update Student
  const updateStudent = async () => {
    try {
      await axios.put(
        `http://localhost:5001/api/student/${studentDetail._id}`,
        studentDetail
      );
      alert("Student Data Updated!");
      getStudentData();
      setShowModal("");
    } catch (err) {
      console.error(err);
      alert("Failed to update student.");
    }
  };

  // Filtered Students List
  const filteredStudents = allStudentData.filter((student) =>
    (student.studentName || "").toLowerCase().includes((filterStudent || "").toLowerCase())
  )

 

//  sorting
const [sortOrder, setSortOrder] = useState("");
const sortedStudents = [...filteredStudents].sort((a, b) => {
  const feesLeftA = a.fees.totalFee - a.fees.feePaid;
  const feesLeftB = b.fees.totalFee - b.fees.feePaid;

  if (sortOrder === "asc") return feesLeftA - feesLeftB;
  if (sortOrder === "desc") return feesLeftB - feesLeftA;
  return 0;
});


  return (
    <div className="p-6 bg-[#161928] h-full">
      <h1 className="text-3xl text-white font-bold mb-4">Account Management</h1>

      {/* Filter Input */}
      <input
        onChange={(e) => setFilterStudent(e.target.value)}
        type="text"
        placeholder="Filter by Name"
        className="p-2 border border-gray-300 rounded mb-4"
      />
     
     <select
  onChange={(e) => setSortOrder(e.target.value)}
  className="p-2 ml-2 border border-gray-300 rounded"
>
  <option value="">Sort by Fees Left</option>
  <option value="asc">Ascending</option>
  <option value="desc">Descending</option>
</select>

      

      {/* Loading & Error Handling */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Student Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#26322d] text-white rounded-lg shadow-lg">
          <thead className="bg-[#19221E]">
            <tr>
              <th className="py-3 px-4 text-left">Sr.</th>
              <th className="py-3 px-4 text-left">Student Name</th>
              <th className="py-3 px-4 text-left">Student Number</th>
              <th className="py-3 px-4 text-left">Total Fees</th>
              <th className="py-3 px-4 text-left">Fees Paid</th>
              <th className="py-3 px-4 text-left">Fees Left</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#446c5a]">
            {sortedStudents.map((student, index) => (
              <tr key={student._id} >
                <td className="py-2 px-4  ">{index + 1}</td>
                <td className="py-2 px-4  ">{student.studentName}</td>
                <td className="py-2 px-4  ">{student.studentMobile}</td>
                <td className="py-2 px-4  ">₹{student.fees.totalFee}</td>
                <td className="py-2 px-4  ">₹{student.fees.feePaid}</td>
                <td className="py-2 px-4  ">₹{student.fees.totalFee-student.fees.feePaid}</td>
                <td className="py-2 px-4  ">
                  <button
                    onClick={() => {
                      setStudentDetail(student);
                      setShowModal("Edit StudentDetail");
                    }}
                    className="bg-blue-500 text-white hover:bg-blue-600 h-8 w-[90px] mx-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteStudent(student._id)}
                    className="bg-red-600 text-white hover:bg-red-700 h-8 w-[90px] mx-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Student Modal */}
      {showModal === "Edit StudentDetail" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center z-[100] justify-center">
          <div className="bg-white flex flex-col h-[80vh] rounded-lg p-6 w-[80%] max-w-4xl overflow-scroll">
            <h2 className="text-xl font-bold mb-4">Edit Student Details</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Name Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  onChange={(e) =>
                    setStudentDetail({
                      ...studentDetail,
                      studentName: e.target.value,
                    })
                  }
                  value={studentDetail.studentName}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Mobile Number Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  onChange={(e) =>
                    setStudentDetail({
                      ...studentDetail,
                      studentMobile: e.target.value,
                    })
                  }
                  value={studentDetail.studentMobile}
                  className="w-full p-2 border rounded-md"
                />
              </div>
 
              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-1">total fees</label>
                <input type="number"
                onChange={(e)=>setStudentDetail({...studentDetail,fees :{...studentDetail.fees, totalFee:e.target.value}})}
                value={studentDetail.fees.totalFee}
                className="w-full p-2 border rounded-md"
                placeholder="Total Fees"
                 />
              </div> 
  
              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-1">Fees Paid</label>
                <input type="number"
                onChange={(e)=>setStudentDetail({...studentDetail,fees :{...studentDetail.fees, feePaid:e.target.value}})}
                value={studentDetail.fees.feePaid}
                className="w-full p-2 border rounded-md"
                placeholder="Fees Paid"
                 />
              </div>

            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowModal("")}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={updateStudent}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
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

export default Account;
