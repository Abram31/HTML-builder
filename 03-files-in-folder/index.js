const { stat, createReadStream} = require('fs');
const { readdir } = require('fs/promises');
const path = require('path');
const pathDir = path.join(__dirname, 'secret-folder');

const stream = createReadStream(__filename);

// const stream1 = createReadStream(path.join(__dirname, 'secret-folder', 'script.js'));


let arrayWithNameFoldersFiles;
stream.on('data', ()=>{
  async function readFolder () {
    arrayWithNameFoldersFiles = await readdir(pathDir,{withFileTypes:true});
    arrayWithNameFoldersFiles.forEach(dirent => {
   
      stat(path.join(__dirname, 'secret-folder', `${dirent.name}`), (err, stats) => {
        if (err) return err;
        if (stats.isFile()) {
          let extnameFile = path.extname(dirent.name).split('').splice(1, path.extname(dirent.name).length -1).join('');
          let nameFile = path.basename(dirent.name, path.extname(dirent.name));
          let sizeFile = (stats.size/1024).toFixed(3) + 'kb';
          console.log(`${nameFile} - ${extnameFile} - ${sizeFile}`);
        } 
      });
    
    });
  
  }
  readFolder();
}); 

// stream1.on('data', (data)=>{
//   console.log(data.toString());
// });

// stat(path.join(__dirname, 'secret-folder', 'data.csv'), (err, stats) => {
//   if (err) return err;
//   console.log(stats);
// });

// mkdir(pathForCopy, err => {
//   if (err) throw err; // не удалось создать папку
//   console.log('Папка успешно создана');
// });

// async function copyFile(nameCopiedFile, pathCopyFile ) {
//   await copyFile(nameCopiedFile, pathCopyFile);
// }

   
// async function copyFileFun(nameCopiedFile, pathCopyFile) {
//   await copyFile(nameCopiedFile, pathCopyFile);
// }

// copyFileFun(path.join(__dirname,'README.md'), path.join(__dirname,'README-copy.md'));





// (async function () {
//   const files = await readdir(pathDir);
//   for (const file of files)
//     console.log(file);
 
// });


