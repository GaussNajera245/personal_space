const fs = require("fs");
const ytdl = require("ytdl-core");

const URL = "https://www.youtube.com/watch?v=WWTFfEnMCCc";


(async () => {
  try {
    const info = await ytdl.getInfo(URL);
    const stream = ytdl.filterFormats(info.formats, 'audioonly');

    console.log({stream})


  } catch (err) {
    console.log('_____Error:', err)
  }
})();
