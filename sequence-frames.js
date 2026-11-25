/* 사진 없이 연습할 수 있는 48장의 제품 회전 프레임. 브라우저와 Node에서 공유합니다. */
(function (root) {
  function createFrame(index, count = 48) {
    const angle = index / (count - 1) * Math.PI * 2;
    const project = (x, y, z) => {
      const rx = x * Math.cos(angle) + z * Math.sin(angle);
      const rz = -x * Math.sin(angle) + z * Math.cos(angle);
      return [320 + rx + rz * 0.18, 235 + y - rz * 0.22];
    };
    const points = [[-72,-117,-72],[72,-117,-72],[72,117,-72],[-72,117,-72],[-72,-117,72],[72,-117,72],[72,117,72],[-72,117,72]];
    const faces = [
      { ids:[1,0,3,2], color:'#b5c69c', label:'SLOW' },
      { ids:[4,5,6,7], color:'#d7e1be', label:'MORI' },
      { ids:[0,4,7,3], color:'#8fa77d', label:'TEA' },
      { ids:[5,1,2,6], color:'#c2d1a5', label:'CALM' },
      { ids:[0,4,5,1], color:'#ecedcf' },
      { ids:[3,2,6,7], color:'#9aaf83' }
    ];
    const rotatedZ = p => -p[0] * Math.sin(angle) + p[2] * Math.cos(angle);
    faces.sort((a,b) => a.ids.reduce((n,i)=>n+rotatedZ(points[i]),0) - b.ids.reduce((n,i)=>n+rotatedZ(points[i]),0));
    const svgFaces = faces.map(face => {
      const coords = face.ids.map(i => project(...points[i]));
      let label = '';
      if (face.label) {
        const [a,b,,d] = coords;
        const area = Math.abs((b[0]-a[0])*(d[1]-a[1])-(b[1]-a[1])*(d[0]-a[0]));
        if (area > 2200) label = `<g transform="matrix(${(b[0]-a[0])/144},${(b[1]-a[1])/144},${(d[0]-a[0])/234},${(d[1]-a[1])/234},${a[0]},${a[1]})"><rect x="15" y="45" width="114" height="144" rx="2" fill="#f4f1df"/><text x="72" y="97" font-family="Georgia,serif" font-size="26" fill="#485c40" text-anchor="middle">${face.label}</text><path d="M52 127 Q72 95 92 127 Q72 149 52 127" fill="#83986b"/><text x="72" y="166" font-family="sans-serif" font-size="7" fill="#69755c" text-anchor="middle">A QUIET DAILY RITUAL</text></g>`;
      }
      return `<polygon points="${coords.map(p=>p.join(',')).join(' ')}" fill="${face.color}" stroke="#6c81594d" stroke-width="1"/>${label}`;
    }).join('');
    return `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480" viewBox="0 0 640 480"><rect width="640" height="480" fill="#e7e9dc"/><ellipse cx="320" cy="385" rx="125" ry="18" fill="#697653" opacity=".13"/>${svgFaces}<text x="320" y="445" font-size="10" font-family="sans-serif" letter-spacing="3" text-anchor="middle" fill="#81906e">MORI / THE EVERYDAY COLLECTION</text></svg>`;
  }
  const api = { createFrame, count: 48 };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ScrollLabFrames = api;
})(typeof window !== 'undefined' ? window : globalThis);
