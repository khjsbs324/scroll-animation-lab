// 각 CSS/JS 내용의 해시를 URL에 붙여 이전 브라우저 캐시와 구분합니다.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

function versionAssets() {
  const filename = path.join(__dirname, 'index.html');
  const assets = [];
  let html = fs.readFileSync(filename, 'utf8');
  html = html.replace(/\b(src|href)="([^"?]+\.(?:css|js))(?:\?[^"\s]*)?"/g, (match, attribute, asset) => {
    if (/^(?:https?:)?\/\//.test(asset)) return match;
    const hash = crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname, asset))).digest('hex').slice(0, 12);
    assets.push(`${asset}:${hash}`);
    return `${attribute}="${asset}?v=${hash}"`;
  });
  const build = crypto.createHash('sha256').update(assets.join('\n')).digest('hex').slice(0, 12);
  const meta = `<meta name="scroll-lab-build" content="${build}">`;
  if (/<meta name="scroll-lab-build"[^>]*>/.test(html)) html = html.replace(/<meta name="scroll-lab-build"[^>]*>/, meta);
  else html = html.replace('</title>', `</title>\n  ${meta}`);
  fs.writeFileSync(filename, html);
  return { build, assets: assets.length };
}

module.exports = versionAssets;
if (require.main === module) console.log(JSON.stringify(versionAssets()));
