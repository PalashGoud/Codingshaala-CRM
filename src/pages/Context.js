import axios from 'axios'
import React, { createContext, useState } from 'react'


export const Data = createContext()

function Context({children}) {
  const[allStudentData, setAllStudentData] = useState([])
  const getAllStudentData =()=>{
    axios.get("http://localhost:5001/api/student").then((res)=>{
      setAllStudentData(res.data)
  }
  )}
  const[allCourseData,setAllCourseData]=useState([])
   const getAllCourseData=()=>{
    axios.get("http://localhost:5001/api/course").then((res)=>{
      setAllCourseData(res.data.data)
    })
   }
  return (
    <Data.Provider value={{allStudentData, setAllStudentData, getAllStudentData,allCourseData,setAllCourseData,getAllCourseData}}>
    {children}
    </Data.Provider>
  )
}

export default Context