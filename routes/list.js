
const router = require("express").Router();
const User = require("../models/user")
const List = require("../models/list")

// Create Task
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const existingUser = await User.findById(id);
    if (existingUser) {
      const list = new List({ title, body, user: existingUser });
      await list.save();
      existingUser.list.push(list);
      await existingUser.save();
      res.status(200).json({ list });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});
//Update Task

router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body } = req.body;
    const list = await List.findByIdAndUpdate(req.params.id, { title, body });
    list.save().then(() => res.status(200).json({ message: "Task Updated" }))
  } catch (error) {
    console.log(error);
  }
});


// Delete Task

router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const existingUser = await User.findByIdAndUpdate(id, { $pull: { list: req.params.id } });
    if (existingUser) {
      await List.findByIdAndDelete(req.params.id).then(() => res.status(200).json({ message: "task deleted" }));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get Task 



router.get("/getTask/:id", async (req, res) => {
  const list = await List.find({ user: req.params.id })

  if (list.length !== 0) {
    res.status(200).json({ list })
  }
  else {
    res.status(200).json({ "message": "No task" })
  }

})





module.exports = router