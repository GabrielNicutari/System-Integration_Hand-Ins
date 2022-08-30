const express = require("express");
const app = express();

// because I have node v14 on this computer at the moment
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// this fetches from python
app.get("/", async (req, res) => {
  const response = await fetch("http://127.0.0.1:8000/timestamp");
  const datetime = await response.json();
  const date = new Date(datetime.Date);
  res.send(date);
});

// python fetches from here
app.get("/timestamp", async (req, res) => {
  const datetime = new Date();
  res.send({ Date: datetime });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
