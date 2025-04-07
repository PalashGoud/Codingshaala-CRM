const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "./config.env" });
const app = express();
connectDB();

app.use(cors());
app.use(express.json({ extended: false, limit: "50mb" }));

// api names---
//example => app.use("/api/todo", require("./routes/todo"));

app.use("/api/course", require("./routes/course"));
app.use("/api/student", require("./routes/student"));
app.use('/api/user', require("./routes/user"))


const PORT = process.env.PORT || 5009;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));


 
