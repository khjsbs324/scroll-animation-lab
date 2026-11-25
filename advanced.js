/* 심화 예제: 기본 효과를 연결해 실제 웹사이트의 한 장면을 구성합니다. */
(function(root) {
  function createAdvanced({ wrapHTML }) {
    const { createFrame, count } = typeof module !== 'undefined' && module.exports ? require('./sequence-frames.js') : root.ScrollLabFrames;
    const common = `
/* 심화 섹션 공통. 고정할 부모 대신 내부 요소만 움직입니다. */
.advanced-scene { height: 100vh; min-height: 380px; padding: 65px 7%; overflow: hidden; }
.advanced-scene h2 { font-weight: 400; letter-spacing: -2px; line-height: 1.08; }
.advanced-scene p { font-size: 12px; line-height: 1.9; }
.advanced-kicker { font-size: 8px; letter-spacing: 2px; }
.advanced-scene .scene-label { z-index: 5; pointer-events: none; }
.tea-tin { width: 125px; height: 205px; border-radius: 16px 16px 24px 24px;
  background: linear-gradient(90deg,#71895e,#c0d0a5 30%,#d5e0be 55%,#8fa579);
  box-shadow: 18px 22px 35px #2d44251f; position: relative; display: grid; place-items: center; }
.tea-tin:before { content: ''; position: absolute; top: -7px; left: 0; right: 0; height: 18px;
  border-radius: 50%; background: #e0e6ca; border: 1px solid #95a57e; }
.tea-label { background: #f4f0df; width: 80%; padding: 18px 0; text-align: center; color: #536149; }
.tea-label b { font-family: Georgia,serif; font-size: 25px; font-weight: 400; }
.tea-label small { display: block; font-size: 6px; letter-spacing: 1.3px; margin-top: 14px; }
@media(max-width:480px) { .advanced-scene { padding: 55px 7%; } .tea-tin { width: 90px; height: 155px; } .tea-label b { font-size: 20px; } }
@media(prefers-reduced-motion:reduce) { .advanced-scene { height: auto; min-height: 80vh; overflow: visible; } }
`;
    const tin = '<div class="tea-tin"><div class="tea-label"><b>MORI</b><small>A QUIET DAILY RITUAL</small></div></div>';
    const view = (n,title,html,className) => wrapHTML(n,title,html,`advanced-scene ${className}`);
    const mini = (name,html) => `<div class="mini advanced-mini mini-${name}">${html}</div>`;
    return [
      {
        id:'fullscreen', title:'풀스크린 확장', en:'Expanding Hero', category:'pin', level:'intermediate',
        bg:'#dce5dd', ink:'#506f5b', short:'작은 풍경이 화면 전체로 펼쳐지고 메시지가 나타나요.',
        headline:'작은 창에서 시작하는 큰 장면.', description:'포트폴리오의 작은 대표 이미지가 스크롤에 맞춰 화면을 채웁니다. 확장 뒤에는 제목이 드러나고 고정 구간이 끝나면서 다음 섹션으로 이어져요.',
        use:'브랜드 히어로, 건축·공간 프로젝트 표지', option:'pin + width·height + timeline', experiment:'✳ 이미지가 확장된 뒤 제목이 나타날 때까지의 간격을 바꿔보세요.',
        flow:['작은 이미지 창','화면 전체로 확장','제목 등장 → 고정 해제'], skills:['스크롤 줌','이미지 마스크 리빌','화면 고정'],
        thumbnail:mini('expand','<span class="expand-outer"></span><span class="expand-inner">OPEN<br>YOUR VIEW.</span><i>↗</i>'),
        html:view('13','Open your<br>perspective.',`<div class="expand-window"><div class="expand-land"><div class="expand-sun"></div><div class="expand-hill one"></div><div class="expand-hill two"></div></div><div class="expand-copy"><span class="advanced-kicker">SPACES THAT INSPIRE</span><h2>A wider<br>perspective.</h2><p>공간을 바라보는 새로운 시선.</p></div></div>`,'expand-scene'),
        css:common+`.expand-scene { padding: 0; background: #e1e8df; }
.expand-window { width: 44%; height: 48%; border-radius: 110px 110px 4px 4px; overflow: hidden; position: relative; flex-shrink: 0; }
.expand-land { position: absolute; inset: 0; background: #bacfbc; overflow: hidden; }
.expand-sun { position: absolute; width: 20%; aspect-ratio: 1; border-radius: 50%; background: #f6e0ab; right: 18%; top: 14%; }
.expand-hill { position: absolute; width: 120%; height: 90%; border-radius: 50% 50% 0 0; bottom: -50%; background: #678a70; left: -30%; transform: rotate(-15deg); }
.expand-hill.two { background: #3b6250; left: 20%; bottom: -63%; transform: rotate(25deg); }
.expand-copy { position: absolute; inset: 0; padding: 15%; display: flex; flex-direction: column; justify-content: center; color: #f7f4e8; }
.expand-copy h2 { font-size: clamp(38px,8vw,80px); margin: 25px 0 10px; }
@media(prefers-reduced-motion:reduce) { .expand-window { width: 100%; height: 75vh; border-radius: 0; } }`,
        js:`gsap.set(".expand-copy", { autoAlpha: 0, y: 30 });
const tl = gsap.timeline({
  scrollTrigger: { trigger: ".expand-scene", start: "top top", end: "+=160%", pin: true, scrub: 1 }
});
tl.to(".expand-window", { width: "100%", height: "100%", borderRadius: 0, duration: 1.5, ease: "none" })
  .to(".expand-copy", { autoAlpha: 1, y: 0, duration: 0.6 }, ">0.15")
  .to({}, { duration: 0.4 });`
      },
      {
        id:'product-story', title:'고정형 제품 스토리', en:'Product Storytelling', category:'pin', level:'advanced',
        bg:'#e2e7cd', ink:'#5f754b', short:'제품을 중심으로 배경과 문구가 세 장면으로 바뀌어요.',
        headline:'스크롤로 완성하는 한 제품의 이야기.', description:'중앙 제품의 위치·회전과 배경, 설명을 하나의 타임라인으로 연결합니다. 브랜드 소개에서 상품의 특징을 순서대로 보여주는 구성입니다.',
        use:'티·화장품·생활용품의 브랜드 소개와 상세 페이지', option:'timeline labels + pin + scrub', experiment:'✳ 두 번째 장면의 배경과 제품 회전 방향을 바꿔보세요.',
        flow:['제품과 첫 메시지','제품 회전 + 배경 전환','마지막 특징 강조'], skills:['순차 등장','스크롤 줌','화면 고정 스토리'],
        thumbnail:mini('product','<span class="product-orbit"></span><div class="mini-tin">MORI<small>DAILY RITUAL</small></div><span class="mini-chapters">01 — 02 — 03</span>'),
        html:view('14','A quiet<br>daily ritual.',`<div class="product-stage">${tin}</div><div class="product-chapters"><article class="product-chapter"><span class="advanced-kicker">01 / ORIGIN</span><h2>Rooted<br>in nature.</h2><p>자연에서 고른 재료, 차분한 시작.</p></article><article class="product-chapter"><span class="advanced-kicker">02 / BALANCE</span><h2>Blended<br>for you.</h2><p>오늘의 기분에 맞는 나만의 균형.</p></article><article class="product-chapter"><span class="advanced-kicker">03 / RITUAL</span><h2>Your daily<br>pause.</h2><p>바쁜 일상에 작은 쉼을 더해요.</p></article></div><div class="story-meter"><i></i></div>`,'product-scene'),
        css:common+`.product-scene { flex-direction: row; gap: 6%; background: #dce5cb; }
.product-stage { width: 43%; display: grid; place-items: center; }
.product-chapters { width: 51%; position: relative; min-height: 210px; }
.product-chapter { position: absolute; inset: 0; }
.product-chapter h2 { font-size: clamp(28px,5vw,55px); margin: 20px 0; }
.product-chapter p { color: #667652; }
.story-meter { position: absolute; height: 3px; width: 60%; background: #6c815233; bottom: 35px; }
.story-meter i { display: block; width: 100%; height: 100%; background: #566e44; transform-origin: left; }
@media(max-width:480px) { .product-scene { gap: 5%; } .product-chapter h2 { font-size: 28px; letter-spacing: -1px; } .product-chapter p { font-size: 10px; } }
@media(prefers-reduced-motion:reduce) { .product-scene { flex-direction: column; gap: 35px; } .product-chapters { width: 100%; } .product-chapter { position: static; text-align: center; margin-bottom: 30px; } .story-meter { display: none; } }`,
        js:`const chapters = gsap.utils.toArray(".product-chapter");
gsap.set(chapters.slice(1), { autoAlpha: 0, y: 35 });
gsap.set(".story-meter i", { scaleX: 0 });
const tl = gsap.timeline({ scrollTrigger: {
  trigger: ".product-scene", start: "top top", end: "+=240%", pin: true, scrub: 1
}});
tl.addLabel("balance", 0.5)
  .to(chapters[0], { autoAlpha: 0, y: -35, duration: 0.4 }, "balance")
  .to(chapters[1], { autoAlpha: 1, y: 0, duration: 0.4 }, "balance+=0.3")
  .to(".tea-tin", { rotation: -14, scale: 1.12, duration: 0.7 }, "balance")
  .to(".product-scene", { backgroundColor: "#e9ddcc", duration: 0.7 }, "balance")
  .addLabel("ritual", 1.7)
  .to(chapters[1], { autoAlpha: 0, y: -35, duration: 0.4 }, "ritual")
  .to(chapters[2], { autoAlpha: 1, y: 0, duration: 0.4 }, "ritual+=0.3")
  .to(".tea-tin", { rotation: 10, scale: 1, duration: 0.7 }, "ritual")
  .to(".product-scene", { backgroundColor: "#d7e4e1", duration: 0.7 }, "ritual")
  .to({}, { duration: 0.5 });
tl.to(".story-meter i", { scaleX: 1, duration: tl.duration(), ease: "none" }, 0);`
      },
      {
        id:'text-highlight', title:'텍스트 하이라이트', en:'Reading Highlight', category:'pin', level:'intermediate',
        bg:'#e9e4dc', ink:'#766951', short:'문장의 단어를 하나씩 밝혀 메시지를 읽게 만들어요.',
        headline:'읽는 속도와 움직임을 연결해요.', description:'고정된 화면에서 단어의 색을 순서대로 바꿉니다. 타임라인의 stagger와 스크롤 진행률을 연결해 긴 브랜드 메시지를 강조합니다.',
        use:'브랜드 철학, 선언문, 프로젝트 개요', option:'color + stagger + scrub', experiment:'✳ stagger 간격과 end 거리를 바꿔 읽는 속도를 조절해 보세요.',
        flow:['문장 전체 표시','스크롤 순서대로 강조','완성된 메시지'], skills:['텍스트 리빌','순차 등장','스크롤 진행 표시'],
        thumbnail:mini('reading','<div>Small things.<br><b>Lasting</b> meaning.</div><span>READ AT YOUR OWN PACE</span>'),
        html:view('15','Words worth<br>slowing down for.',`<div class="reading-copy"><span class="advanced-kicker">OUR PHILOSOPHY</span><h2 aria-label="우리는 작은 순간에 집중하고 일상에 오래 남는 경험을 만듭니다."><span aria-hidden="true">우리는</span> <span aria-hidden="true">작은</span> <span aria-hidden="true">순간에</span> <span aria-hidden="true">집중하고,</span> <span aria-hidden="true">일상에</span> <span aria-hidden="true">오래</span> <span aria-hidden="true">남는</span> <span aria-hidden="true">경험을</span> <span aria-hidden="true">만듭니다.</span></h2><p>한 단어씩, 우리만의 속도로.</p></div>`,'reading-scene'),
        css:common+`.reading-scene { background: #ede8df; }
.reading-copy { width: min(100%,680px); }
.reading-copy h2 { font-size: clamp(30px,5.8vw,60px); line-height: 1.6; word-break: keep-all; margin: 22px 0; letter-spacing: -1.5px; }
.reading-copy h2 span { display: inline-block; }
.reading-copy p { color: #9a907c; }`,
        js:`gsap.fromTo(".reading-copy h2 span", {
  color: "#c9c3b7"
}, {
  color: "#493f30",
  stagger: 0.25,
  duration: 0.4,
  ease: "none",
  scrollTrigger: {
    trigger: ".reading-scene", start: "top top", end: "+=170%", pin: true, scrub: 0.5
  }
});`
      },
      {
        id:'horizontal-story', title:'복합 가로 스크롤', en:'Horizontal Story', category:'pin', level:'advanced',
        bg:'#dddfee', ink:'#626388', short:'가로 장면 전환에 제목·도형의 개별 움직임을 더해요.',
        headline:'움직이는 장면 안에 또 다른 움직임.', description:'가로 트랙을 이동시키는 타임라인을 기준으로 각 패널의 제목과 도형에 별도 ScrollTrigger를 연결합니다. containerAnimation으로 두 움직임의 기준을 맞춥니다.',
        use:'프로젝트 갤러리, 컬렉션, 브랜드의 챕터 소개', option:'containerAnimation: horizontalTween', experiment:'✳ 제목과 도형의 시작 위치를 바꾸고 서로 다른 움직임을 만들어보세요.',
        flow:['첫 패널 등장','가로 이동 + 내부 콘텐츠 등장','마지막 패널 → 세로 복귀'], skills:['가로 스크롤','좌우 슬라이드','순차 등장'],
        thumbnail:mini('hstory','<span>01<br><b>Discover.</b></span><span>02<br><b>Connect.</b></span><i>→</i>'),
        html:view('16','Three chapters.<br>One journey.',`<div class="story-track"><article class="story-panel"><span class="advanced-kicker">01 / DISCOVER</span><div class="panel-shape"></div><h2>Start with<br>curiosity.</h2></article><article class="story-panel"><span class="advanced-kicker">02 / CONNECT</span><div class="panel-shape"></div><h2>Find your<br>connection.</h2></article><article class="story-panel"><span class="advanced-kicker">03 / CREATE</span><div class="panel-shape"></div><h2>Make something<br>meaningful.</h2></article></div>`,'horizontal-story-scene'),
        css:common+`.horizontal-story-scene { padding: 0; align-items: flex-start; background: #e4e2f0; }
.story-track { display: flex; width: 100%; height: 100%; }
.story-panel { flex: 0 0 100%; height: 100%; position: relative; padding: 70px 9% 40px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; background: #e1d9ed; }
.story-panel:nth-child(2) { background: #d4dfd7; }
.story-panel:nth-child(3) { background: #e5d8cc; }
.story-panel h2 { z-index: 1; font-size: clamp(35px,6.5vw,65px); margin: 0; }
.panel-shape { position: absolute; width: 30%; aspect-ratio: 1; background: #b4a3ce; border-radius: 50% 50% 3% 50%; right: 10%; top: 23%; }
.story-panel:nth-child(2) .panel-shape { background: #8ba994; border-radius: 50%; }
.story-panel:nth-child(3) .panel-shape { background: #be997c; border-radius: 4px; }
@media(prefers-reduced-motion:reduce) { .story-track { flex-direction: column; } .story-panel { flex-basis: auto; min-height: 70vh; } }`,
        js:`const track = document.querySelector(".story-track");
const viewport = document.querySelector(".horizontal-story-scene");
const distance = () => track.scrollWidth - viewport.clientWidth;
const horizontalTween = gsap.to(track, {
  x: () => -distance(), ease: "none",
  scrollTrigger: { trigger: viewport, start: "top top", end: () => "+=" + distance(),
    pin: true, scrub: 1, invalidateOnRefresh: true }
});
// 첫 패널은 그대로 표시하고, 이후 패널의 내부 요소를 움직입니다.
gsap.utils.toArray(".story-panel").slice(1).forEach(panel => {
  gsap.from(panel.querySelector("h2"), {
    y: 80, opacity: 0, ease: "none",
    scrollTrigger: { trigger: panel, containerAnimation: horizontalTween,
      start: "left 85%", end: "left 25%", scrub: true }
  });
  gsap.from(panel.querySelector(".panel-shape"), {
    rotation: -100, scale: 0.4, ease: "none",
    scrollTrigger: { trigger: panel, containerAnimation: horizontalTween,
      start: "left 95%", end: "left 20%", scrub: true }
  });
});`
      },
      {
        id:'image-sequence', title:'이미지 시퀀스', en:'Canvas Image Sequence', category:'pin', level:'advanced',
        bg:'#e4e8d8', ink:'#6e8054', short:'48장의 이미지 프레임을 스크롤로 넘겨 제품을 회전시켜요.',
        headline:'스크롤이 제품의 재생 버튼이 됩니다.', description:'미리 준비한 이미지들을 Canvas에 한 장씩 그립니다. 이 예제는 학습용 SVG 프레임 48장을 코드로 생성하므로 CodePen에서도 별도 이미지 업로드 없이 실행돼요.',
        use:'제품 회전, 조립·분해 과정, 기능 소개', option:'frame: 0 → 47 + canvas.drawImage()', experiment:'✳ frameCount를 24로 바꾸어 프레임 수에 따른 차이를 관찰해 보세요.',
        flow:['프레임 이미지 준비','스크롤에 맞춰 이미지 교체','한 바퀴 회전 완료'], skills:['화면 고정','스크롤 진행 표시','숫자 값 제어'],
        assetNote:'학습용 SVG 48장을 코드에서 생성합니다. 실제 상품은 images 배열을 PNG/WebP 이미지 URL로 교체하세요.',
        thumbnail:mini('sequence','<div class="mini-box">MORI</div><span>FRAME 024 / 048</span><i>↻</i>'),
        html:view('17','One product.<br>Every angle.',`<div class="sequence-heading"><span class="advanced-kicker">MORI / EVERY ANGLE</span><h2>A new point of view.</h2></div><canvas class="sequence-canvas" width="640" height="480" role="img" aria-label="스크롤에 따라 회전하는 MORI 제품 상자"></canvas><p class="sequence-status" aria-hidden="true">프레임 준비 중…</p>`,'sequence-scene'),
        css:common+`.sequence-scene { background: #e7e9dc; padding: 55px 6% 25px; }
.sequence-heading { width: 100%; flex-shrink: 0; }
.sequence-heading h2 { font-size: clamp(23px,4vw,42px); margin: 12px 0 0; }
.sequence-canvas { width: min(100%,640px); height: auto; max-height: 65vh; object-fit: contain; min-height: 0; }
.sequence-status { font-size: 9px!important; letter-spacing: 1px; color: #7d896d; margin: 0; }
@media(prefers-reduced-motion:reduce) { .sequence-canvas { max-height: none; } }`,
        // 이미지 로딩·정적 프레임은 matchMedia 밖에서도 필요합니다.
        setupJS:`// 학습용 프레임 생성기. 실무에서는 제품 렌더링 PNG/WebP URL 배열로 대체하세요.
const createFrame = ${createFrame.toString()};
const frameCount = ${count};
const images = Array.from({ length: frameCount }, (_, index) => {
  const image = new Image();
  image.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(createFrame(index, frameCount));
  return image;
});
const canvas = document.querySelector(".sequence-canvas");
const context = canvas.getContext("2d");
const sequence = { frame: 0 };
function drawFrame() {
  const index = Math.min(frameCount - 1, Math.round(sequence.frame));
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[index], 0, 0, canvas.width, canvas.height);
  document.querySelector(".sequence-status").textContent =
    "FRAME " + String(index + 1).padStart(3, "0") + " / " + frameCount;
}
const framesReady = Promise.all(images.map(image => image.decode()));
framesReady.then(() => { drawFrame(); ScrollTrigger.refresh(); }).catch(() => {
  document.querySelector(".sequence-status").textContent = "이미지를 불러오지 못했습니다. 재시작해 주세요.";
});`,
        js:`// 비동기 로딩이 끝나기 전에 예제를 닫거나 미디어 쿼리가 바뀌어도 안전하게 정리합니다.
const context = gsap.context(() => {});
let disposed = false;
framesReady.then(() => {
  if (disposed) return;
  context.add(() => {
    gsap.to(sequence, {
      frame: frameCount - 1, snap: { frame: 1 }, ease: "none", onUpdate: drawFrame,
      scrollTrigger: { trigger: ".sequence-scene", start: "top top", end: "+=220%", pin: true, scrub: 0.5 }
    });
  });
  ScrollTrigger.refresh();
});
return () => { disposed = true; context.revert(); };`
      },
      {
        id:'svg-journey', title:'SVG 선 그리기', en:'Draw the Journey', category:'scroll', level:'intermediate',
        bg:'#e5e3ef', ink:'#7e6a9f', short:'선을 따라 아이콘과 설명이 순서대로 나타나요.',
        headline:'과정을 하나의 경로로 연결해요.', description:'SVG 경로의 길이를 계산해 선을 점점 드러내고, 각 지점의 설명을 순서대로 표시합니다. 모바일에서도 같은 경로의 비율을 유지해 보여줍니다.',
        use:'제작 과정, 서비스 프로세스, 브랜드 연혁', option:'strokeDashoffset: pathLength → 0', experiment:'✳ SVG path의 d 값을 바꾸어 우리 프로젝트만의 경로를 만들어보세요.',
        flow:['빈 경로','선 그리기 + 단계 등장','완성된 프로세스'], skills:['스크롤 진행 표시','순차 등장','페이드 업'],
        thumbnail:mini('path','<svg viewBox="0 0 230 110" aria-hidden="true"><path d="M15 80C40 5 85 110 115 45S180 10 215 40"/><circle cx="15" cy="80" r="5"/><circle cx="115" cy="45" r="5"/><circle cx="215" cy="40" r="5"/></svg><span>IDEA → PROCESS → EXPERIENCE</span>'),
        html:view('18','Every idea<br>has a journey.',`<div class="journey-head"><span class="advanced-kicker">HOW WE CREATE</span><h2>From an idea<br>to an experience.</h2></div><div class="journey"><svg viewBox="0 0 600 240" fill="none" aria-hidden="true"><path class="path-guide" d="M40 180 C100 20 200 230 300 110 S470 30 560 80"/><path class="draw-path" d="M40 180 C100 20 200 230 300 110 S470 30 560 80"/></svg><article class="journey-stop stop-one"><b>01</b><span>Discover</span></article><article class="journey-stop stop-two"><b>02</b><span>Develop</span></article><article class="journey-stop stop-three"><b>03</b><span>Deliver</span></article></div>`,'journey-scene'),
        css:common+`.journey-scene { background: #e8e4f0; min-height: 90vh; height: auto; }
.journey-head { width: 100%; }
.journey-head h2 { font-size: clamp(28px,5vw,50px); margin: 20px 0 10px; }
.journey { position: relative; width: 100%; margin: 30px 0 55px; }
.journey svg { display: block; width: 100%; overflow: visible; }
.path-guide { stroke: #cdc2df; stroke-width: 2; }
.draw-path { stroke: #8664ae; stroke-width: 4; stroke-linecap: round; }
.journey-stop { position: absolute; display: grid; justify-items: center; gap: 13px; font-size: 11px; }
.journey-stop b { width: 28px; height: 28px; border-radius: 50%; background: #8664ae; color: #fff; display: grid; place-items: center; font-size: 9px; font-weight: 400; }
.stop-one { left: 6.67%; top: 75%; transform: translate(-50%,-14px); }
.stop-two { left: 50%; top: 45.83%; transform: translate(-50%,-14px); }
.stop-three { left: 93.33%; top: 33.33%; transform: translate(-50%,-14px); }
@media(max-width:480px) { .journey-stop { font-size: 9px; } .journey { margin-top: 60px; } }`,
        js:`const path = document.querySelector(".draw-path");
const length = path.getTotalLength();
gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
gsap.set(".journey-stop", { autoAlpha: 0 });
const tl = gsap.timeline({ scrollTrigger: {
  trigger: ".journey-scene", start: "top 65%", end: "bottom 70%", scrub: 0.6
}});
tl.to(path, { strokeDashoffset: 0, duration: 1, ease: "none" }, 0)
  .to(".stop-one", { autoAlpha: 1, duration: 0.15 }, 0)
  .to(".stop-two", { autoAlpha: 1, duration: 0.15 }, 0.45)
  .to(".stop-three", { autoAlpha: 1, duration: 0.15 }, 0.85);`
      },
      {
        id:'layout-flip', title:'레이아웃 변신', en:'Scroll Flip Layout', category:'pin', level:'advanced',
        bg:'#eadfd5', ink:'#9a7357', short:'작은 썸네일이 다른 레이아웃의 대표 이미지로 이어져요.',
        headline:'같은 요소를, 새로운 레이아웃으로.', description:'Flip으로 처음 배치의 위치와 크기를 기록하고, 바뀐 레이아웃까지의 이동을 스크롤에 연결합니다. 썸네일이 제목 옆의 큰 대표 비주얼로 자연스럽게 이어집니다.',
        use:'포트폴리오 썸네일, 프로젝트 소개, 브랜드 갤러리', option:'Flip.getState() + progress(self.progress)', experiment:'✳ 확장 레이아웃의 grid 비율을 바꿔 최종 이미지의 크기를 바꿔보세요.',
        extraLibraries:['https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Flip.min.js'], requires:['Flip'],
        flow:['처음 배치 기록','새 레이아웃 적용','스크롤에 맞춰 위치·크기 전환'], skills:['스크롤 줌','좌우 슬라이드','레이아웃 상태 전환'],
        thumbnail:mini('flip','<span class="flip-small"></span><i>↗</i><span class="flip-large">A new<br>arrangement.</span>'),
        html:view('19','A new<br>arrangement.',`<div class="flip-layout"><div class="flip-copy"><span class="advanced-kicker">SELECTED PROJECT / 2026</span><h2>Same object.<br>New context.</h2><p>작은 썸네일에서 프로젝트의<br>중심이 되는 이미지로.</p></div><div class="flip-art"><div class="flip-disc"></div><span>FORM / 001</span></div></div>`,'flip-scene'),
        css:common+`.flip-scene { background: #eee3d9; }
.flip-layout { width: 100%; height: 75%; min-height: 260px; position: relative; display: grid; grid-template-columns: 1fr 150px; align-items: end; gap: 25px; }
.flip-layout.expanded { grid-template-columns: .8fr 1.2fr; align-items: center; }
.flip-copy h2 { font-size: clamp(25px,4.4vw,46px); margin: 20px 0; }
.flip-copy p { color: #8d7c6c; }
.flip-art { width: 100%; height: 145px; position: relative; overflow: hidden; background: #c8a98c; border-radius: 4px; display: grid; place-items: center; }
.expanded .flip-art { height: 100%; }
.flip-disc { width: 65%; aspect-ratio: 1; border-radius: 50% 50% 3% 3%; background: #f0d6ac; transform: rotate(-12deg); }
.flip-art>span { position: absolute; bottom: 16px; left: 16px; font-size: 8px; letter-spacing: 1px; color: #6e513b; }
@media(max-width:480px) { .flip-layout { grid-template-columns: 1fr 70px; gap: 12px; min-height: 230px; } .flip-layout.expanded { grid-template-columns: 1fr 1fr; } .flip-art { height: 80px; } .flip-copy h2 { font-size: 24px; letter-spacing: -1px; } .flip-copy p { font-size: 10px; } .flip-art>span { left: 8px; font-size: 6px; } }
@media(prefers-reduced-motion:reduce) { .flip-layout { grid-template-columns: 1fr; height: auto; } .flip-art { height: 240px; } }`,
        js:`gsap.registerPlugin(Flip);
const layout = document.querySelector(".flip-layout");
const art = document.querySelector(".flip-art");
// refreshInit에서 이전 상태로 되돌리고 새 화면 너비로 다시 측정합니다.
let flipTween;
function measureLayout() {
  if (flipTween) flipTween.kill();
  gsap.set(art, { clearProps: "transform,width,height" });
  layout.classList.remove("expanded");
  const state = Flip.getState(art);
  layout.classList.add("expanded");
  flipTween = Flip.from(state, { duration: 1, ease: "none", paused: true });
}
measureLayout();
ScrollTrigger.addEventListener("refreshInit", measureLayout);
ScrollTrigger.create({
  trigger: ".flip-scene", start: "top top", end: "+=150%", pin: true,
  onUpdate: self => flipTween.progress(self.progress),
  onRefresh: self => flipTween.progress(self.progress)
});
return () => {
  ScrollTrigger.removeEventListener("refreshInit", measureLayout);
  flipTween.kill();
  layout.classList.remove("expanded");
  art.removeAttribute("style");
};`
      },
      {
        id:'depth-cards', title:'3D 카드 공간 이동', en:'Cards in Depth', category:'pin', level:'advanced',
        bg:'#dedfec', ink:'#66698a', short:'카드가 깊은 공간에서 앞으로 다가오며 정렬돼요.',
        headline:'카드를 평면에서 공간으로.', description:'CSS perspective와 GSAP의 z·rotationY를 연결합니다. 처음에는 기울어진 카드들이 서로 다른 깊이에 있고, 스크롤하면 앞쪽으로 나와 정렬됩니다.',
        use:'크리에이티브 포트폴리오, 전시·컬렉션 소개', option:'perspective + z + rotationY', experiment:'✳ perspective를 500px로 바꾸면 원근감이 얼마나 강해질까요?',
        flow:['서로 다른 깊이의 카드','앞으로 이동 + 회전','세 카드가 나란히 정렬'], skills:['카드 쌓기','스크롤 줌','순차 등장'],
        thumbnail:mini('depth','<span>01</span><span>02</span><span>03</span>'),
        html:view('20','A different<br>dimension.',`<div class="depth-heading"><span class="advanced-kicker">PERSPECTIVES / A DIGITAL EXHIBITION</span><h2>Step into<br>the collection.</h2></div><div class="depth-space"><article class="depth-card"><small>01 / FORM</small><div></div><b>Shape.</b></article><article class="depth-card"><small>02 / COLOUR</small><div></div><b>Feeling.</b></article><article class="depth-card"><small>03 / SPACE</small><div></div><b>Perspective.</b></article></div>`,'depth-scene'),
        css:common+`.depth-scene { background: #e0e1ed; }
.depth-heading { width: 100%; position: relative; z-index: 1; }
.depth-heading h2 { font-size: clamp(26px,4vw,42px); margin: 13px 0; }
.depth-space { display: flex; justify-content: center; gap: 14px; width: 100%; perspective: 900px; transform-style: preserve-3d; margin-top: 22px; }
.depth-card { width: 30%; min-width: 0; height: 240px; padding: 20px 15px; background: #bcb8d4; border-radius: 5px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 18px 30px #5c54781a; backface-visibility: hidden; }
.depth-card:nth-child(2) { background: #9caac7; }
.depth-card:nth-child(3) { background: #819aaf; }
.depth-card small { font-size: 7px; letter-spacing: 1px; }
.depth-card b { font-size: clamp(12px,2vw,21px); letter-spacing: -.5px; font-weight: 400; }
.depth-card>div { width: 70%; aspect-ratio: 1; margin: auto; background: #ffffff55; border-radius: 50% 50% 3% 3%; }
@media(max-width:480px) { .depth-space { gap: 8px; margin-top: 15px; } .depth-card { height: 175px; padding: 12px 8px; } .depth-card small { font-size: 5px; } }
@media(prefers-reduced-motion:reduce) { .depth-space { perspective: none; } }`,
        js:`const cards = gsap.utils.toArray(".depth-card");
cards.forEach((card,index) => {
  gsap.set(card, { z: -700 - index * 180, rotationY: 45 - index * 35, y: 80 });
});
gsap.to(cards, {
  z: 0, rotationY: 0, y: 0, stagger: 0.2, duration: 1, ease: "none",
  scrollTrigger: { trigger: ".depth-scene", start: "top top", end: "+=190%", pin: true, scrub: 1 }
});`
      }
    ].map(demo => ({ ...demo, stage:'advanced' }));
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = createAdvanced;
  else root.ScrollLabAdvanced = createAdvanced;
})(typeof window !== 'undefined' ? window : globalThis);
