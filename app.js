const express = require("express");
require("./connec/connec");

const app = express();
const cors = require("cors");
const path = require("path");
const auth = require("./routes/auth");
const list = require("./routes/list");

const PORT = 1000;

app.use(express.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.resolve(__dirname, "frontend", "build")));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/user", auth);
app.use("/list", list);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`SERVER STARTED AT PORT ${PORT}`);
});
