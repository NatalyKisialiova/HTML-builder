const fs = require('fs');
const { stdin, stdout } = process;
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(filePath);

stdout.write('Hello! Enter the text.\n');

stdin.on('data', (data) => {
  if (data.toString().trim().toLowerCase() === 'exit') {
    cleanAndExit();
    // console.log('Good luck learning Node.js!');
  } else {
    output.write(data);
  }
});
function cleanAndExit() {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log('error', err);
    }
    stdout.write('Good luck learning Node.js!');
    process.exit();
  });
}
process.on('SIGINT', cleanAndExit);
