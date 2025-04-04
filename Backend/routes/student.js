const Student = require("../models/Student");
const express = require('express')
const router = express.Router()

router.post('/', async(req, res)=>{
    try {
     
        const student = new Student(req.body)
        const newStudent = await student.save()
        res.status(201).json({data : newStudent}) 
    } catch (error) {
      console.log('ok', error)
       res.status(500).json(`Error: ${error.message}`) 
    }
})

router.get('/', async(req, res)=>{
    try {
        const students = await Student.find(req.body)
        res.status(200).json(students)
    } catch (error) {
        res.status(500).json(`Error: ${error.message}`)
    }
})

// ✅ Update Student Info (PUT)
router.put("/:id", async(req, res) => {
    try {
      const student = await Student.findByIdAndUpdate(req.params.id, req.body)
      res.json({message: "Student details updated!", student})

    } catch (error) {
      res.status(404).json({message: "Student not Found!"})
    }
  });

  
// ✅ Delete Student (DELETE)
router.delete("/:id", async(req, res) => {
    try {
      const student = await Student.findByIdAndDelete(req.params.id)
      res.status(200).json(student)
    } catch (error) {
      res.status(500).json(`Error Found : ${error.message}`)
    }
  });

module.exports = router