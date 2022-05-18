const { stat, createReadStream, mkdir, rmdir } = require('fs');
const { readdir, copyFile } = require('fs/promises');
const path = require('path');



async function copyDir () {
  const stream = await createReadStream(__filename);
  let arrayWithNameFoldersFiles;

  stream.on('open', async () => {

    // async function newFolder() {
    await rmdir(path.join(__dirname, 'files-copy'), { recursive: true },  (err)=>  {
      if (err) return err;
      console.log('Dir is deleted!');

    });
    await mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
      if (err) return err;
      console.log('Dir is created!');
    });

    // readFolder();

    // }
    // newFolder();


    // async function readFolder() {
    arrayWithNameFoldersFiles = await readdir(path.join(__dirname, 'files'), { withFileTypes: true });
    console.log(arrayWithNameFoldersFiles);

    recursive(path.join(__dirname, 'files', arrayWithNameFoldersFiles[0].name), path.join(__dirname, 'files-copy', arrayWithNameFoldersFiles[0].name), 0);

    // }

    async function recursive(pathFile, pathCopyFile, index) {
      await copyFile(pathFile, pathCopyFile);
      if (index != arrayWithNameFoldersFiles.length - 1) {
        return recursive(path.join(__dirname, 'files', arrayWithNameFoldersFiles[index + 1].name), path.join(__dirname, 'files-copy', arrayWithNameFoldersFiles[index + 1].name), index + 1);
      }
    }

  });
}

copyDir();