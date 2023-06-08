const express = require("express");
const app = express();
const port = 4201;

app.get("/", (req, res) => {
  res.send("Checking for connectivity...");
});

app.post("/music/receive-content", (req, res) => {
//get the youtube URL and start downloading it, return a true flag to start downloading it later maybe?


  res.send("Checking for connectivity...");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
