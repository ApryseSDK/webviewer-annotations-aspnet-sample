const download = require('download');
const decompress = require('decompress');
const fs = require('fs-extra');

let downloadedSize = 0;
const clientPath = 'server/webviewer-annotations-asp-net-sample/Scripts/webviewer/';

process.stdout.write('\n');

download(`https://www.pdftron.com/downloads/WebViewer.zip`, '.')
  .on('data', data => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    downloadedSize += data.length;
    process.stdout.write(`Downloading WebViewer... ${(downloadedSize / 100000000 * 100).toFixed(1)}%`);
  })
  .then(() => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Downloading WebViewer... 100%\nDownload completed.\n\nExtracting WebViewer... `);
    fs.removeSync(`${clientPath}/lib`)
    decompress('WebViewer.zip', clientPath).then(() => {
      // Trim down office, pdf and ui-legacy
      // It's highly recommended to use XOD for cordova apps for highest performance
      fs.moveSync(`${clientPath}/WebViewer/lib`, `${clientPath}/lib`);
      fs.removeSync(`${clientPath}/WebViewer`);
      fs.removeSync(`${clientPath}/lib/core/pdf/full`);
      fs.removeSync(`${clientPath}/lib/ui-legacy`);
      fs.removeSync(`${clientPath}/lib/package.json`);
      fs.removeSync(`${clientPath}/lib/webviewer.js`);
      fs.moveSync(`${clientPath}/lib/ui/build`, `${clientPath}/lib/temp`);
      fs.removeSync(`${clientPath}/lib/ui`);
      fs.moveSync(`${clientPath}/lib/temp`, `${clientPath}/lib/ui/build`);
      fs.removeSync('WebViewer.zip');
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(`Extracting WebViewer... 100%\nExtract completed.\n\n\n`);
    }).catch((err) => {
      console.log(err);
    });
  });