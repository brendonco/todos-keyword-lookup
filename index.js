const { resolve } = require('path');
const { readdir } = require('fs').promises;
const fs = require('fs');

function getExt(file) {
  const totalFileLength = file.length;
  const ext = file.substring(totalFileLength - 3, totalFileLength);

  return ext;
}

function findTodosKeyword(file) {
  const keywordsFound = [];

  return new Promise((res, reject) => {
    const ext = getExt(file);

    if (ext.indexOf('.js') === -1) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return reject('');
    }

    const stream = fs.createReadStream(file, { encoding: 'utf8' });
    stream.on('data', (data) => {
      const keyword = 'TODO';
      const regex = new RegExp(
        // exclude TODO in string value with matching quotes:
        `^(?!.*(['"]).*\\b${keyword}\\b.*\\1)`
                  // exclude TODO.property access:
                  + `(?!.*\\b${keyword}\\.\\w)`
                  // exclude TODO = assignment
                  + `(?!.*\\b${keyword}\\s*=)`
                  // final TODO match
                  + `.*\\b${keyword}\\b`,
      );
      data.split('\n').forEach((line) => {
        const isTODOKeyword = regex.test(line);

        if (isTODOKeyword) {
          keywordsFound.push(file);
        }
      });

      stream.destroy();
    });
    stream.on('close', () => {
      const obj = keywordsFound.find((key) => key === file);

      if (keywordsFound.length > 0 && obj) {
        console.log(obj);
        res(obj);
      } else {
        res('not found');
      }
    });
  });
}

async function getTodosKeyword(dir) {
  if (dir.includes('node_modules')) return [];

  const dirs = await readdir(dir, { withFileTypes: true });
  return Promise.all(dirs.map((d) => {
    const res = resolve(dir, d.name);

    return d.isDirectory() ? getTodosKeyword(res) : findTodosKeyword(res);
  }));
}

getTodosKeyword(__dirname)
  .catch((e) => console.error(e));
