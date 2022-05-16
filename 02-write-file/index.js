const fs = require('fs');
const path = require('path');
// const readline = require('readline');
const pathOutputAnswer = path.join('02-write-file','answer.txt');
const {stdin} = require('process');
// const { stdin: input, stdout: output, exit } = require('process');


// const rl = readline.createInterface({ input, output });
const readStream = fs.createReadStream(__filename);

let message;

readStream.on('open', ()=> { //// без него тоже работает


  fs.open(pathOutputAnswer, 'a+', (err)=>{
    if(err) throw err;
    console.log('Hello!');
  });

  stdin.on('data', (data)=> {
    message = data.toString().trim();
    // console.log(message);

    fs.appendFile(pathOutputAnswer, message, (err) => {
      if (err) throw err;
      
      let exit = () => {
        console.log('All ready done? So... by!');
        process.exit();
      };
      
      if(message === 'exit') {
        exit();
      }
      
      process.on('SIGINT', exit);
    });
  });

  
});








// rl.question('Hello, how are you?', (answer) => {
   
//   fs.appendFile( pathOutputAnswer, `[${answer}],`, (err) => {
//     if (err) throw err;
//     // console.log('Your answer has been saved!');
//   });
//   console.log(
//     'Thank you for your answers!'
//   );

// //   rl.prompt();
// });