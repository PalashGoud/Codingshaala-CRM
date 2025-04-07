import React, { useContext, useEffect, useState } from 'react';
import { Data } from './Context';

const Dashboard = () => {
  useEffect(() => { getAllStudentData(); getAllCourseData() }, [])

  const { allStudentData, setAllStudentData, getAllStudentData, allCourseData, setAllCourseData, getAllCourseData } = useContext(Data)
  const allFeesData = allStudentData.map((i, index) => i.fees.totalFee).reduce((a, b) => a + b, 0)
  const allRemainingFeesData = allStudentData.map((i) => i.fees.totalFee - (i.fees.feePaid || 0)) .reduce((a, b) => a + b, 0);
  
  const [showTechnologies,setShowTechnologies]= useState("")
  const [showCourseModule,setShowCourseModule]= useState("")
  return (
    <div className="p-6 bg-[#161928] min-h-screen">
      <h1 className="text-3xl text-[white]  font-bold mb-6">Dashboard</h1>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#1A1E30]   rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-400">Total Students</h2>
          <p className="text-3xl font-bold text-blue-600">{allStudentData.length}</p>
        </div>
        <div className="bg-[#18221E] rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-400">Total Fees</h2>
          <p className="text-3xl font-bold text-green-400">₹{allFeesData.toLocaleString()}</p>
        </div>
        <div className="bg-[#211622] rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-400">Total Remaining Fees</h2>
          <p className="text-3xl font-bold text-red-600">₹{allRemainingFeesData.toLocaleString()}</p>
        </div>
        <div className="bg-[#212317] rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-400">Total Courses</h2>
          <p className="text-3xl font-bold text-yellow-600">{allCourseData.length}</p>
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-[#161928] rounded-lg shadow-lg p-6">
        <h2 className="text-xl text-white font-bold mb-4">Recent Students</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#403159] text-white">
              <tr >
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Mobile</th>
                <th className="py-3 px-4 text-left">Course</th>
                <th className="py-3 px-4 text-left">Fees To pay</th>


              </tr>
            </thead>
            <tbody>
              {allStudentData.slice(-10).map((student, index) => (
                <tr key={student._id} className="border-b text-white hover:bg-gray-800">
                  <td className="py-2 px-4">{student.studentName}</td>
                  <td className="py-2 px-4">{student.studentMobile}</td>
                  <td className="py-2 px-4">{student.course.title}</td>
                  <td className="py-2 px-4"> ₹{student.fees.totalFee - student.fees.feePaid}

                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Our Courses */}
      <div className="bg-[#161928] rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl text-white font-bold mb-4">Our Courses</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#403159] text-white">
              <tr>
                <th className="py-3 px-4 text-left">Course name</th>
                <th className="py-3 px-4 text-left">Duration</th>
                <th className="py-3 px-4 text-left">Modules</th>
                <th className="py-3 px-4 text-left">technologies</th>
                
              </tr>
            </thead>
            <tbody>
              {allCourseData.map((i, index) => (
                <tr key={index} className="border-b text-white hover:bg-gray-800">
                  <td className="py-2 px-4">{i.title}</td>
                  <td className="py-2 px-4">{i.courseFeatures.duration}</td>
                  
                  <td className="py-2 px-4"><button
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
                        onClick={() => setShowCourseModule(i.courseModules)}
                      > show Course Modules
                        
                      </button></td>

                  <td className="py-2 px-4"><button
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
                        onClick={() => setShowTechnologies(i.technologies)}
                      > show technologies
                        
                      </button></td>

                      
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {showTechnologies && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center z-[100] justify-center">
          <div className="bg-white flex flex-col rounded-lg p-6 w-[80%] max-w-4xl overflow-scroll">
            <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
            
            <ul className="list-disc pl-6">
              {showTechnologies.map((i, index) => (
                <li key={index} className="text-lg">{i.name}</li>
              ))}
            </ul>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowTechnologies("")}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      

      {showCourseModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center z-[100] justify-center">
          <div className="bg-white flex flex-col rounded-lg p-6 w-[80%] max-w-4xl overflow-scroll">
            <h2 className="text-2xl font-bold mb-4">Course Modules</h2>
            
            <ul className="list-disc pl-6">
              {showCourseModule.map((i, index) => (
                <li key={index} className="text-lg">{i.name}</li>
              ))}
            </ul>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowCourseModule("")}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      


    </div>
  );
};

export default Dashboard;