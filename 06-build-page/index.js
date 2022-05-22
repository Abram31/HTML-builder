const { ifError } = require('assert');
const fs = require('fs');
const {readdir,copyFile} = require('fs/promises');
const { dirname } = require('path');
const path = require('path');

// from
const pathComponents = path.join(__dirname, 'components');
const pathAssets = path.join(__dirname, 'assets');
const pathStyles = path.join(__dirname,'styles');
const pathTemplate = path.join(__dirname, 'template.html');

// to
const pathProjectDist = path.join(__dirname, 'project-dist'); 
const pathBundleHTML = path.join(pathProjectDist, 'index.html');
const pathBundleStyles = path.join(pathProjectDist, 'style.css');
const pathBundleAssets =  path.join(pathProjectDist, 'assets');


fs.mkdir(pathProjectDist, {recursive:true}, (err)=>{
  if(err) console.log(err);
  console.log('Project dir is create!');

});

fs.open(path.join(pathProjectDist, 'index.html'), 'w', (err) => {
  if (err) throw err;
  console.log('File index is create');
});
fs.open(path.join(pathProjectDist, 'style.css'), 'w', (err) => {
  if (err) throw err;
  console.log('File style is create');
});




const readebleStreamTemplate = fs.createReadStream(pathTemplate, 'utf-8');

const writeStream = fs.createWriteStream(pathBundleHTML);

// writeStream.on('pipe', (chunk)=>{
//   console.log('I do IT!');
// })

readebleStreamTemplate.pipe(writeStream);


let dataTemplate = [];
readebleStreamTemplate.on('data',(chunk) => {
  dataTemplate.push(chunk); 
});

let arrWithNameComponents = [];
let objWithDataComponents = {};
readebleStreamTemplate.on('end', async ()=>{

  // const writeStreamIndex = fs.createWriteStream(pathBundleHTML);
  // writeStreamIndex.on('open' ()=>{

  // })
  

  fs.readdir(pathComponents, (err, files) => {
    if (err) console.log(err);
    let dataComponent;
    files.forEach(name => {
      if (path.extname(name) === '.html') {
        arrWithNameComponents.push(path.basename(name, path.extname(name)));

        dataComponent = fs.createReadStream(path.join(pathComponents, name)); 
        dataComponent.on('data', (chunk)=>{
          if (objWithDataComponents[name]) {
            objWithDataComponents[name] += chunk.toString();
          } else {
            objWithDataComponents[name] = chunk.toString();
          }

        });
      }
      
    });
    
    dataComponent.on('end', ()=>{
      // console.log(objWithDataComponents);
      includeCmponents();
    });
    
    // console.log(dataTemplate);
  });

 

});

function includeCmponents() {
  let objNameIndex = {};
  // console.log(dataTemplate);
  dataTemplate.join('').split('\r\n').forEach((element,index) => {
    arrWithNameComponents.forEach(nameFile => {
      if (element.search(nameFile) != -1) {
        objNameIndex[`${nameFile}`] = index;
      } 
    });
    
    
    
  });
  dataTemplate = dataTemplate.join('').split('\r\n');

  for (let key in objNameIndex) {
    // console.log(objNameIndex[key]);
    // console.log(key);
    if (objWithDataComponents[`${key}.html`]) {
      dataTemplate.splice(+objNameIndex[key], 1, objWithDataComponents[`${key}.html`]);

    }
  }
  dataTemplate = dataTemplate.join('');

  fs.writeFile(pathBundleHTML, dataTemplate, (err)=>{
    if(err) return console.log(err);
  });

  // console.log(dataTemplate);
}



// -------------------------styles--------------------------------------
let arrWithNameFiles = [];
let bundle = [];

