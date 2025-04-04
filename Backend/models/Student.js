const { default: mongoose } = require("mongoose")

const StudentSchema = new mongoose.Schema({
  studentName: String,
  studentMobile: Number,
  admissionDate: Date,
  attendance: {
        totalClasses: {
            type : Number,
            default : 0
        },
        holiday: {
            type : Number,
            default : 0
        },
  },
  fees: {
    mode: String,
    totalFee: Number,
    feePaid: Number,
    remainingFee: Number,
    paymentInfo: [
        {
            paymentDate: Date,
            amount: Number
        }
    ],
  },
  
  course: Object,
  courseCompletion: Array,

  projects: [
    {
        projectName: String,
        keyFeatures: [
            String
        ],
        projectSubmittedDate: Date,
        projectLink: String,
    },
  ]
  
})

module.exports = mongoose.model("Student", StudentSchema)