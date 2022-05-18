const fs = require('fs');
const path = require('path');
const pathOutputAnswer = path.join('02-write-file','answer.txt');
const {stdin} = require('process');


const readStream = fs.createReadStream(__filename);  // сreate streame

let message;


readStream.on('open', ()=> {                         // stream opened (its like console opened for input words)

  fs.open(path.join(__dirname, 'answer.txt'), 'w', (err) => {  // listener what create file if dir without her 
    if (err) throw err;
    console.log('Hello! You can to write what you want.. ');
  });

  stdin.on('data', (data)=> {      // listener open file for append
    message = data.toString().trim();

    let exit = () => {
      console.log('Everything is ready? Well.... goodbye!');
      process.exit();
    };

    if (message === 'exit') {
      exit();
    }

    fs.appendFile(pathOutputAnswer, message +'\n', (err) => {        /// append file
      if (err) throw err;
      
      process.on('SIGINT', exit);                                    /// if crl+c if "exit" close data entry terminal 
    });
  });

  
});
