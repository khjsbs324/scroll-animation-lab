// node export-examples.js : 각 예제를 독립된 파일로 내보냅니다.
const fs = require('node:fs');
const path = require('node:path');
const { demos, buildDocument } = require('./demos.js');
const { createFrame, count } = require('./sequence-frames.js');
for (const demo of demos) {
  const directory = path.join(__dirname, 'examples', `${demo.number}-${demo.id}`);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, 'index.html'), buildDocument(demo));
  fs.writeFileSync(path.join(directory, 'codepen.html'), demo.html + '\n');
  fs.writeFileSync(path.join(directory, 'style.css'), demo.css + '\n');
  fs.writeFileSync(path.join(directory, 'script.js'), demo.js + '\n');
}
const framesDirectory = path.join(__dirname, 'assets', 'sequence');
fs.mkdirSync(framesDirectory, { recursive: true });
for (let index = 0; index < count; index++) {
  fs.writeFileSync(path.join(framesDirectory, `frame-${String(index + 1).padStart(3, '0')}.svg`), createFrame(index, count));
}
const version = require('./version-assets.js')();
console.log(`Exported ${demos.length} independent examples. Build: ${version.build}`);
