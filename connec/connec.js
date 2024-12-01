const mongoose = require("mongoose");

const conn = async (req, res) => {
  try {
    await mongoose.connect("mongodb+srv://SyedAbeer:abeer123@to-do-app.f3i5y.mongodb.net/").then(() => {
      console.log("MongoDB is connected")
    })
  } catch (error) {
    res.status(400).json({
      message: "not connected",
    })
  }
}

conn();







