// node export-examples.js : 각 예제를 독립된 파일로 내보냅니다.
const fs = require('node:fs');
const path = require('node:path');
const { demos, buildDocument } = require('./demos.js');
for (const demo of demos) {
  const directory = path.join(__dirname, 'examples', `${demo.number}-${demo.id}`);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, 'index.html'), buildDocument(demo));
  fs.writeFileSync(path.join(directory, 'codepen.html'), demo.html + '\n');
  fs.writeFileSync(path.join(directory, 'style.css'), demo.css + '\n');
  fs.writeFileSync(path.join(directory, 'script.js'), demo.js + '\n');
}
console.log(`Exported ${demos.length} independent examples.`);
