const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const server = express();
const fs = require("fs");
const http = require("http");
const ffmpeg = require("fluent-ffmpeg");

const port = 4201;


server.get("/", (req, res) => {
  res.send("Checking for connectivity...");
});

server.post("/music/receive-content", (req, res) => {
  //get the youtube URL and start downloading it, return a true flag to start downloading it later maybe?

  res.send("Checking for connectivity...");
});

server.get("/download/webm", async (req, res) => {
  const URL = req.query.URL || 'https://www.youtube.com/watch?v=1M02bAWDFkI';
  res.header("Content-Disposition", 'attachment; filename="video.mp3"');

  ytdl(URL, {filter: "audioonly"}).pipe(res)
});


server.get('/download/mp3', async(req, res)=>{
  try{
    const songURL = "http://localhost:4201/download/webm";
    
    http.get(songURL, (stream) => {
      const outStream = ffmpeg(stream)
        .toFormat("mp3")
        .on("error", (err) => {
          console.log("An error occurred: " + err.message);
        })
        .on("progress", (progress) => {
          console.log("Processing: " + progress.targetSize + " KB converted");
        })
        .on("end", () => {
          console.log("Processing finished !");
        }).pipe();
        
        res.header("Content-Disposition", 'attachment; filename="tiki.mp3"');
        
        outStream.pipe(res)
    });
    
  }catch(e){
    console.log({e})
  }
})

server.use(  express.static(__dirname + '/'))

server.listen(port, '0.0.0.0',() => {
  console.log(`Example server listening on port ${port}`);
});

