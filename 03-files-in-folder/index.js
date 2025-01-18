// const { stat } = require('fs');
const fs = require('fs/promises');

const path = require('path');
fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }).then(
  (files) => {
    files.forEach((element) => {
      if (element.isFile()) {
        fs.stat(path.join(__dirname, 'secret-folder', element.name)).then(
          (stat) => {
            const extension = path.extname(element.name);
            const name = path.basename(element.name);
            const size = stat.size;
            console.log(
              `${name.replace(extension, '')} - ${extension.replace(
                '.',
                '',
              )} - ${size}b`,
            );
          },
        );
      }
    });
  },
);
