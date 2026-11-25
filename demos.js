/* 각 예제는 독립적인 HTML · CSS · JS입니다. CodePen에도 같은 코드가 전달됩니다. */
(function (root) {
  const libraries = [
    'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js'
  ];
  const baseCSS = `/* 공통 레이아웃: 위아래 여백은 스크롤할 공간을 만듭니다. */
* { box-sizing: border-box; }
body { margin: 0; background: #f6f5ef; color: #363d31;
  font-family: Arial, "Noto Sans KR", sans-serif; }
html { overflow-x: hidden; }
.demo-nav { position: absolute; top: 0; left: 0; width: 100%; padding: 22px 6%;
  display: flex; justify-content: space-between; font-size: 10px; z-index: 2; }
.demo-nav b { font-size: 15px; letter-spacing: -0.8px; }
.intro, .outro { min-height: 82vh; padding: 90px 8% 50px; display: flex;
  flex-direction: column; align-items: center; justify-content: center; text-align: center; }
.eyebrow { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; }
.intro h1 { font-size: clamp(32px, 6vw, 60px); line-height: 1.2;
  font-weight: 400; letter-spacing: -2px; margin: 20px 0; }
.intro p, .outro p { font-size: 12px; color: #89917f; line-height: 1.9; }
.scroll-hint { margin-top: 35px; font-size: 11px; }
.scroll-hint span { display: block; font-size: 24px; margin-top: 10px; }
.scene { min-height: 88vh; padding: 70px 8%; display: flex;
  flex-direction: column; align-items: center; justify-content: center; position: relative; }
.scene-label { position: absolute; top: 24px; left: 6%; font-size: 9px;
  letter-spacing: 1.5px; opacity: .55; }
.outro { min-height: 110vh; } /* 마지막 효과도 끝까지 진행할 스크롤 여백 */
.outro h2 { font-size: 34px; font-weight: 400; letter-spacing: -1px; }
.poster { width: min(100%, 360px); min-height: 330px; padding: 32px;
  display: flex; flex-direction: column; justify-content: space-between;
  background: #d8e0ce; border-radius: 3px; }
.poster small { font-size: 9px; letter-spacing: 1.5px; }
.poster h2 { font-size: clamp(38px, 7vw, 62px); font-weight: 400;
  line-height: 1; letter-spacing: -2px; margin: 30px 0; }
.poster-foot { display: flex; justify-content: space-between; font-size: 9px; }
.orb { width: 100px; height: 100px; background: #9aa988; border-radius: 50%; }
@media (max-width: 480px) {
  .scene { padding: 65px 7%; }
  .intro h1 { font-size: 38px; }
  .poster { min-height: 300px; padding: 25px; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}`;

  const poster = (title = 'Less,<br>but better.', subtitle = 'STUDIO / EVERYDAY OBJECTS') => `<article class="poster">
  <small>${subtitle}</small>
  <h2>${title}</h2>
  <div class="poster-foot"><span>OBJECT NO. 001</span><span>↗</span></div>
</article>`;

  const wrapHTML = (id, title, content, sceneClass = '') => `<header class="demo-nav"><b>scrolllab.</b><span>${id} / LIVE EXPERIMENT</span></header>
<section class="intro">
  <span class="eyebrow">SCROLL EXPERIMENT ${id}</span>
  <h1>${title}</h1>
  <p>아래로 스크롤하며 움직임을 확인하세요.<br>위로 돌아오면 효과를 다시 볼 수 있어요.</p>
  <div class="scroll-hint">SCROLL TO DISCOVER<span>↓</span></div>
</section>
<section class="scene ${sceneClass}">
  <span class="scene-label">${id} — THE MOTION IN ACTION</span>
${content}
</section>
<section class="outro"><span class="eyebrow">NOW IT'S YOUR TURN</span><h2>Make it your own.</h2>
  <p>색상, 문구, 옵션 값을 바꿔보세요.<br>위로 스크롤하면 처음으로 돌아갑니다.</p><span>↑</span></section>`;

  const wrapJS = (code) => `gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
${code.split('\n').map(line => line ? '  ' + line : '').join('\n')}
});`;

  const createAdvanced = typeof module !== 'undefined' && module.exports ? require('./advanced.js') : root.ScrollLabAdvanced;
  const demos = [
    {
      id: 'fade-up', en: 'Fade Up', title: '페이드 업', category: 'entrance', level: 'beginner',
      bg: '#e6e8da', ink: '#64734d',
      short: '투명했던 요소가 아래에서 부드럽게 나타나요.',
      headline: '가장 익숙하고 자연스러운 첫인상.',
      description: '스크롤해서 요소가 화면에 들어오면, 위로 조금 이동하며 선명해집니다. 처음 배우기 좋고 다양한 레이아웃에 적용하기 쉬운 효과예요.',
      use: '브랜드 소개, 섹션 제목, 이미지와 설명',
      option: 'y: 60, opacity: 0', experiment: '✳ y를 120으로 바꾸면 어떤 느낌일까요?',
      thumbnail: '<div class="mini mini-fade"><div class="mini-title">Hello,<br>scroll.<small>A SOFTER WAY TO APPEAR</small></div><span class="mini-arrow">↑</span></div>',
      html: wrapHTML('01', 'A softer<br>first impression.', poster()),
      css: '.scene { background: #e7eadf; }',
      js: `gsap.from(".poster", {
  y: 60,           // 시작 위치: 아래로 60px
  opacity: 0,      // 시작 투명도
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".scene", // 움직이지 않는 부모를 기준으로 측정
    start: "top 70%",
    toggleActions: "play none none reverse"
  }
});`
    },
    {
      id: 'stagger', en: 'Stagger Reveal', title: '순차 등장', category: 'entrance', level: 'beginner',
      bg: '#ece5da', ink: '#8b7861', short: '여러 요소가 일정한 간격을 두고 차례로 등장해요.',
      headline: '여러 개의 카드에 하나의 리듬을.',
      description: '카드마다 약간의 시간 차이를 주어 시선을 순서대로 이끕니다. 한 번에 모두 나타나는 것보다 콘텐츠의 흐름을 쉽게 따라갈 수 있어요.',
      use: '상품 목록, 서비스 카드, 팀원 소개', option: 'stagger: 0.18', experiment: '✳ stagger를 0.4로 바꾸고 카드 사이의 간격을 느껴보세요.',
      thumbnail: '<div class="mini mini-stagger"><span>01</span><span>02</span><span>03</span></div>',
      html: wrapHTML('02', 'One by one.<br>In perfect rhythm.', `<div class="cards">
  <article class="item"><span>01 / DISCOVER</span><div class="vase"></div><h2>Find your calm.</h2></article>
  <article class="item"><span>02 / COLLECT</span><div class="vase"></div><h2>Keep it simple.</h2></article>
  <article class="item"><span>03 / ENJOY</span><div class="vase"></div><h2>Make it yours.</h2></article>
</div>`),
      css: `.scene { background: #eee6da; }
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; width: 100%; }
.item { padding: 22px 16px; background: #ded1bb; border-radius: 5px; }
.item:nth-child(2) { background: #c2bea8; }
.item:nth-child(3) { background: #9fa58e; }
.item span { font-size: 8px; letter-spacing: 1px; }
.item h2 { font-size: 18px; font-weight: 400; letter-spacing: -.5px; }
.vase { width: 55%; aspect-ratio: 1/1.5; margin: 40px auto; background: #ffffff66;
  border-radius: 45% 45% 8% 8%; }
@media(max-width:480px) {
  .cards { gap: 8px; }
  .item { padding: 18px 10px; }
  .item h2 { font-size: 13px; }
  .item span { font-size: 6px; }
}`,
      js: `gsap.from(".item", {
  y: 70,
  opacity: 0,
  duration: 0.8,
  stagger: 0.18,   // 각 카드가 0.18초 간격으로 시작
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".cards",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});`
    },
    {
      id: 'slide-in', en: 'Slide In', title: '좌우 슬라이드', category: 'entrance', level: 'beginner',
      bg: '#e0e7df', ink: '#586b54', short: '양쪽 콘텐츠가 안으로 들어오며 한 장면을 완성해요.',
      headline: '이미지와 이야기가 만나는 순간.',
      description: '왼쪽과 오른쪽 요소를 서로 다른 방향에서 등장시킵니다. 이미지와 설명으로 구성된 두 열 레이아웃에 잘 어울려요.',
      use: '브랜드 스토리, 이미지 + 텍스트 소개', option: 'x: -80 / x: 80', experiment: '✳ 두 요소의 시작 방향을 반대로 바꿔보세요.',
      thumbnail: '<div class="mini mini-slide"><div class="slide-lines"><i></i><i></i><i></i></div><div class="slide-box">Coming<br>together.</div><span class="slide-direction">←</span></div>',
      html: wrapHTML('03', 'Coming<br>together.', `<div class="split-layout">
  <div class="visual"><div class="arch"></div><span>FORM / FUNCTION</span></div>
  <div class="story"><span class="eyebrow">THE EVERYDAY COLLECTION</span><h2>Objects with<br>a quiet story.</h2><p>익숙한 공간에 새로운 이야기를.<br>작은 디테일이 일상의 분위기를 바꿉니다.</p></div>
</div>`),
      css: `.scene { background: #e5ebe0; overflow: hidden; }
.split-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; align-items: center; width: 100%; }
.visual { background: #c5d1ba; min-height: 300px; display: grid; place-items: center; padding: 30px; }
.arch { width: 100px; height: 180px; border-radius: 60px 60px 0 0; background: #8b9d7c; }
.visual span { font-size: 8px; letter-spacing: 2px; margin-top: 20px; }
.story h2 { font-size: clamp(24px, 4vw, 42px); font-weight: 400; letter-spacing: -1px; }
.story p { font-size: 11px; line-height: 1.9; color: #7e8c72; }
@media(max-width:480px) {
  .split-layout { grid-template-columns: 1fr; gap: 25px; }
  .visual { min-height: 210px; }
  .arch { height: 120px; width: 80px; }
  .story { text-align: center; }
}`,
      js: `const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".split-layout",
    start: "top 75%",
    toggleActions: "play none none reverse"
  }
});

tl.from(".visual", {
  x: -80, opacity: 0, duration: 1, ease: "power2.out"
})
.from(".story", {
  x: 80, opacity: 0, duration: 1, ease: "power2.out"
}, "<0.15"); // 앞 애니메이션 시작 0.15초 뒤에 재생`
    },
    {
      id: 'text-reveal', en: 'Text Reveal', title: '텍스트 리빌', category: 'entrance', level: 'intermediate',
      bg: '#e2e8f0', ink: '#5e779b', short: '가려진 문장이 한 줄씩 위로 드러나요.',
      headline: '짧은 문장을, 기억에 남는 메시지로.',
      description: 'overflow: hidden으로 만든 창 안에서 텍스트를 위로 이동시킵니다. 이 예제는 줄 단위로 직접 나누어 추가 텍스트 플러그인 없이 구현했어요.',
      use: '메인 슬로건, 브랜드 메시지, 큰 제목', option: 'yPercent: 110, stagger: 0.15', experiment: '✳ HTML에 line을 추가하면 더 긴 문장도 만들 수 있어요.',
      thumbnail: '<div class="mini mini-text"><div class="mini-title">Make it</div><div class="mini-title">meaningful.</div><span class="baseline"></span></div>',
      html: wrapHTML('04', 'Words<br>in motion.', `<div class="headline" aria-label="Make it simple. Make it meaningful.">
  <div class="line" aria-hidden="true"><span>Make it simple.</span></div>
  <div class="line" aria-hidden="true"><span>Make it</span></div>
  <div class="line accent" aria-hidden="true"><span>meaningful.</span></div>
</div>`),
      css: `.scene { background: #e2e8f0; }
.headline { width: 100%; }
.line { overflow: hidden; font-size: clamp(32px, 7vw, 70px); line-height: 1.18;
  letter-spacing: -2px; font-weight: 400; padding-bottom: .1em; }
.line span { display: block; }
.accent { color: #8ba3c4; }`,
      js: `gsap.from(".line span", {
  yPercent: 110,  // 각 줄의 높이보다 아래에서 시작
  duration: 1.1,
  stagger: 0.15,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".headline",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});`
    },
    {
      id: 'image-reveal', en: 'Mask Reveal', title: '이미지 마스크 리빌', category: 'scroll', level: 'intermediate',
      bg: '#f0e2d4', ink: '#9f785d', short: '마스크가 열리며 안쪽의 이미지가 펼쳐져요.',
      headline: '이미지를 보여주는 방식도 디자인.',
      description: 'clip-path로 가린 영역을 스크롤에 맞춰 열어줍니다. 예제의 CSS 풍경은 사진을 넣는 영역으로 바꾸어 사용할 수 있어요.',
      use: '포트폴리오 대표 이미지, 프로젝트 표지', option: 'clipPath: "inset(0% 0% 0% 0%)"', experiment: '✳ 시작 inset의 네 값을 바꿔 열리는 방향을 바꿔보세요.',
      thumbnail: '<div class="mini mini-reveal"><div class="reveal-window"><div class="sun"></div><div class="hill"></div><div class="hill second"></div></div><span class="window-edge"></span></div>',
      html: wrapHTML('05', 'Reveal a<br>new perspective.', `<div class="image-wrap"><div class="landscape" role="img" aria-label="해가 떠 있는 산 풍경 일러스트"><div class="sun"></div><div class="hill back"></div><div class="hill front"></div><span>A QUIET PLACE / 2026</span></div></div>`),
      css: `.scene { background: #efe2d6; }
.image-wrap { width: 100%; aspect-ratio: 4/3; overflow: hidden; }
.landscape { width: 100%; height: 100%; position: relative; overflow: hidden; background: #dfbca2; }
.sun { position: absolute; width: 18%; aspect-ratio: 1; border-radius: 50%; right: 20%; top: 14%; background: #f7dfad; }
.hill { position: absolute; width: 90%; height: 90%; border-radius: 55% 55% 0 0; bottom: -50%; }
.hill.back { left: -10%; background: #8e9d7f; transform: rotate(-15deg); }
.hill.front { right: -25%; background: #586b53; transform: rotate(25deg); }
.landscape span { position: absolute; bottom: 20px; left: 20px; color: #f7f1df; font-size: 8px; letter-spacing: 2px; }`,
      js: `gsap.fromTo(".image-wrap", {
  clipPath: "inset(12% 48% 12% 48%)"
}, {
  clipPath: "inset(0% 0% 0% 0%)",
  ease: "none",
  scrollTrigger: {
    trigger: ".scene",
    start: "top 70%",
    end: "center 45%",
    scrub: 1  // 스크롤 진행률을 부드럽게 따라갑니다.
  }
});`
    },
    {
      id: 'parallax', en: 'Parallax', title: '패럴랙스', category: 'scroll', level: 'intermediate',
      bg: '#dfe7dc', ink: '#687e60', short: '레이어마다 다른 속도로 움직이며 깊이를 만들어요.',
      headline: '평면의 화면에 공간감을 더해요.',
      description: '배경, 중간, 전경 레이어에 서로 다른 이동 거리를 줍니다. 같은 스크롤 구간에서도 상대적으로 움직이는 속도가 달라 깊이가 느껴져요.',
      use: '브랜드 히어로, 공간 소개, 감성적인 배경', option: 'y: -40 / -100 / -170', experiment: '✳ 세 레이어의 y를 같은 값으로 바꾸고 차이를 비교해 보세요.',
      thumbnail: '<div class="mini mini-parallax"><div class="mountain"></div><div class="mountain"></div><div class="mountain"></div><div class="sun"></div><span class="layer-label">LAYER 01 / 02 / 03</span></div>',
      html: wrapHTML('06', 'A little<br>more depth.', `<div class="landscape-parallax" role="img" aria-label="여러 겹의 산과 해가 있는 풍경">
  <div class="parallax-sun"></div>
  <div class="mountain back"></div><div class="mountain middle"></div><div class="mountain front"></div>
  <h2>Find your<br>perspective.</h2>
</div>`),
      css: `.scene { padding: 0; background: #dfe7dc; overflow: hidden; }
.landscape-parallax { width: 100%; height: 95vh; min-height: 480px; position: relative; overflow: hidden; }
.parallax-sun { position: absolute; width: 100px; height: 100px; border-radius: 50%; right: 18%; top: 20%; background: #e6d59f; }
.mountain { position: absolute; width: 130%; height: 70%; border-radius: 50% 50% 0 0; bottom: -40%; }
.back { background: #b0c1a4; left: -30%; bottom: -16%; }
.middle { background: #8ba07d; left: 10%; bottom: -28%; }
.front { background: #5f7956; left: -30%; }
.landscape-parallax h2 { position: absolute; top: 10%; left: 8%; font-size: clamp(35px,6vw,60px);
  letter-spacing: -2px; font-weight: 400; line-height: 1.1; }`,
      js: `const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene",
    start: "top bottom",
    end: "bottom top",
    scrub: 1
  }
});

// 같은 시간에 시작하되, 레이어마다 이동 거리를 다르게 설정
tl.to(".parallax-sun", { y: -30, ease: "none" }, 0)
  .to(".back", { y: -40, ease: "none" }, 0)
  .to(".middle", { y: -100, ease: "none" }, 0)
  .to(".front", { y: -170, ease: "none" }, 0);`
    },
    {
      id: 'zoom', en: 'Scroll Zoom', title: '스크롤 줌', category: 'scroll', level: 'beginner',
      bg: '#e8e0ef', ink: '#8d70a6', short: '스크롤할수록 콘텐츠가 점점 커지며 시선을 잡아요.',
      headline: '중요한 콘텐츠에 천천히 가까이.',
      description: '스크롤 구간에 따라 scale 값을 바꾸어 크기를 조절합니다. 주변 레이아웃은 그대로 두고 이미지나 상품의 존재감을 강조할 수 있어요.',
      use: '대표 상품, 공간 이미지, 캠페인 비주얼', option: 'scale: 0.65 → 1', experiment: '✳ 시작 scale을 0.3으로 바꾸면 강조가 얼마나 커질까요?',
      thumbnail: '<div class="mini mini-zoom"><div class="zoom-box">Closer.</div></div>',
      html: wrapHTML('07', 'Come a<br>little closer.', poster('A closer<br>look.', 'DETAILS THAT MATTER')),
      css: '.scene { background: #e8e0ef; overflow: hidden; }\n.poster { background: #c6b3db; color: #5f4777; }',
      js: `gsap.fromTo(".poster", {
  scale: 0.65,
  opacity: 0.4
}, {
  scale: 1,
  opacity: 1,
  ease: "none",
  scrollTrigger: {
    trigger: ".scene",
    start: "top 80%",
    end: "center 45%",
    scrub: 1
  }
});`
    },
    {
      id: 'pin', en: 'Pinned Story', title: '화면 고정 스토리', category: 'pin', level: 'intermediate',
      bg: '#ebe5d6', ink: '#8f7d56', short: '화면은 잠시 머무르고, 안의 이야기는 이어져요.',
      headline: '한 장면 안에서 이야기를 이어가요.',
      description: '특정 구간 동안 섹션을 고정한 뒤 내부 문구를 차례로 바꿉니다. 스크롤을 계속하면 고정이 끝나고 다음 섹션으로 자연스럽게 넘어가요.',
      use: '제품 핵심 기능, 브랜드 철학, 단계별 설명', option: 'pin: true, end: "+=160%"', experiment: '✳ end를 +=250%로 바꾸면 한 장면에 더 오래 머물러요.',
      thumbnail: '<div class="mini mini-pin"><div class="pinned-card"><small>STAY A WHILE</small>A story<br>unfolds.</div><div class="scroll-lines"><i></i><i></i><i></i><i></i></div><span class="pin-glyph">⌖</span></div>',
      html: wrapHTML('08', 'Stay here.<br>Keep exploring.', `<div class="pin-visual"><div class="product"></div><span>ONE OBJECT. MANY STORIES.</span></div>
<div class="story-stage"><h2 class="chapter first">01<br>Thoughtful form.</h2><h2 class="chapter second">02<br>Everyday purpose.</h2></div>`, 'pin-scene'),
      css: `.pin-scene { height: 100vh; min-height: 500px; flex-direction: row; gap: 40px; background: #e9e2cf; }
.pin-visual { flex: 1; text-align: center; }
.product { width: 110px; height: 210px; margin: 0 auto 25px; border-radius: 65px 65px 8px 8px; background: #ac9b76; }
.pin-visual span { font-size: 7px; letter-spacing: 1px; }
.story-stage { flex: 1; position: relative; }
.chapter { font-size: clamp(24px,4vw,42px); font-weight: 400; line-height: 1.3; letter-spacing: -1px; }
.second { position: absolute; inset: 0; margin: 0; }
/* 동작 줄이기 설정에서는 두 문장을 모두 보여줍니다. */
@media(prefers-reduced-motion:reduce) { .second { position: static; } }
@media(max-width:480px) { .pin-scene { gap: 15px; } .product { width: 85px; height: 170px; } }`,
      js: `// 고정할 부모 자체가 아닌, 안쪽 콘텐츠를 움직입니다.
gsap.set(".second", { autoAlpha: 0, y: 40 });

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".pin-scene",
    start: "top top",
    end: "+=160%", // 화면 높이의 160%만큼 스크롤하는 동안 고정
    pin: true,
    scrub: 1
  }
});

tl.to(".product", { rotation: -12, duration: 1 })
  .to(".first", { autoAlpha: 0, y: -40, duration: 0.5 }, 0.5)
  .to(".second", { autoAlpha: 1, y: 0, duration: 0.5 }, 0.8)
  .to({}, { duration: 0.4 }); // 마지막 문장을 읽을 여유`
    },
    {
      id: 'horizontal', en: 'Horizontal Scroll', title: '가로 스크롤', category: 'pin', level: 'advanced',
      bg: '#e9e2ed', ink: '#8d749b', short: '세로 스크롤이 가로 방향의 장면 전환으로 바뀌어요.',
      headline: '스크롤의 방향을 바꿔보세요.',
      description: '섹션을 고정하고 가로로 긴 트랙을 이동합니다. 실제로는 세로 스크롤을 유지하면서 카드가 오른쪽에서 왼쪽으로 흘러가는 구조예요.',
      use: '프로젝트 갤러리, 연혁, 상품 컬렉션', option: 'x: -(scrollWidth - clientWidth)', experiment: '✳ 패널을 하나 더 추가해도 이동 거리가 자동으로 계산돼요.',
      thumbnail: '<div class="mini mini-horizontal"><div class="h-card"><small>COLLECTION</small>01 ↗</div><div class="h-card"><small>COLLECTION</small>02 ↗</div><div class="h-card"><small>COLLECTION</small>03 ↗</div></div>',
      html: wrapHTML('09', 'A different<br>direction.', `<div class="track">
  <article class="panel"><small>01 / COLLECTION</small><h2>New<br>perspectives.</h2><span>↗</span></article>
  <article class="panel"><small>02 / COLLECTION</small><h2>Quiet<br>details.</h2><span>↗</span></article>
  <article class="panel"><small>03 / COLLECTION</small><h2>Bold<br>possibilities.</h2><span>↗</span></article>
</div>`, 'horizontal-scene'),
      css: `.horizontal-scene { padding: 70px 0 40px; height: 100vh; min-height: 480px; overflow: hidden;
  align-items: flex-start; background: #eee7f1; }
.track { display: flex; gap: 20px; padding: 0 7%; width: 100%; }
.panel { flex: 0 0 80%; min-height: 65vh; background: #cfc0da; padding: 35px; border-radius: 4px;
  display: flex; flex-direction: column; justify-content: space-between; }
.panel:nth-child(2) { background: #b7a8c6; }
.panel:nth-child(3) { background: #91839e; color: #f5eff8; }
.panel small { font-size: 9px; letter-spacing: 1px; }
.panel h2 { font-size: clamp(38px,7vw,70px); font-weight: 400; letter-spacing: -2px; line-height: 1; }
.panel>span { align-self: flex-end; font-size: 30px; }
@media(prefers-reduced-motion:reduce) {
  .horizontal-scene { height: auto; }
  .track { flex-direction: column; }
  .panel { min-height: 320px; flex-basis: auto; }
}`,
      js: `const track = document.querySelector(".track");
const viewport = document.querySelector(".horizontal-scene");
const distance = () => track.scrollWidth - viewport.clientWidth;

gsap.to(track, {
  x: () => -distance(), // 화면 밖으로 넘친 너비만큼 이동
  ease: "none",
  scrollTrigger: {
    trigger: viewport,
    start: "top top",
    end: () => "+=" + distance(),
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true // 화면 크기가 바뀌면 거리 재계산
  }
});`
    },
    {
      id: 'stack', en: 'Stacking Cards', title: '카드 쌓기', category: 'pin', level: 'advanced',
      bg: '#dfe7f2', ink: '#6a83a5', short: '다음 카드가 올라오며 이전 카드 위에 쌓여요.',
      headline: '내용은 차곡차곡, 시선은 한곳에.',
      description: '한 장면을 고정하고 뒤의 카드를 아래에서 위로 올립니다. 앞의 카드는 조금씩 작아져 뒤로 물러나는 깊이감을 만들어요.',
      use: '서비스 소개, 업무 프로세스, 핵심 가치', option: 'pin + timeline + yPercent', experiment: '✳ scale을 0.8로 바꿔 앞 카드가 더 멀어지는 느낌을 줘보세요.',
      thumbnail: '<div class="mini mini-stack"><div class="stack-card">01</div><div class="stack-card">02</div><div class="stack-card">03 ↗</div></div>',
      html: wrapHTML('10', 'Ideas,<br>layer by layer.', `<div class="stack-deck">
  <article class="stack-card"><small>01 / OUR APPROACH</small><h2>Start with<br>curiosity.</h2><span>질문에서 시작하는 새로운 가능성.</span></article>
  <article class="stack-card"><small>02 / OUR APPROACH</small><h2>Shape the<br>possibilities.</h2><span>아이디어를 눈에 보이는 형태로.</span></article>
  <article class="stack-card"><small>03 / OUR APPROACH</small><h2>Make it<br>happen.</h2><span>작은 시도를 실제 경험으로.</span></article>
</div>`, 'stack-scene'),
      css: `.stack-scene { height: 100vh; min-height: 500px; background: #e1e8f1; overflow: hidden; }
.stack-deck { position: relative; width: min(100%, 480px); height: 330px; }
.stack-card { width: 100%; height: 330px; padding: 30px; border-radius: 8px; background: #c2cfe4;
  display: flex; flex-direction: column; justify-content: space-between; }
.stack-card:nth-child(2) { background: #9db4d3; }
.stack-card:nth-child(3) { background: #6c8db8; color: #f4f7fc; }
.stack-card small { font-size: 8px; letter-spacing: 1px; }
.stack-card h2 { font-size: clamp(32px,6vw,52px); font-weight: 400; line-height: 1.1; letter-spacing: -1px; margin: 20px 0; }
.stack-card>span { font-size: 11px; }
@media(prefers-reduced-motion:reduce) {
  .stack-scene, .stack-deck { height: auto; }
  .stack-card { margin-bottom: 20px; }
}`,
      js: `const cards = gsap.utils.toArray(".stack-card");
gsap.set(cards, { position: "absolute", top: 0, left: 0 });
gsap.set(cards.slice(1), { yPercent: 125 });

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".stack-scene",
    start: "top top",
    end: "+=220%",
    pin: true,
    scrub: 1
  }
});

cards.slice(1).forEach((card, index) => {
  tl.to(cards[index], { scale: 0.92, y: -16, duration: 1 })
    .to(card, { yPercent: 0, duration: 1 }, "<");
});
tl.to({}, { duration: 0.3 });`
    },
    {
      id: 'counter', en: 'Count Up', title: '숫자 카운트 업', category: 'entrance', level: 'beginner',
      bg: '#eee8dc', ink: '#8a7954', short: '숫자가 0부터 목표 값까지 올라가며 성과를 강조해요.',
      headline: '숫자에 주목하는 짧은 순간.',
      description: '숫자 영역이 보이면 목표 값까지 카운트합니다. 예제에서는 일반 객체의 값을 GSAP으로 바꾸고, 그 값을 화면의 숫자에 반영해요.',
      use: '프로젝트 수, 성과 수치, 브랜드 연혁', option: 'value: 0 → 120, snap: { value: 1 }', experiment: '✳ 목표 value를 365로 바꾸어 카운트 속도를 비교해 보세요.',
      thumbnail: '<div class="mini mini-counter"><div class="counter-number">120<small>+</small></div><span class="counter-caption">SMALL STEPS. BIG IMPACT.</span></div>',
      html: wrapHTML('11', 'Every number<br>tells a story.', `<div class="stat"><span class="eyebrow">SAMPLE PROJECTS / 예시 수치</span><h2 aria-label="120개 이상"><span class="count" aria-hidden="true">120</span><span aria-hidden="true">+</span></h2><p>작은 시작이 모여 만드는 커다란 변화.</p></div>`),
      css: `.scene { background: #eee8dc; }
.stat { text-align: center; }
.stat h2 { font-size: clamp(80px,18vw,160px); letter-spacing: -8px; font-weight: 400; margin: 20px 0; line-height: 1; }
.stat h2>span:last-child { font-size: .45em; color: #aa9671; }
.stat p { font-size: 12px; color: #9c917a; }`,
      js: `const number = { value: 0 };
const output = document.querySelector(".count");

gsap.to(number, {
  value: 120,    // 목표 숫자
  duration: 2,
  ease: "power2.out",
  snap: { value: 1 }, // 소수점 없이 정수로
  onUpdate: () => {
    output.textContent = number.value.toLocaleString("ko-KR");
  },
  scrollTrigger: {
    trigger: ".stat",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});`
    },
    {
      id: 'progress', en: 'Scroll Progress', title: '스크롤 진행 표시', category: 'scroll', level: 'beginner',
      bg: '#e5e9d9', ink: '#7c8f5f', short: '페이지를 얼마나 읽었는지 막대의 길이로 보여줘요.',
      headline: '지금 어디쯤 읽고 있나요?',
      description: '페이지 맨 위부터 맨 아래까지의 스크롤 거리를 0~100% 진행률로 연결합니다. 상단 바와 가운데 막대가 같은 진행률을 보여줘요.',
      use: '긴 아티클, 브랜드 스토리, 읽기 진행 안내', option: 'scaleX: 0 → 1, scrub: true', experiment: '✳ 맨 아래까지 스크롤하면 바가 정확히 100% 차는지 확인해요.',
      thumbnail: '<div class="mini mini-progress"><div class="progress-heading">Keep going.</div><div class="progress-line"><span>01</span><i></i></div><div class="progress-line"><span>02</span><i></i></div><div class="progress-line"><span>03</span><i></i></div></div>',
      html: '<div class="reading-progress" aria-hidden="true"></div>\n' + wrapHTML('12', 'A sense<br>of progress.', `<div class="progress-story"><span class="eyebrow">KEEP GOING</span><h2>Small steps.<br>Visible progress.</h2><p>맨 위의 막대를 확인해 보세요.<br>스크롤한 만큼 채워집니다.</p><div class="bar-track"><div class="bar-fill"></div></div><p class="progress-percent" aria-hidden="true">0%</p></div>`),
      css: `.reading-progress { position: fixed; top: 0; left: 0; width: 100%; height: 5px;
  background: #7b915d; z-index: 10; transform: scaleX(0); transform-origin: left; }
.scene { background: #e5e9d9; }
.progress-story { width: 100%; }
.progress-story h2 { font-size: clamp(34px,6vw,60px); line-height: 1.1; letter-spacing: -2px; font-weight: 400; }
.progress-story p { font-size: 12px; line-height: 1.9; color: #8f9a7b; }
.bar-track { width: 100%; height: 13px; margin-top: 35px; background: #ced8bc; }
.bar-fill { height: 100%; width: 100%; background: #7b915d; transform-origin: left; }
@media(prefers-reduced-motion:reduce) { .reading-progress, .bar-track, .progress-percent { display: none; } }`,
      js: `gsap.fromTo(".reading-progress, .bar-fill", {
  scaleX: 0
}, {
  scaleX: 1,
  ease: "none",
  scrollTrigger: {
    start: 0,
    end: "max", // 문서 끝: 실제로 스크롤할 수 있는 최대 위치
    scrub: true,
    onUpdate: (self) => {
      document.querySelector(".progress-percent").textContent =
        Math.round(self.progress * 100) + "%";
    }
  }
});`
    }
  ].concat(createAdvanced({ wrapHTML })).map((demo, index) => ({
    ...demo, stage: demo.stage || 'basic',
    libraries: [...libraries, ...(demo.extraLibraries || [])],
    number: String(index + 1).padStart(2, '0'),
    css: baseCSS + '\n\n/* 이 예제의 스타일 */\n' + demo.css,
    js: (demo.setupJS ? demo.setupJS + '\n\n' : '') + wrapJS(demo.js)
  }));

  const escapeText = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  function buildDocument(demo, options = {}) {
    const bridge = options.preview ? `
<script>
const previewToken = ${JSON.stringify(options.token || '')};
function report(type) { parent.postMessage({ source: "scroll-lab", token: previewToken, type }, "*"); }
window.addEventListener("error", () => report("error"));
<\/script>` : '';
    return `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeText(demo.title)} — Scroll Lab</title><style>${demo.css}</style></head>
<body>${demo.html}${bridge}
${demo.libraries.map(url => `<script src="${url}"><\/script>`).join('\n')}
<script>
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined"${(demo.requires || []).map(name => ` && typeof ${name} !== "undefined"`).join('')}) {
  ${options.markers ? 'gsap.registerPlugin(ScrollTrigger); ScrollTrigger.defaults({ markers: true });' : ''}
  ${demo.js}
  // 웹폰트 등 레이아웃이 안정된 뒤 시작·끝 지점을 다시 측정합니다.
  document.fonts.ready.then(() => ScrollTrigger.refresh());
  ${options.preview ? `Promise.resolve(${demo.id === 'image-sequence' ? 'framesReady' : 'undefined'}).then(() => report("ready")).catch(() => report("error"));` : ''}
} else {
  ${options.preview ? 'report("error");' : ''}
  const notice = document.createElement("p");
  notice.textContent = "GSAP을 불러오지 못했습니다. 인터넷 연결을 확인하고 새로고침해 주세요.";
  notice.style.cssText = "position:fixed;bottom:0;left:0;right:0;padding:16px;background:#fff1c8;text-align:center;font:12px sans-serif;z-index:99";
  document.body.append(notice);
}
<\/script></body></html>`;
  }
  const api = { demos, libraries, buildDocument, escapeText };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ScrollLab = api;
})(typeof window !== 'undefined' ? window : globalThis);
