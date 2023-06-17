const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const server = express();
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
  const URL = req.query.URL;

  if (!URL) {
    res.send("No video URL found");
    return;
  }

  const { videoDetails } = await ytdl.getBasicInfo(URL);

  const title = (
    videoDetails.title.replace("(Official Video)", "") || "default"
  ).trim("");

  res.header("Content-Disposition", `attachment; filename="${title}.mp3"`);

  ytdl(URL, { filter: "audioonly" }).pipe(res);
});

server.get("/download/mp3", async (req, res) => {
  try {
    const URL = req.query.URL;

    if (!URL) {
      res.send("No video URL found");
      return;
    }
    const songURL =
      req.protocol + "://" + req.get("host") + "/download/webm" + "?URL=" + URL;

    http.get(songURL, (stream) => {
      const title =
        stream?.rawHeaders[3] || 'attachment; filename="default.mp3"';

      const outStream = ffmpeg(stream)
        .toFormat("mp3")
        .on("error", (err) => {
          console.log("An error occurred: " + err.message);
        })
        .on("progress", (progress) => {
          // console.log("Processing: " + progress.targetSize + " KB converted");
        })
        .on("end", () => {
          console.log("Processing finished !");
        })
        .pipe();

      res.header("Content-Disposition", title); //probabyl share the raw headers

      outStream.pipe(res);
    });
  } catch (e) {
    console.log({ e });
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Example server listening on port ${port}`);
});
