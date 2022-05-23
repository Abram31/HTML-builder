
const fs = require('fs');
const{readdir,stat,writeFile} = require('fs/promises');
const path = require('path');
const { Stream } = require('stream');


let arrWithNameFiles = [];
let stringBundle;
let bundle = [];

////variant with readdir
  
fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (async(err, dirent) => {            
  if(err) throw err;
  dirent.forEach(file => {
    if (path.extname(file.name) === '.css') {
      arrWithNameFiles.push(file.name);
    }
  });
  // console.log(arrWithNameFiles);
  arrWithNameFiles.forEach((nameFile, index) => {
    const stream = fs.createReadStream(path.join(__dirname, 'styles', nameFile));

    let dataFile;
    stream.on('data', (data) => {
      dataFile = data;
      // console.log(data[1]);

    });
    stream.on('end',  () => {
      bundle.push(dataFile);
      // console.log(dataFile[1]);

      // if (index === arrWithNameFiles.length - 1) {
      stringBundle = bundle.join('').toString();
      // console.log(222222);

      fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), stringBundle, (err) => {
        if (err)
          console.log(err);
       
      });

    });




  });

}));


  







// ---------------------------------------Sample --------------------------------------------

// let arrayWithElementsDir;
// let arrayWithNameFile = [];
// let arrayWithDataFromFiles = [];
// // stream.on('open',  () => {
// async function readFolder() {
//   arrayWithElementsDir = await readdir(path.join(__dirname,'styles'), { withFileTypes: true });
//   await arrayWithElementsDir.forEach( async (dirent) => {
    
//     if (path.extname(dirent.name) === '.css') {
//       arrayWithNameFile.push(dirent.name);

//       await fs.readFile(path.join(__dirname, 'styles', dirent.name), 'utf-8', (err, data) => {
//         if (err) return err;
//         arrayWithDataFromFiles.push(data);
//         //   console.log(data);
//         //     console.log(arrayWithDataFromFiles);

//       });
//     }
    
//     console.log(arrayWithDataFromFiles);
//     console.log(arrayWithNameFile);
       
//   });
// arrayWithNameFile.forEach( (name) => {
//    fs.readFile(path.join(__dirname, 'styles', name), 'utf-8',  (err, data)=> {
//     if (err) return err;
//     arrayWithDataFromFiles.push(data);
//   });

// });
    
    
  


// }
// readFolder();
    
//   readFolder.on('fs.readFile',()=>{
//     123;
//   });

//   stream.close();
// });


// await arrayWithNameFile.forEach((name) => {
//     fs.readFile(path.join(__dirname, 'styles', name), 'utf-8', (err, data) => {
//         if (err) return err;
//         arrayWithDataFromFiles.push(data);
//     });

// });



// console.log(arrayWithDataFromFiles);
// console.log(arrayWithNameFile);


// console.log(dirFiles);

// console.log(arrayWithNameFile);


// stream.on('data', (data)=>{
//   console.log(data.toString());

// });

// stream.on('data', (data) => {
//     console.log(data);
// });