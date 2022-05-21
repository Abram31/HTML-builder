
const { readdir, copyFile } = require('fs/promises');
const path = require('path');
const { mkdir, rm } = require('node:fs');
const { stat } = require('fs');




async function copyDir() {
  let arrayWithNameFoldersFiles;
  await stat(path.join(__dirname, 'files-copy'), (err) => {
    if(!err) {
      rm(path.join(__dirname, 'files-copy'), { recursive: true }, async function (err) {
        if (err) return err;
        console.log('Dir is deleted!');

        await mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
          if (err) return err;
          console.log('Dir is created!');
        });
        arrayWithNameFoldersFiles = await readdir(path.join(__dirname, 'files'), { withFileTypes: true });

        recursive(path.join(__dirname, 'files', arrayWithNameFoldersFiles[0].name), path.join(__dirname, 'files-copy', arrayWithNameFoldersFiles[0].name), 0);
      });
        
    } else {
      mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, async (err) => {
        if (err) return err;
        console.log('Dir is created!');
        arrayWithNameFoldersFiles = await readdir(path.join(__dirname, 'files'), { withFileTypes: true });
        recursive(path.join(__dirname, 'files', arrayWithNameFoldersFiles[0].name), path.join(__dirname, 'files-copy', arrayWithNameFoldersFiles[0].name), 0);
      });

      

    }
  });
  

  function recursive(pathFile, pathCopyFile, index) {
    copyFile(pathFile, pathCopyFile);
    if (index != arrayWithNameFoldersFiles.length - 1) {
      return recursive(path.join(__dirname, 'files', arrayWithNameFoldersFiles[index + 1].name), path.join(__dirname, 'files-copy', arrayWithNameFoldersFiles[index + 1].name), index + 1);
    }
  }

}

copyDir();