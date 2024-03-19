const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const server = express();
const http = require("http");
const ffmpeg = require("fluent-ffmpeg");

const port = process.argv[2]|| 4201;

server.get("/", (req, res) => {
  res.send("Checking for connectivity...");
});

server.post("/music/receive-content", (req, res) => {
  //get the youtube URL and start downloading it, return a true flag to start downloading it later maybe?

  res.send("Checking for connectivity...");
});


server.get("/download/video", async (req, res) => {
  const URL = req.query.URL;
  const extension = req.query.extension || 'mp4';

  const { videoDetails } = await ytdl.getBasicInfo(URL);
  const title = req?.query?.namefile || videoDetails?.title || req.query.namefile || 'video';

console.log('-----> video hit', req.query, extension)

  res.header("Content-Disposition", `attachment; filename="${title}.webm"`);
  ytdl(URL).pipe(res);
})



server.get("/download/webm", async (req, res) => {
  const URL = req.query.URL;

  if (!URL) {
    res.send("No video URL found");
    return;
  }

  const { videoDetails } = await ytdl.getBasicInfo(URL);

  let title =  videoDetails?.title || "default";
  title= title.replace("(Official Video)", "");
  title= title.replace("(Official Audio)", "");
  title= title.replace("(Audio)", "");
  title = title.trim();
  
  res.header("Content-Disposition", `attachment; filename="${title}.mp3"`);

  ytdl(URL, { filter: "audioonly" }).pipe(res);
});

server.get("/download/mp3", (req, res) => {
  let cancelHeaders = false;
  try {
    const URL = req.query.URL;

    if (!URL) {
      res.status(500).send("No video URL found");
      return;
    }

    const songURL =
      req.protocol + "://" + req.get("host") + "/download/webm" + "?URL=" + URL;

    http.get(songURL, (stream) => {
      //make sure the rawHeaders third item is the right one
      const title =
        stream?.rawHeaders[3] || 'attachment; filename="default.mp3"';

      const outStream = ffmpeg(stream)
        .toFormat("mp3")
        .on("error", (err) => {
          console.log("________An error occurred in ", title, ":", err['message']);
          cancelHeaders =true;

          res.status(500).send({
            stack: err['stack'],
            label: "ffmpeg error",
            message: err["message"]
          })
        })
        .pipe();

        if(cancelHeaders) return;
        res.header("Content-Disposition", title);
        outStream.pipe(res);

    });
  } catch (error) {
    console.log("____Error catch:", error['message']);

    res.status(500).send({
      stack: err['stack'],
      message: error["message"],
      label: "something in catch",
    });

  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Example server listening on port ${port}`);
});
