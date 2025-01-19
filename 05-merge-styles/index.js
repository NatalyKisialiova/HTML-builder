const fs = require('fs/promises');
const path = require('path');

fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true })
  .then((files) => {
    const fileBundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
    const output = require('fs').createWriteStream(fileBundlePath);
    files.forEach((element) => {
      const extension = path.extname(element.name);
      if (element.isFile() && extension === '.css') {
        // console.log(element.name);
        const filePath = path.join(__dirname, 'styles', element.name);
        // console.log(filePath);
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
