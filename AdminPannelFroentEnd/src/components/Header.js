import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import CoadingshaalaLogo from '../CodingshaalaWhite-removebg-preview.png'
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()
  
  return (
    <header className="flex h-[10vh] justify-between items-center bg-[#222331] text-white p-4   shadow-md">
      <div className="flex w-[60%] justify-between items-center">
        <img className="h-[12vh] w-[14vh]" src={CoadingshaalaLogo}></img>
        <h1 className="text-2xl text-white font-bold">CodingShala Admin Panel</h1>
      </div>
      <div className="flex items-center space-x-6">
        <FaBell
          className="text-xl cursor-pointer hover:text-black"
          
        />
        <FaUserCircle onClick={() => navigate("/login")} className="text-xl cursor-pointer hover:text-red-500" />
      </div>

      
    </header>
  );
};

export default Header;
