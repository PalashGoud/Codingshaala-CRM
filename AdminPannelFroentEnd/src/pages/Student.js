import React, { useEffect, useState } from "react";
import axios from "axios";

const Student = () => {

  useEffect(() => {
    getAllStudentData()
    getCourseData()
  }, [])

  const [showModal, setShowModal] = useState("")
  const [studentDetail, setStudentDetail] = useState({ fees: {} 
  })

  const [allStudentData, setAllStudentData] = useState([])

  const [filterStudent, setFilterStudent] = useState("")
  const [filterCourse, setFilterCourse] = useState("")
  const postStudentDetails = () => {
    axios.post("http://localhost:5001/api/student", studentDetail , {
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      alert("Updated Successfully");
      setShowModal("")
      getAllStudentData()
    }, 
  (err)=>{alert(err)})
  }

  const getAllStudentData = () => {
    axios.get("http://localhost:5001/api/student").then((res) => {
      setAllStudentData(res.data)
    }
    )
  }

  const updateStudent = () => {
    axios.put(`http://localhost:5001/api/student/${studentDetail._id}`, studentDetail)
      .then(res => { alert("Student Data Updated!"); getAllStudentData(); setShowModal("") })
      .catch(err => console.error(err));
  };

  const deleteStudent = (id) => {
    axios.delete(`http://localhost:5001/api/student/${id}`)
      .then(res => { alert("Student Data Deleted!"); getAllStudentData(); setShowModal("") })
      .catch(err => console.error(err));
  };

  const [allCourseData, setAllCourseData] = useState([])

  const getCourseData = () => {
    axios.get("http://localhost:5001/api/course").then((res) => {
      setAllCourseData(res.data.data)
    }
    )
  }

  const selectCourse =(e)=>{
    const courseObj = allCourseData.find((i)=> i.title == e.target.value)
    setStudentDetail({ ...studentDetail, course: {
      title: courseObj.title,
      description: courseObj.description,
  
    } })
  }



  // UI Components
  return (
    <div className="p-6 bg-[#1A1E30] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-[white] font-bold">Student Management</h1>
        <button
          onClick={() => setShowModal("ADD StudentDetail")}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Add New Student
        </button>
      </div>
      {/* Filter Inputs */}
      <div className="flex space-x-4 mb-6">
        <input
          onChange={(e) => setFilterStudent(e.target.value)}
          type="search"
          name="Student Name"
          placeholder="Filter by Name"
          className="p-2  bg-[#576DA5] text-black rounded"
        />

        <select
           onChange={(e) => e.target.value == "All Courses" ? setFilterCourse('') : setFilterCourse(e.target.value)}
          name="market"
          className="p-2  bg-[#576DA5]  rounded"
        >
          <option>All Courses</option>
          {allCourseData.map((i)=>
           <option onClick={(e)=> setFilterCourse(e.target.value)}>{i.title}</option>
          )}
        </select>

      </div>

      {/* Student Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-[#101714]">
            <tr>
              {[
                "S.No",
                "Name",
                "Mobile No.",
                "Admission Date",
                "Course",
                "Fees",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-[#304f40] text-white  divide-y divide-[#162b22]">
            {allStudentData.filter((i) => i.studentName.toLowerCase().includes(filterStudent.toLowerCase())&& i.course?.title?.includes(filterCourse)).map((i, index) =>
              <tr className="">
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4">{i.studentName}</td>
                <td className="px-6 py-4">{i.studentMobile}</td>
                <td className="px-6 py-4">{i.admissionDate.slice(0, 10).split('-').join('/')}</td>
                {/* <td className="px-6 py-4">{i.course}</td> */}
                <td className="px-6 py-4"> {i.course.title}
                </td>
                <td className="px-6 py-4">₹{i.fees.totalFee}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => { setStudentDetail(i); setShowModal("Edit StudentDetail") }}
                    className="bg-blue-500 text-white hover:bg-blue-600 h-8 w-[90px] mx-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteStudent(i._id)}
                    className="bg-red-600 text-white hover:bg-blue-500 h-8 w-[90px]"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal == "ADD StudentDetail" ? (
        <div className="fixed  inset-0 bg-black bg-opacity-50 flex items-center z-[100] justify-center">
          <div className="bg-white flex flex-col h-[80vh]  rounded-lg p-6 w-[80%] max-w-4xl overflow-scroll">
          {JSON.stringify(studentDetail)}
            <h2 className="text-xl font-bold mb-4">Add Student Details</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Market Name - Read Only */}
             
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>

                <input
                  onChange={(e) => setStudentDetail({ ...studentDetail, studentName: e.target.value })}
                  type="text"
                  className="w-full p-2 border rounded-md 0"
                />
              </div>

              {/* Open Time */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  onChange={(e) => setStudentDetail({ ...studentDetail, studentMobile: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Close Time */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Admission Date
                </label>
                <input type="datetime-local"
                  onChange={(e) => setStudentDetail({ ...studentDetail, admissionDate: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>



              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course
                </label>
                <select
                  onChange={(e) => selectCourse(e)}
                  className="w-full p-2 border rounded-md"
                >
                  <option selected disabled>Select Course</option>
                  {
                    allCourseData.map((i) => (
                      <option key={i._id} value={i.title}>
                        {i.title}
                      </option>
                    ))

                  }
                </select>
              </div>
              {/* Fees Details */}


              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-1">
                  Fees Details
                </label>
                <div>
                  <select
                    onChange={(e) => setStudentDetail({
                      ...studentDetail, fees: {
                        ...studentDetail.fees,
                        mode: e.target.value
                      }
                    })}
                    className="w-full border p-2 rounded-md" name="mode">
                    <option selected disabled value="">Select FeeMode</option>
                    <option value="One Shot">One Shot</option>
                    <option value="Installment">Installment</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-1">Total Fees</label>
                <input type="number"
                  onChange={(e) => setStudentDetail({ ...studentDetail, fees: { ...studentDetail.fees, totalFee: e.target.value } })}
                  className="w-full p-2 border rounded-md"
                  placeholder="Total Fees"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-1">Fees Paid</label>
                <input type="number"
                  onChange={(e) => setStudentDetail({ ...studentDetail, fees: { ...studentDetail.fees, feePaid: e.target.value } })}
                  className="w-full p-2 border rounded-md"
                  placeholder="Fees Paid"
                />
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
                onClick={() => { postStudentDetails() }}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* -----------------------Edit Student Details------------------------------------------ */}
      {showModal == "Edit StudentDetail" ? (
        <div className="fixed  inset-0 bg-black bg-opacity-50 flex items-center z-[100] justify-center">
          <div className="bg-white flex flex-col h-[80vh]  rounded-lg p-6 w-[80%] max-w-4xl overflow-scroll">
            <h2 className="text-xl font-bold mb-4">Edit Student Details</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Market Name - Read Only */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  onChange={(e) => setStudentDetail({ ...studentDetail, studentName: e.target.value })}
                  value={studentDetail.studentName}
                  className="w-full p-2 border rounded-md 0"
                />
              </div>

              {/* Open Time */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  onChange={(e) => setStudentDetail({ ...studentDetail, studentMobile: e.target.value })}
                  value={studentDetail.studentMobile}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Close Time */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Admission Date
                </label>
                <input type="datetime-local"
                  value={studentDetail.admissionDate}
                  className="w-full p-2 border rounded-md"
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

              {/* Fees Details */}


              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-1">
                  Fees Details
                </label>
                <div>
                  <select
                    onChange={(e) => setStudentDetail({
                      ...studentDetail, fees: {
                        ...studentDetail.fees,
                        mode: e.target.value
                      }
                    })}
                    value={studentDetail.fees.mode}
                    className="w-full border p-2 rounded-md" name="mode">
                    <option selected disabled value="">Select FeeMode</option>
                    <option value="One Shot">One Shot</option>
                    <option value="Installment">Installment</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-1">Total Fees</label>
                <input type="number"
                  onChange={(e) => setStudentDetail({ ...studentDetail, fees: { ...studentDetail.fees, totalFee: e.target.value } })}
                  value={studentDetail.fees.totalFee}
                  className="w-full p-2 border rounded-md"
                  placeholder="Total Fees"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-1">Fees Paid</label>
                <input type="number"
                  onChange={(e) => setStudentDetail({ ...studentDetail, fees: { ...studentDetail.fees, feePaid: e.target.value } })}
                  value={studentDetail.fees.feePaid}
                  className="w-full p-2 border rounded-md"
                  placeholder="Fees Paid"
                />
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
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                {"Update"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Student;