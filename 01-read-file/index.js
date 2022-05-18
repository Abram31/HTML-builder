const fs = require('fs');
const path = require('path');
const pathText = path.join(__dirname, 'text.txt'); // path to file
const readStream = fs.createReadStream(pathText, {encoding: 'utf-8'}); // new Stream creating

readStream.on('data', (data)=> {              // add new listener for Stream
  console.log(data.trim());
});





