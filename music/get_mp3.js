const fs = require("fs");
const ytdl = require("ytdl-core");

const URL = "https://www.youtube.com/watch?v=WWTFfEnMCCc";

// function downloadContent(valueURL){

ytdl(URL, { filter: "audioonly", forma: "mp3" });
// }

// downloadContent(process.argv[2] || URL)

 
  ytdl.getInfo(URL, { quality: "highestaudio" }, function (err, info) {
    const stream = ytdl.downloadFromInfo(info, {
      quality: "highestaudio",
    });

    console.log("err", err);

    ffmpeg(stream)
      .audioBitrate(info.formats[0].audioBitrate)
      .withAudioCodec("libmp3lame")
      .toFormat("mp3")
      .saveToFile(`./videoId.mp3`)
      .on("error", function (err) {
        console.log("error", err);
      })
      .on("end", function () {
       console.log('end_____')
      });
  });