// function readDir () {
readdir(pathStyles, { withFileTypes: true })
  .then((dirent) => {
    dirent.forEach(file => {
      if (path.extname(file.name) === '.css') {
        arrWithNameFiles.push(file.name);
      }
    });
  })
  .then(() => {
    // console.log(arrWithNameFiles);
    arrWithNameFiles.forEach(async (nameFile, index) => {
      const stream = fs.createReadStream(path.join(pathStyles, nameFile));

      let dataFile;
      await stream.on('data', async (data) => {
        dataFile = data;
        // console.log(data[1]);
        stream.on('close', async () => {
          await bundle.push(dataFile);
          // console.log(dataFile[1]);
          // if (await index === arrWithNameFiles.length - 1) {
          let stringBundle = await bundle.join('').toString();
          // console.log(222222);

          await fs.writeFile(pathBundleStyles, stringBundle, (err) => {
            if (err)
              console.log(err);
            else {
              console.log('File written successfully\n');
            }
          });
          // }
        });

      });

    });
  });


// -----------------------------copy assets------------------------------------

async function copyAssets () {
  let arrayWithNameFoldersFiles;
  fs.stat(pathAssets, (err)=>{
    if(err) throw err;
    fs.rm(pathBundleAssets, {recursive:true}, ()=>{
      console.log('dir is deleted');

      fs.mkdir(pathBundleAssets, {recursive:true}, (err)=>{
        if (err) return err;
        console.log('Dir is created!');
      });

      function recursive(pathFolder = pathAssets, pathCopyFolder = pathBundleAssets) {
        fs.stat(pathFolder, (err,stats)=>{
          if(err) throw console.log(err);
          // console.log(stats);
          readdir(pathFolder, { withFileTypes: true })
            .then((dirent) => {
              dirent.forEach((element) =>{
                if(element.isFile()) {
                  copyFile(path.join(pathFolder, element.name), path.join(pathCopyFolder, element.name));

                  console.log(err);
                } else {
                  fs.mkdir(path.join(pathCopyFolder, `${element.name}`), { recursive: true }, (err) => {
                    if (err) return err;
                    console.log(`Dir ${element.name} is created!`);
                  });
                  recursive(path.join(pathFolder, `${element.name}`),path.join(pathCopyFolder, `${element.name}`));
                }
              });

            });

         
          // console.log(stats.isFile());
        });
      }
      recursive();
    });
    


  });
}
copyAssets();
// async function copyDir() {
//   let arrayWithNameFoldersFiles;
//   await fs.stat(pathBundleAssets, (err) => {
//     if (!err) {
//       fs.rm(pathBundleAssets, { recursive: true }, async function (err) {
//         if (err) return err;
//         console.log('Dir is deleted!');

//         await fs.mkdir(pathBundleAssets, { recursive: true }, (err) => {
//           if (err) return err;
//           console.log('Dir is created!');
//         });
//         arrayWithNameFoldersFiles = await readdir(pathAssets, { withFileTypes: true });

//         recursive(path.join(pathAssets, arrayWithNameFoldersFiles[0].name), path.join(pathBundleAssets, arrayWithNameFoldersFiles[0].name), 0);
//       });

//     } else {
//       fs.mkdir(pathBundleAssets, { recursive: true }, async (err) => {
//         if (err) return err;
//         console.log('Dir is created!');
//         arrayWithNameFoldersFiles = await readdir(pathAssets, { withFileTypes: true });
//         recursive(path.join(pathAssets, arrayWithNameFoldersFiles[0].name), path.join(pathBundleAssets, arrayWithNameFoldersFiles[0].name), 0);
//       });



//     }
//   });


//   function recursive(pathAssets, pathFile, pathCopyFile, index) {
//     // fs.stat(pathFile,(err, file)=>{
//     //   if(err) throw err;
//     //   console.log(file);
//     //   // file.is
//     // })
    
    
//     // readdir(pathAssets, {recursive:true})
//     //   .then((data)=>{
//     //     console.log(arrayWithNameFoldersFiles);
//     //     console.log(data);
//     //     data.forEach(dirent => {
//     //       console.log(dirent);
//     //     });
//     //   });
    
//     copyFile(pathFile, pathCopyFile,);
//     if (index != arrayWithNameFoldersFiles.length - 1) {
//       return recursive(path.join(pathAssets, arrayWithNameFoldersFiles[index + 1].name), path.join(pathBundleAssets, arrayWithNameFoldersFiles[index + 1].name), index + 1);
//     }
//   }

// }

// copyDir();