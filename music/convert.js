const fs = require("fs");
const http = require("http");
const ffmpeg = require("fluent-ffmpeg");

const songURL = "http://localhost:4201/download/webm?URL=https://www.youtube.com/watch?v=W2z8L5VT6as&ab_channel=ElefantRecords";

http.get(songURL, (stream) => {
  ffmpeg(stream)
    .toFormat("mp3")
    .on("error", (err) => {
      console.log("An error occurred: " + err.message);
    })
    .on("progress", (progress) => {
      // console.log(JSON.stringify(progress));
      console.log("Processing: " + progress.targetSize + " KB converted");
    })
    .on("end", () => {
      console.log("Processing finished !");
    })
    .save("./helloII.mp3"); //path where you want to save your file
});
