import React from "react";
import {
  FaHome,
  FaPlusCircle,
  FaChartBar,
  FaMoneyBillWave,
  FaUsers,
  FaHistory,
  FaUniversity,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/");
  };

  return (
    <div className="bg-gray-900 text-white w-full shadow-md z-50">
      <ul className="flex justify-around py-2 border-t border-gray-700">
        <li
          onClick={() => navigate("/")}
          className="flex flex-col items-center cursor-pointer p-2 hover:text-blue-400 transition duration-300"
        >
          <FaHome className="text-2xl" />
          <span className="text-sm mt-1">Dashboard</span>
        </li>
        <li
          onClick={() => navigate("/student")}
          className="flex flex-col items-center cursor-pointer p-2 hover:text-blue-400 transition duration-300"
        >
          <FaChartBar className="text-2xl" />
          <span className="text-sm mt-1">Students</span>
        </li>
        <li
          onClick={() => navigate("/course")}
          className="flex flex-col items-center cursor-pointer p-2 hover:text-blue-400 transition duration-300"
        >
          <FaChartBar className="text-2xl" />
          <span className="text-sm mt-1">Course</span>
        </li>
        
        <li
          onClick={() => navigate("/account")}
          className="flex flex-col items-center cursor-pointer p-2 hover:text-blue-400 transition duration-300"
        >
          <FaUsers className="text-2xl" />
          <span className="text-sm mt-1">Account</span>
        </li>
        {/* <li
          onClick={() => navigate("/studentlist")}
          className="flex flex-col items-center cursor-pointer p-2 hover:text-blue-400 transition duration-300"
        >
          <FaUsers className="text-2xl" />
          <span className="text-sm mt-1">StudentList</span>
        </li>
        <li
          onClick={() => navigate("/progress")}
          className="flex flex-col items-center cursor-pointer p-2 hover:text-blue-400 transition duration-300"
        >
          <FaUsers className="text-2xl" />
          <span className="text-sm mt-1">Progress</span>
        </li> */}
        
      </ul>
    </div>
  );
};

export default Sidebar;
