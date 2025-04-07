import React, { useState, useEffect } from "react";

const StudentProgress = () => {


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
      op 's Progress - Mern Stack
      </h1>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex space-x-4 mb-4">
        
            <div
            
              className="px-4 py-2 rounded-md text-white
                completedSteps.includes(index) bg-green-500"
            
            >
            
            </div>
         
        </div>

        <div className="flex justify-between items-center">
          <button
          
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Next Technology
          </button>

          <span className="text-gray-700 font-bold">
            Progress: %
          </span>
        </div>
      </div>
    </div>
  ) 
}
export default StudentProgress;
