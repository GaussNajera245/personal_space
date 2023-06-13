const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const server = express();
const port = 4201;
const fs= require('fs')

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

    const webm = await fs.createReadStream('http://127.0.0.1:5500/BE/music/rosenrot.webm');
    // console.log({webm})
    
    
    // webm.pipe(res)
    // const A =  await ytdl(URL, {filter: "audioonly"});
    //   console.log({B})
    // webm.on('open', function () {
    //   webm.pipe(res);
    // });
    
    // webm.on('error', function(err) {
    //   res.end(err);
    // });
  }catch(e){
    console.log({e})
  }
})

server.use(  express.static(__dirname + '/'))

server.listen(port, '0.0.0.0',() => {
  console.log(`Example server listening on port ${port}`);
});


// stream_lectura.pipe(stream_escritura);