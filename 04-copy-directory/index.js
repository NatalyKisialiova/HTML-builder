// const { error } = require('console');
// const { error } = require('console');
const fs = require('fs/promises');
const path = require('path');
const currentDirPath = path.join(__dirname, 'files');
const copyDirPath = path.join(__dirname, 'files-copy');

fs.readdir(path.join(__dirname), { withFileTypes: true }).then((files) => {
  const result = files.filter(
    (element) => element.isDirectory() && element.name === 'files-copy',
  );
  if (result.length === 0) {
    fs.mkdir(path.join(__dirname, 'files-copy'));
    copyFile();
  } else {
    console.log('Directory files-copy already exists');
    copyFile();
  }
});

function copyFile() {
  fs.readdir(currentDirPath, { withFileTypes: true })
    .then((files) => {
      files.map((file) => {
        const currentFilePath = path.join(currentDirPath, file.name);
        const copyFilePath = path.join(copyDirPath, file.name);
        console.log(`${file.name} is in the files`);
        fs.copyFile(currentFilePath, copyFilePath).then(() => {
          console.log(`${file.name} coppied to the files-copy`);
        });
      });
      deleteFile(files);
    })
    .catch((error) => {
      console.error('Error', error);
    });
}

function deleteFile(currentFiles) {
  fs.readdir(copyDirPath, { withFileTypes: true }).then((copyFiles) => {
    const currentFileNames = currentFiles.map((item) => item.name);
    const result = copyFiles.filter(
      (item) => !currentFileNames.includes(item.name),
    );
    // console.log(result);
    if (result.length !== 0) {
      result.forEach((file) => {
        const deleteFileName = path.join(copyDirPath, file.name);
        fs.unlink(deleteFileName)
          .then(() => {
            console.log(`${file.name} deleted from the files-copy`);
          })
          .catch((error) => {
            console.log('Error', error);
          });
      });
    }
  });
}
