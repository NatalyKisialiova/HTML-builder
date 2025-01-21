const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');

fsPromise.mkdir(path.join(__dirname, 'proect-dist'), { recursive: true });
const indexPath = path.join(__dirname, 'proect-dist', 'index.html');
// const output = require('fs').createWriteStream(indexPath);
const stylePath = path.join(__dirname, 'proect-dist', 'style.css');
const assetsCopyPath = path.join(__dirname, 'proect-dist');
const currentDirPath = path.join(__dirname, 'assets');
const copyDirPath = path.join(assetsCopyPath, 'assets');
fsPromise.mkdir(path.join(assetsCopyPath, 'assets'));

fsPromise
  .readdir(path.join(__dirname, 'styles'), { withFileTypes: true })
  .then((files) => {
    const output = fs.createWriteStream(stylePath);
    files.forEach((element) => {
      const extension = path.extname(element.name);
      if (element.isFile() && extension === '.css') {
        const filePath = path.join(__dirname, 'styles', element.name);
        const readStream = fs.createReadStream(filePath, 'utf8');
        readStream.on('data', (chunk) => {
          output.write(chunk);
        });
      }
    });
  })
  .catch((error) => {
    console.error('Error', error);
  });
const templatePath = path.join(__dirname, 'template.html');
const readStreamTemplate = fs.createReadStream(templatePath, 'utf8');

readStreamTemplate.on('data', (chunk) => {
  let templateContent = chunk;

  fsPromise
    .readdir(path.join(__dirname, 'components'), { withFileTypes: true })
    .then((files) => {
      files.forEach((file) => {
        if (file.isFile() && path.extname(file.name) === '.html') {
          const fileComponentName = path.basename(file.name);
          const fileExtension = path.extname(
            path.join(__dirname, 'components', file.name),
          );
          const fileComponentPath = path.join(
            __dirname,
            'components',
            file.name,
          );
          console.log(fileComponentName);
          const fileComponentContent = fs.createReadStream(
            fileComponentPath,
            'utf8',
          );
          fileComponentContent.on('data', (data) => {
            let result = data;
            // console.log(templateContent);
            templateContent = templateContent.replace(
              `{{${file.name.replace(fileExtension, '')}}}`,
              result,
            );
            // console.log(result);
            // output.write(templateContent);
          });
          fileComponentContent.on('data', () => {
            fs.writeFile(indexPath, templateContent, 'utf8', (error) => {
              if (error) throw error;
            });
          });
        }
      });
    });
});
function copyDirectory(currentDirPath, copyDirPath) {
  fsPromise
    .mkdir(copyDirPath, { recursive: true })
    .then(() => fsPromise.readdir(currentDirPath, { withFileTypes: true }))
    .then((files) => {
      files.forEach((file) => {
        const currentFilePath = path.join(currentDirPath, file.name);
        const copyFilePath = path.join(copyDirPath, file.name);
        if (file.isDirectory()) {
          copyDirectory(currentFilePath, copyFilePath);
        } else {
          fsPromise.copyFile(currentFilePath, copyFilePath);
        }
      });
    })
    .catch((error) => {
      console.error('Error', error);
    });
}
copyDirectory(currentDirPath, copyDirPath);
