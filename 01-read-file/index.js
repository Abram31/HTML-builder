const fs = require('fs');
const path = require('path');
const pathText = path.join(__dirname, 'text.txt');

fs.readFile(pathText, 'utf-8', (err,data)=> {
  console.log(data);
});


