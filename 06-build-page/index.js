const fs = require('fs/promises');
const path = require('path');

fs.mkdir(path.join(__dirname, 'proect-dist'), { recursive: true });
// const indexPath = path.join(__dirname, 'proect-dist', 'index.html');
// const output = require('fs').createWriteStream(indexPath);
const stylePath = path.join(__dirname, 'proect-dist', 'style.css');
const assetsCopyPath = path.join(__dirname, 'proect-dist');
fs.mkdir(path.join(assetsCopyPath, 'assets'));

fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true })
  .then((files) => {
    const output = require('fs').createWriteStream(stylePath);
    files.forEach((element) => {
      const extension = path.extname(element.name);
      if (element.isFile() && extension === '.css') {
        const filePath = path.join(__dirname, 'styles', element.name);
        const readStream = require('fs').createReadStream(filePath, 'utf8');
        readStream.on('data', (chunk) => {
          output.write(chunk);
        });
      }
    });
  })
  .catch((error) => {
    console.error('Error', error);
  });
// const templatePath = path.join(__dirname, 'template.html');
// fs.copyFile(templatePath, indexPath);
// const readStreamTemplate = require('fs').createReadStream(templatePath, 'utf8');

// readStreamTemplate.on('data', (chunk) => {
//   let templateContent = chunk;

//   fs.readdir(path.join(__dirname, 'components'), { withFileTypes: true }).then(
//     (files) => {
//       files.forEach((file) => {
//         if (file.isFile() && path.extname(file.name) === '.html') {
//           const fileComponentName = path.basename(file.name);
//           const fileComponentPath = path.extname(
//             path.join(__dirname, 'components', file.name),
//           );
//           const fileComponentPath2 = path.join(
//             __dirname,
//             'components',
//             file.name,
//           );
//           console.log(fileComponentName, fileComponentPath, fileComponentPath2);
//           const fileComponentContent = require('fs').createReadStream(
//             fileComponentPath2,
//             'utf8',
//           );
//           fileComponentContent.on('data', (data) => {
//             let result = data;
//             // console.log(templateContent);
//             templateContent = templateContent.replace(
//               `{{${file.name.replace(fileComponentPath, '')}}}`,
//               result,
//             );
//             console.log(file.name.replace(fileComponentPath, ''));
//             console.log(result);
//             output.write(templateContent);
//           });
//         }
//       });
//     },
//   );
// });
