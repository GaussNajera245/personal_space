const FFmpeg = require('@ffmpeg/ffmpeg');
const fs = require('fs');

async function convertWebmToMp3(webmBlob ) {
  
  const ffmpeg = createFFmpeg({ log: false });
  await ffmpeg.load();

  const inputName = 'input.webm';
  const outputName = 'output.mp3';

  ffmpeg.FS('writeFile', inputName, await fetch(webmBlob).then((res) => res.arrayBuffer()));

  await ffmpeg.run('-i', inputName, outputName);

  const outputData = ffmpeg.FS('readFile', outputName);
  const outputBlob = new Blob([outputData.buffer], { type: 'audio/mp3' });

  return outputBlob;
}

const song  = fs.createReadStream('./rosenrot.webm');
var ffmpeg = require('fluent-ffmpeg');

    let track = song;//your path to source file

    ffmpeg(track)
    .toFormat('mp3')
    .on('error', (err) => {
        console.log('An error occurred: ' + err.message);
    })
    .on('progress', (progress) => {
        // console.log(JSON.stringify(progress));
        console.log('Processing: ' + progress.targetSize + ' KB converted');
    })
    .on('end', () => {
        console.log('Processing finished !');
    })
    .save('./hello.mp3');//path where you want to save your file