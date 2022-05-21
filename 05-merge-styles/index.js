
const fs = require('fs');
const{readdir,stat,writeFile} = require('fs/promises');
const path = require('path');


const stream = fs.createReadStream(path.join(__filename));
let arrWithNameFiles = [];
let bundle = [];

// function readDir () {
readdir(path.join(__dirname,'styles'), { withFileTypes: true })
  .then((dirent)=>{
    dirent.forEach(file=>{
      if (path.extname(file.name) === '.css') {
        arrWithNameFiles.push(file.name); 
      }
    });
  })
  .then(()=>{
    console.log(arrWithNameFiles);
    arrWithNameFiles.forEach(async(nameFile,index) =>{
     const stream = fs.createReadStream(path.join(__dirname, 'styles',nameFile ));

      let dataFile;
      await stream.on('data',async (data)=>{
        dataFile = data;
        // console.log(data[1]);
        stream.on('close', async () => {
          await bundle.push(dataFile);
          console.log(dataFile[1]);
          if (await index === arrWithNameFiles.length -1 ) {
            let stringBundle = await bundle.join('').toString();
            console.log(222222);

            await writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), stringBundle, (err) => {
              if (err)
                console.log(err);
              else {
                console.log('File written successfully\n');
              }});
          }
        });
     
      });
      
    });
  });
// return console.log(bundle) ;
// }
// readDir();




// const fs = require('fs');   //расширение д/работы с файловой системой
// const path = require('path'); //расширения д/работы с путями
// const wayToStyles = path.join(__dirname, 'styles');
// const wayTobandle = path.join(__dirname, 'project-dist', 'bundle.css');

// let myWriteStream = fs.createWriteStream(wayTobandle, 'utf-8');

// fs.readdir(wayToStyles, (err, array) => {
//   if (err) throw err;
//   array.forEach(el => {               //array with files
//     if (err) throw err;
//     let myReadStream = fs.createReadStream(path.join(wayToStyles, `${el}`), 'utf-8');
//     if (err) throw err;
//     let fileName = path.join(wayToStyles, `${el}`);
//     fs.stat(fileName, (err, stats) => {
//       if (err) throw err;
//       if (stats.isFile() == true && path.extname(el).slice(1) == 'css') {             //get files
//         fs.readFile(path.join(wayToStyles, `${el}`), 'utf8', function (error, fileContent) {
//           if (error) throw error; // ошибка чтения файла, если есть
//           myReadStream.pipe(myWriteStream);
//           if (err) throw err;
//         });
//       }
//     });
//   });
// });

















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