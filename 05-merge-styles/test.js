const fs = require('fs');
const path = require('path');
const {Transform, pipeline} = require('stream');



const streamWrite = fs.createWriteStream(path.join('test.css'));

let arr = ['style-1.css', 'style-2.css', 'style-3.css'];
arr.forEach(nameFile =>{
  const readStream = fs.createReadStream(path.join('styles', nameFile));
  
  readStream.pipe(streamWrite);
});

  // const append = fs.appendFile('test.css', '1111', (err) => {
  //   if (err) console.log(err);
    
  // });

  // readStream.on('data', async (chunk) => {
  //   await fs.appendFile('test.css', chunk, (err) => {
  //     if (err) console.log(err);
  //   });
  // });
