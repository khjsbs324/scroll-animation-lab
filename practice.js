/* 실무 응용: 스크롤의 속도·방향, 경로, 비교와 정보 구조를 활용하는 10종. */
(function(root) {
  function createPractice({ wrapHTML }) {
    const css = `
/* 실무 응용 공통: 움직임이 없어도 콘텐츠를 읽을 수 있는 기본 상태 */
.practice-scene { min-height: 380px; height: 100vh; padding: 65px 7%; overflow: hidden; }
.practice-scene h2 { font-size: clamp(30px,5.5vw,56px); line-height: 1.12; font-weight: 400; letter-spacing: -1.8px; margin: 15px 0; }
.practice-kicker { font-size: 8px; letter-spacing: 2px; }
.practice-scene p { font-size: 12px; line-height: 1.9; }
.practice-heading { width: 100%; position: relative; z-index: 2; }
.practice-status { font-size: 9px!important; letter-spacing: 1px; color: #7f8c79; }
.practice-scene .scene-label { z-index: 5; pointer-events: none; }
@media(max-width:480px) { .practice-scene { padding: 55px 6%; } .practice-scene h2 { font-size: 30px; letter-spacing: -1px; } }
@media(prefers-reduced-motion:reduce) { .practice-scene { height: auto; min-height: 80vh; overflow: visible; } }
`;
    const view = (n,title,content,name) => wrapHTML(n,title,content,`practice-scene ${name}`);
    const heading = (over,title) => `<div class="practice-heading"><span class="practice-kicker">${over}</span><h2>${title}</h2></div>`;
    const mini = (name,content) => `<div class="mini practice-mini mini-${name}">${content}</div>`;
    const art = '<div class="object-arch"></div>';
    const chars = ['MAKE','IT','MATTER.'].map(word=>`<span class="scatter-word">${Array.from(word).map(char=>`<span class="scatter-char" aria-hidden="true">${char}</span>`).join('')}</span>`).join(' ');
    const room = '<div class="room-window"></div><div class="room-desk"></div><div class="room-vase"></div><div class="room-art"></div>';
    return [
      {
        id:'velocity-skew',title:'스크롤 속도 반응',en:'Velocity Skew',category:'scroll',level:'advanced',bg:'#dce6e0',ink:'#668375',
        short:'빠르게 스크롤하면 이미지가 기울고, 멈추면 복원돼요.',headline:'스크롤의 세기를 디자인에 반영해요.',
        description:'위치에 따라 정해진 동작을 재생하는 대신, 사용자가 스크롤하는 속도로 기울기를 조절합니다. 빠른 움직임과 멈춘 순간을 비교해 보세요.',
        use:'패션·디자인 포트폴리오, 이미지 중심 갤러리',option:'getVelocity() + quickTo() + clamp()',experiment:'✳ 속도 나눗값 350을 700으로 바꾸면 반응이 얼마나 줄어들까요?',
        flow:['천천히·빠르게 스크롤','속도에 따라 이미지 기울기 변화','멈추면 원래 형태로 복원'],skills:['스크롤 이벤트','회전·기울기','부드러운 복원'],
        thumbnail:mini('velocity','<i>≋</i><span>In<br>motion.</span><small>FAST → SLOW → STILL</small>'),
        html:view('21','Feel the<br>momentum.',`${heading('FORM / IN MOTION','A little<br>momentum.')}<div class="velocity-art">${art}<span>OBJECTS IN MOTION / 001</span></div><p class="velocity-status practice-status">AT REST</p><p>빠르게 스크롤하고 멈춰보세요.</p>`,'velocity-scene'),
        css:css+`.velocity-scene { height: 145vh; background: #dfe9e2; }
.velocity-art { width: min(85%,430px); height: 320px; background: #a3beb0; margin: 45px 0; display: grid; place-items: center; border-radius: 4px; position: relative; }
.object-arch { width: 44%; height: 65%; border-radius: 100px 100px 4px 4px; background: #e2e8cb; box-shadow: 18px 12px 0 #7d9b8b; }
.velocity-art>span { position: absolute; bottom: 18px; left: 18px; font-size: 8px; letter-spacing: 1px; }
@media(max-width:480px) { .velocity-art { height: 230px; margin: 28px 0; } }`,
        js:`const clamp = gsap.utils.clamp(-12, 12);
const skew = gsap.quickTo(".velocity-art", "skewY", { duration: 0.35, ease: "power3.out" });
const status = document.querySelector(".velocity-status");
const settle = gsap.delayedCall(0.16, () => {
  skew(0);
  status.textContent = "AT REST";
}).pause();
ScrollTrigger.create({
  trigger: ".velocity-scene", start: "top bottom", end: "bottom top",
  onUpdate: self => {
    const velocity = self.getVelocity(); // px/초, 위로 움직이면 음수
    skew(clamp(-velocity / 350));
    status.textContent = "SPEED " + Math.round(Math.abs(velocity)) + " PX/S";
    settle.restart(true); // 마지막 스크롤로부터 0.16초 뒤에 복원
  }
});
return () => settle.kill();`
      },
      {
        id:'direction-marquee',title:'방향 반응 마퀴',en:'Directional Marquee',category:'scroll',level:'advanced',bg:'#eee1d7',ink:'#a37e60',
        short:'흐르는 글자가 스크롤 방향과 속도에 반응해요.',headline:'읽는 방향에 따라 바뀌는 리듬.',
        description:'반복 재생되는 글자 트랙의 timeScale을 스크롤 속도와 방향으로 바꿉니다. 아래로 스크롤하면 왼쪽으로, 위로 스크롤하면 오른쪽으로 흘러요.',
        use:'브랜드 슬로건, 크리에이티브 포트폴리오, 이벤트 배너',option:'timeScale + direction + getVelocity()',experiment:'✳ 기본 속도 0.8과 최대 가속값 3을 바꿔 분위기를 비교하세요.',
        flow:['반복되는 글자 트랙','스크롤 방향·속도에 따라 변화','멈추면 기본 속도로 유지'],skills:['반복 타임라인','스크롤 방향','속도 반응'],
        thumbnail:mini('marquee','<span>KEEP GOING ✳</span><span>KEEP GOING ✳</span><i>← →</i>'),
        html:view('22','A rhythm<br>of your own.',`${heading('A MOVING MANIFESTO','Keep your<br>ideas moving.')}<div class="marquee-window" aria-label="Keep going. Stay curious."><div class="marquee-track" aria-hidden="true"><span class="marquee-group">KEEP GOING ✳ STAY CURIOUS ✳&nbsp;</span><span class="marquee-group">KEEP GOING ✳ STAY CURIOUS ✳&nbsp;</span></div></div><p class="marquee-direction practice-status">← 아래로 스크롤</p><p>위아래로 스크롤하며 방향 변화를 확인하세요.</p>`,'marquee-scene'),
        css:css+`.marquee-scene { height: 130vh; background: #efe1d5; padding-inline: 0; }
.marquee-scene .practice-heading, .marquee-scene>p { padding-inline: 7%; }
.marquee-window { width: 100%; overflow: hidden; padding-block: 35px; margin-block: 40px; border-block: 1px solid #cbb09a; transform: rotate(-4deg); }
.marquee-track { display: flex; width: max-content; }
.marquee-group { flex-shrink: 0; white-space: nowrap; font-size: clamp(44px,9vw,90px); line-height: 1.2; letter-spacing: -3px; color: #9e7556; }
@media(prefers-reduced-motion:reduce) { .marquee-window { transform: none; } .marquee-group { font-size: 28px; letter-spacing: -1px; } }`,
        js:`const loop = gsap.fromTo(".marquee-track", { xPercent: 0 }, {
  xPercent: -50, duration: 14, repeat: -1, ease: "none",
  onReverseComplete() { this.totalTime(this.rawTime() + this.duration() * 100); }
}).totalTime(100);
let direction = 1;
const settle = gsap.delayedCall(0.2, () => {
  gsap.to(loop, { timeScale: direction * 0.8, duration: 0.5, overwrite: true });
}).pause();
ScrollTrigger.create({
  trigger: ".marquee-scene", start: "top bottom", end: "bottom top",
  onToggle: self => loop.paused(!self.isActive),
  onUpdate: self => {
    direction = self.direction;
    const speed = 0.8 + Math.min(3, Math.abs(self.getVelocity()) / 1000);
    gsap.to(loop, { timeScale: direction * speed, duration: 0.2, overwrite: true });
    document.querySelector(".marquee-direction").textContent = direction > 0 ? "← 아래로 스크롤" : "→ 위로 스크롤";
    settle.restart(true);
  }
});
return () => settle.kill();`
      },
      {
        id:'circular-gallery',title:'원형 갤러리',en:'Circular Gallery',category:'pin',level:'advanced',bg:'#e5e1ef',ink:'#8b7ba9',
        short:'카드들이 원을 따라 회전하며 컬렉션을 보여줘요.',headline:'직선에서 벗어난 컬렉션 탐색.',
        description:'원 위에 카드를 배치하고 전체 휠을 회전시킵니다. 카드 자체는 반대 방향으로 회전시켜 문구가 똑바로 보이게 유지해요.',
        use:'상품 컬렉션, 크리에이티브 작업 목록, 전시',option:'sin·cos 배치 + rotation 보정',experiment:'✳ radius를 휠 너비의 0.28배로 바꾸면 카드 사이가 어떻게 달라질까요?',
        flow:['원 위에 카드 배치','휠 회전 + 카드 방향 보정','한 번의 컬렉션 탐색 완료'],skills:['회전','화면 고정','반응형 위치 계산'],
        thumbnail:mini('circular','<div class="mini-wheel"><i>01</i><i>02</i><i>03</i><i>04</i></div><b>↻</b>'),
        html:view('23','Around the<br>collection.',`${heading('SIX OBJECTS / ONE COLLECTION','Around us.')}<div class="gallery-wheel">${Array.from({length:6},(_,i)=>`<article class="orbit-card"><div></div><span>OBJECT ${String(i+1).padStart(2,'0')}</span></article>`).join('')}<div class="wheel-center">THE<br>COLLECTION</div></div><p class="practice-status gallery-current">01 / 06</p>`,'circular-scene'),
        css:css+`.circular-scene { background: #e9e3f0; }
.gallery-wheel { width: min(75vw,420px); aspect-ratio: 1; position: relative; flex-shrink: 0; margin-block: 10px; border: 1px solid #c7b7da88; border-radius: 50%; }
.orbit-card { position: absolute; top: 50%; left: 50%; width: clamp(52px,10vw,92px); height: clamp(72px,13vw,115px); padding: 10px; border-radius: 4px; background: #c5b6d7; display: flex; flex-direction: column; justify-content: space-between; }
.orbit-card:nth-child(2n) { background: #b8c6b5; }.orbit-card:nth-child(3n) { background: #d8c0a9; }
.orbit-card>div { background: #f8f3e777; width: 70%; aspect-ratio: 1; margin: auto; border-radius: 50% 50% 0 0; }
.orbit-card span { font-size: 6px; letter-spacing: .5px; text-align: center; }
.wheel-center { position: absolute; inset: 40%; display: grid; place-items: center; text-align: center; font-size: 8px; line-height: 1.8; letter-spacing: 1px; }
@media(prefers-reduced-motion:reduce) { .gallery-wheel { width: 100%; aspect-ratio: auto; border: 0; display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; } .orbit-card { position: static; width: 100%; height: 130px; } .wheel-center { display: none; } }`,
        js:`const wheel = document.querySelector(".gallery-wheel");
const cards = gsap.utils.toArray(".orbit-card");
function positionCards() {
  const radius = wheel.clientWidth * 0.35;
  cards.forEach((card,index) => {
    const angle = index / cards.length * Math.PI * 2 - Math.PI / 2;
    gsap.set(card, { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius,
      xPercent: -50, yPercent: -50 });
  });
}
positionCards();
ScrollTrigger.addEventListener("refreshInit", positionCards);
const tl = gsap.timeline({ scrollTrigger: {
  trigger: ".circular-scene", start: "top top", end: "+=230%", pin: true, scrub: 1,
  onUpdate: self => {
    const index = Math.min(5, Math.floor(self.progress * 6)) + 1;
    document.querySelector(".gallery-current").textContent = String(index).padStart(2,"0") + " / 06";
  }
}});
tl.to(wheel, { rotation: -300, ease: "none" }, 0)
  .to(cards, { rotation: 300, ease: "none" }, 0)
  .to(".wheel-center", { rotation: 300, ease: "none" }, 0);
return () => ScrollTrigger.removeEventListener("refreshInit", positionCards);`
      },
      {
        id:'motion-path',title:'곡선 경로 이동',en:'Motion Along a Path',category:'pin',level:'advanced',bg:'#dce7e5',ink:'#608f86',
        short:'아이콘이 곡선을 따라 이동하며 진행 방향으로 회전해요.',headline:'경로 위에서 움직이는 작은 이야기.',
        description:'SVG 경로에 오브젝트를 정렬하고 스크롤로 이동시킵니다. 경로의 곡률에 맞춰 회전하므로 배송 과정이나 브랜드 여정을 표현할 때 유용해요.',
        use:'서비스 여정, 배송·제작 과정, 브랜드 이야기',option:'motionPath: { path, align, autoRotate }',experiment:'✳ autoRotate를 false로 바꾸면 아이콘의 움직임이 어떻게 달라질까요?',
        extraLibraries:['https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/MotionPathPlugin.min.js'],requires:['MotionPathPlugin'],
        flow:['출발점','곡선을 따라 이동·회전','목적지 도착'],skills:['SVG 경로','스크롤 진행률','오브젝트 정렬'],
        thumbnail:mini('motionpath','<svg viewBox="0 0 240 120"><path d="M15 90C75-15 150 140 220 25"/><g transform="translate(130 60) rotate(25)"><circle r="16"/><path d="m-6-5 12 5-12 5"/></g></svg>'),
        html:view('24','Follow your<br>own path.',`${heading('THE JOURNEY / FROM HERE TO THERE','Follow the possibility.')}<svg class="route-map" viewBox="0 0 600 300" role="img" aria-label="시작점에서 도착점까지 곡선을 따라 이동하는 아이콘"><path class="route" d="M40 230 C110 20 210 280 300 140 S460 40 560 70"/><g class="traveler" transform="translate(40 230)"><circle r="20"/><path d="M-7-7 8 0-7 7"/></g><text x="40" y="275">START</text><text x="510" y="115">ARRIVE</text></svg><p class="practice-status">YOUR OWN DIRECTION</p>`,'motionpath-scene'),
        css:css+`.motionpath-scene { background: #e0ebe7; }
.route-map { width: 100%; overflow: visible; margin-block: 20px; max-height: 55vh; }
.route { fill: none; stroke: #8daea3; stroke-width: 2; stroke-dasharray: 5 7; }
.traveler circle { fill: #5b8a7c; }.traveler path { fill: none; stroke: #f6f3dd; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.route-map text { font-size: 9px; letter-spacing: 2px; fill: #72998c; }`,
        js:`gsap.registerPlugin(MotionPathPlugin);
gsap.to(".traveler", {
  motionPath: {
    path: ".route", align: ".route", alignOrigin: [0.5, 0.5], autoRotate: true
  },
  ease: "none",
  scrollTrigger: { trigger: ".motionpath-scene", start: "top top", end: "+=190%", pin: true, scrub: 0.5 }
});`
      },
      {
        id:'svg-morph',title:'SVG 모핑',en:'Shape Morphing',category:'pin',level:'advanced',bg:'#e1e5cf',ink:'#81905d',
        short:'원이 나뭇잎으로, 나뭇잎이 새로운 심벌로 변해요.',headline:'형태를 바꾸며 전달하는 브랜드 메시지.',
        description:'SVG path를 다른 path의 형태로 변형합니다. 같은 화면 안에서 씨앗·잎·꽃을 연결해 브랜드가 자라는 이야기를 표현합니다.',
        use:'브랜드 심벌, 콘셉트 소개, 인포그래픽',option:'morphSVG: "#target-path"',experiment:'✳ 마지막 SVG 경로를 직접 그린 심벌로 바꿔보세요.',
        extraLibraries:['https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/MorphSVGPlugin.min.js'],requires:['MorphSVGPlugin'],
        flow:['씨앗 모양','잎으로 변형','꽃 모양의 심벌 완성'],skills:['SVG 경로 변형','타임라인','배경·색상 전환'],
        thumbnail:mini('morph','<span></span><i>→</i><span></span><i>→</i><span>✳</span>'),
        html:view('25','An idea<br>takes shape.',`${heading('SEED / LEAF / BLOOM','Made to grow.')}<svg class="morph-stage" viewBox="0 0 300 300" role="img" aria-label="씨앗에서 잎과 꽃으로 변하는 심벌"><path class="morph-shape" d="M150 65 C197 65 235 103 235 150 C235 197 197 235 150 235 C103 235 65 197 65 150 C65 103 103 65 150 65Z"/><path id="leaf-shape" d="M50 245 C30 130 105 40 250 45 C270 155 205 260 50 245Z" style="display:none"/><path id="bloom-shape" d="M150 85 C200 0 270 70 215 125 C310 140 280 240 200 210 C190 310 90 280 100 205 C5 240 -5 135 85 125 C35 35 120 0 150 85Z" style="display:none"/></svg><p class="morph-caption practice-status">SEED → LEAF → BLOOM</p>`,'morph-scene'),
        css:css+`.morph-scene { background: #e7ead7; }
.morph-stage { width: min(70%,330px); max-height: 55vh; overflow: visible; margin: 15px 0; }
.morph-shape { fill: #92a771; }`,
        js:`gsap.registerPlugin(MorphSVGPlugin);
const tl = gsap.timeline({ scrollTrigger: {
  trigger: ".morph-scene", start: "top top", end: "+=210%", pin: true, scrub: 1
}});
tl.to(".morph-shape", { morphSVG: "#leaf-shape", fill: "#6d947a", duration: 1, ease: "none" })
  .to(".morph-shape", { morphSVG: "#bloom-shape", fill: "#a092bc", duration: 1, ease: "none" }, ">0.3")
  .to({}, { duration: 0.35 });`
      },
      {
        id:'scatter-text',title:'글자 분해·재조립',en:'Scatter & Assemble',category:'pin',level:'intermediate',bg:'#e4e2f0',ink:'#7b77a4',
        short:'서로 다른 위치의 글자들이 모여 하나의 문장을 만들어요.',headline:'흩어진 생각이 하나의 메시지로.',
        description:'HTML에서 글자를 span으로 나누고 각각 다른 위치·각도·크기에서 시작합니다. 추가 텍스트 플러그인 없이 스크롤에 맞춰 정렬합니다.',
        use:'캠페인 슬로건, 크리에이티브 스튜디오, 이벤트 인트로',option:'글자별 x·y·rotation + stagger',experiment:'✳ x·y 이동 거리와 stagger의 from 값을 바꿔보세요.',
        flow:['글자가 흩어진 상태','중앙부터 차례로 모임','완성된 문장'],skills:['텍스트 리빌','순차 등장','회전·확대'],
        thumbnail:mini('scatter','<i>M</i><i>A</i><i>K</i><i>E</i><b>MAKE IT.</b>'),
        html:view('26','Let ideas<br>come together.',`${heading('A THOUGHT BECOMES A MESSAGE','Connect the pieces.')}<h2 class="scatter-title" aria-label="Make it matter.">${chars}</h2><p class="practice-status">SMALL PIECES. ONE BIG IDEA.</p>`,'scatter-scene'),
        css:css+`.scatter-scene { background: #e8e5f2; }
.scatter-title { font-size: clamp(28px,7vw,68px)!important; text-align: center; max-width: 100%; margin: 65px 0!important; }
.scatter-word { display: inline-block; white-space: nowrap; }.scatter-char { display: inline-block; color: #6c638e; }`,
        js:`gsap.fromTo(".scatter-char", {
  x: index => Math.sin(index * 2.4) * 180,
  y: index => Math.cos(index * 1.7) * 130,
  rotation: index => (index % 2 ? -1 : 1) * 90,
  scale: 0.25, opacity: 0
}, {
  x: 0, y: 0, rotation: 0, scale: 1, opacity: 1,
  stagger: { each: 0.04, from: "center" }, ease: "power2.out",
  scrollTrigger: { trigger: ".scatter-scene", start: "top top", end: "+=170%", pin: true, scrub: 1 }
});`
      },
      {
        id:'before-after',title:'비포·애프터 비교',en:'Before & After',category:'pin',level:'intermediate',bg:'#e6e6dc',ink:'#7e8970',
        short:'경계선을 움직이며 같은 공간의 두 스타일을 비교해요.',headline:'변화의 차이를 한 화면에서.',
        description:'같은 크기의 두 이미지를 겹친 뒤 위쪽 이미지의 보이는 영역을 넓힙니다. 예제는 CSS 공간 일러스트이며, 실제 적용할 때 같은 구도의 두 사진으로 교체하면 됩니다.',
        use:'인테리어 리모델링, 사진 보정, 디자인 개선 사례',option:'clipPath + 경계선 위치 + 진행률',experiment:'✳ AFTER 영역에 다른 색상 조합을 적용해 전후를 비교하세요.',
        flow:['변경 전 이미지','스크롤에 따라 경계 이동','변경 후 이미지'],skills:['이미지 마스크 리빌','스크롤 진행 표시','화면 고정'],
        thumbnail:mini('compare','<div><span>BEFORE</span><span>AFTER</span><i>↔</i></div>'),
        html:view('27','Same space.<br>A new feeling.',`${heading('SPACES / BEFORE & AFTER','A change in perspective.')}<div class="comparison-view"><div class="room before" role="img" aria-label="회색 톤의 변경 전 공간">${room}<span class="compare-label before-label">BEFORE</span></div><div class="room after" role="img" aria-label="따뜻한 색상의 변경 후 공간">${room}<span class="compare-label after-label">AFTER</span></div><div class="compare-divider" aria-hidden="true"><span>↔</span></div></div><p class="compare-progress practice-status" role="progressbar" aria-label="변경 후 이미지 표시 비율" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">AFTER 0%</p>`,'compare-scene'),
        css:css+`.compare-scene { background: #e8e8df; }
.comparison-view { position: relative; width: min(100%,640px); aspect-ratio: 4/3; max-height: 58vh; overflow: hidden; margin-top: 20px; border-radius: 4px; }
.room { position: absolute; inset: 0; background: linear-gradient(#d4d6cf 78%,#afb3a7 78%); }
.room-window { position: absolute; width: 26%; height: 48%; border-radius: 60px 60px 0 0; background: #e8e9e2; left: 12%; top: 17%; border: 5px solid #b3b8aa; }
.room-desk { position: absolute; left: 22%; right: 16%; height: 8%; top: 67%; background: #8f9788; box-shadow: 0 12px 0 #7f8779; }
.room-vase { position: absolute; width: 10%; height: 25%; border-radius: 40% 40% 15% 15%; background: #acb4a1; left: 59%; top: 42%; }
.room-art { position: absolute; width: 22%; height: 31%; right: 12%; top: 20%; border: 7px solid #aeb3a5; background: #c0c6b6; }
.after { background: linear-gradient(#e8d8c5 78%,#b49b7e 78%); }.after .room-window { background: #f5e6bf; border-color: #b48e69; }.after .room-desk { background: #9b7251; box-shadow: 0 12px 0 #7b5c43; }.after .room-vase { background: #718f6a; }.after .room-art { border-color: #ae8562; background: #b2c1a1; }
.compare-label { position: absolute; top: 15px; font-size: 8px; letter-spacing: 1px; background: #ffffffb0; padding: 5px 9px; border-radius: 3px; }.before-label { right: 15px; }.after-label { left: 15px; }
.compare-divider { position: absolute; top: 0; bottom: 0; left: 0; width: 2px; background: #f8f6ed; }
.compare-divider>span { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); background: #f8f6ed; color: #7c806f; width: 27px; height: 27px; border-radius: 50%; display: grid; place-items: center; }
@media(prefers-reduced-motion:reduce) { .after { clip-path: inset(0 0 0 50%); }.compare-divider { left: 50%; }.compare-progress { display: none; }.before-label { left: 15px; right: auto; }.after-label { right: 15px; left: auto; } }`,
        js:`const progress = { value: 0 };
const output = document.querySelector(".compare-progress");
const tl = gsap.timeline({ scrollTrigger: {
  trigger: ".compare-scene", start: "top top", end: "+=160%", pin: true, scrub: 0.6
}});
tl.fromTo(".after", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }, 0)
  .to(".compare-divider", { left: "100%", ease: "none" }, 0)
  .to(progress, { value: 100, ease: "none", onUpdate: () => {
    const value = Math.round(progress.value);
    output.textContent = "AFTER " + value + "%";
    output.setAttribute("aria-valuenow", value);
  } }, 0);`
      },
      {
        id:'scroll-accordion',title:'스크롤 아코디언',en:'Scroll Accordion',category:'pin',level:'intermediate',bg:'#e1e5d8',ink:'#7b8e65',
        short:'설명이 순서대로 펼쳐지고 옆의 대표 비주얼도 바뀌어요.',headline:'한 번에 하나의 특징에 집중해요.',
        description:'스크롤로 설명 영역을 접고 펼치며 같은 단계의 비주얼을 교체합니다. 세 가지 기능을 한 화면에서 소개하는 구성으로, 클릭 없이 스크롤로 진행합니다.',
        use:'서비스 기능, 제품 특징, 업무 프로세스 소개',option:'height: 0 ↔ auto + 비주얼 교체',experiment:'✳ 설명 문구를 길게 바꿔도 높이가 자연스럽게 계산되는지 확인하세요.',
        flow:['첫 번째 기능','다음 설명 확장 + 비주얼 교체','세 번째 기능 완성'],skills:['화면 고정 스토리','순차 전환','요소 높이 제어'],
        thumbnail:mini('accordion','<div><span>01 — Discover</span><span>02 — Connect<br><small>A little more detail.</small></span><span>03 — Create</span></div><i></i>'),
        html:view('28','One thing<br>at a time.',`<div class="feature-copy"><span class="practice-kicker">THREE WAYS TO CREATE</span><h2>Considered<br>at every step.</h2>${['Discover','Connect','Create'].map((title,i)=>`<article class="feature-step"><h3>0${i+1} / ${title}</h3><div class="feature-body"><p>${['작은 질문에서 시작해 사용자의 일상을 관찰합니다.','발견한 생각을 연결하고 새로운 가능성을 구체화합니다.','아이디어를 실제로 경험할 수 있는 형태로 완성합니다.'][i]}</p></div></article>`).join('')}</div><div class="feature-visuals">${['FORM','COLOUR','SPACE'].map(title=>`<div class="feature-visual"><div></div><span>${title}</span></div>`).join('')}</div>`,'accordion-scene'),
        css:css+`.accordion-scene { flex-direction: row; gap: 7%; background: #e4e9dc; }
.feature-copy { width: 48%; }.feature-copy h2 { font-size: clamp(25px,4vw,43px); margin-bottom: 25px; }
.feature-step { border-top: 1px solid #bbc7ac; padding-block: 10px; }.feature-step h3 { font-size: 12px; font-weight: 400; margin: 0; }.feature-body { overflow: hidden; }.feature-body p { font-size: 11px; color: #829373; margin: 10px 0 0; }
.feature-visuals { width: 45%; height: 310px; position: relative; }
.feature-visual { position: absolute; inset: 0; border-radius: 5px; background: #bdcba9; display: grid; place-items: center; padding: 25px; }
.feature-visual:nth-child(2) { background: #cbbba6; }.feature-visual:nth-child(3) { background: #a8bfc2; }
.feature-visual>div { width: min(65%,150px); max-height: 180px; aspect-ratio: 1/1.3; border-radius: 50% 50% 3% 3%; background: #f9f5e777; }.feature-visual:nth-child(2)>div { border-radius: 50%; }.feature-visual:nth-child(3)>div { border-radius: 4px; transform: rotate(15deg); }
.feature-visual>span { font-size: 8px; letter-spacing: 2px; }
@media(max-width:480px) { .accordion-scene { gap: 5%; }.feature-copy h2 { font-size: 24px; }.feature-visuals { height: 240px; }.feature-step h3 { font-size: 10px; }.feature-body p { font-size: 10px; } }
@media(prefers-reduced-motion:reduce) { .accordion-scene { flex-direction: column; gap: 30px; }.feature-copy,.feature-visuals { width: 100%; }.feature-visuals { height: auto; }.feature-visual { position: relative; height: 220px; margin-bottom: 15px; } }`,
        js:`const bodies = gsap.utils.toArray(".feature-body");
const visuals = gsap.utils.toArray(".feature-visual");
gsap.set(bodies.slice(1), { height: 0, autoAlpha: 0 });
gsap.set(visuals.slice(1), { autoAlpha: 0, scale: 0.9 });
const tl = gsap.timeline({ scrollTrigger: {
  trigger: ".accordion-scene", start: "top top", end: "+=220%", pin: true, scrub: 1
}});
bodies.slice(1).forEach((body,index) => {
  const at = index * 1.3 + 0.4;
  tl.to(bodies[index], { height: 0, autoAlpha: 0, duration: 0.6 }, at)
    .to(body, { height: "auto", autoAlpha: 1, duration: 0.6 }, at)
    .to(visuals[index], { autoAlpha: 0, scale: 1.08, duration: 0.6 }, at)
    .to(visuals[index+1], { autoAlpha: 1, scale: 1, duration: 0.6 }, at);
});
tl.to({}, { duration: 0.5 });`
      },
      {
        id:'curtain-transition',title:'커튼형 장면 전환',en:'Opening Curtains',category:'pin',level:'intermediate',bg:'#e9ddd6',ink:'#a47d68',
        short:'화면이 양옆으로 열리며 다음 장면을 드러내요.',headline:'새로운 장면을 여는 스크롤.',
        description:'앞의 두 패널을 서로 반대 방향으로 밀어내고 뒤의 콘텐츠를 보여줍니다. 섹션을 고정해 장면 전환이 끝난 뒤 다음 내용으로 이어집니다.',
        use:'프로젝트 인트로, 브랜드 챕터 전환, 캠페인 공개',option:'좌우 패널 xPercent: -100 / 100',experiment:'✳ 두 패널의 duration을 다르게 설정하면 어떤 분위기가 생길까요?',
        flow:['닫힌 커튼과 첫 메시지','양쪽 패널 이동','뒤의 장면과 새 메시지 공개'],skills:['좌우 슬라이드','화면 고정','텍스트 전환'],
        thumbnail:mini('curtain','<span>OPEN</span><span>THE VIEW</span><i>← →</i>'),
        html:view('29','A new<br>chapter awaits.',`<div class="curtain-world"><div class="world-orb"></div><div class="curtain-new"><span class="practice-kicker">CHAPTER TWO / NEW POSSIBILITIES</span><h2>A world<br>of possibilities.</h2><p>다음 이야기가 시작되는 순간.</p></div></div><div class="curtain-panel curtain-left"></div><div class="curtain-panel curtain-right"></div><div class="curtain-old"><span class="practice-kicker">SCROLL TO OPEN</span><h2>Behind<br>the scenes.</h2></div>`,'curtain-scene'),
        css:css+`.curtain-scene { padding: 0; background: #d4e1e3; }
.curtain-world { position: absolute; inset: 0; background: #d4e1e3; overflow: hidden; }
.world-orb { position: absolute; width: 55%; aspect-ratio: 1; border-radius: 50%; background: #a1bfc2; top: 12%; right: -12%; }
.curtain-new,.curtain-old { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; padding: 9%; }
.curtain-new h2,.curtain-old h2 { font-size: clamp(35px,7vw,70px); }
.curtain-panel { position: absolute; top: 0; bottom: 0; width: 50%; background: #c5a18b; }.curtain-left { left: 0; border-right: 1px solid #eed5bd66; }.curtain-right { right: 0; }
.curtain-old { color: #fbf5e9; text-align: center; }
@media(prefers-reduced-motion:reduce) { .curtain-panel,.curtain-old { display: none; }.curtain-world { position: relative; width: 100%; min-height: 75vh; } }`,
        js:`gsap.set(".curtain-new", { autoAlpha: 0, y: 35 });
const tl = gsap.timeline({ scrollTrigger: {
  trigger: ".curtain-scene", start: "top top", end: "+=180%", pin: true, scrub: 1
}});
tl.to(".curtain-old", { autoAlpha: 0, y: -25, duration: 0.4 }, 0)
  .to(".curtain-left", { xPercent: -100, duration: 1.3, ease: "power2.inOut" }, 0.1)
  .to(".curtain-right", { xPercent: 100, duration: 1.3, ease: "power2.inOut" }, 0.1)
  .to(".curtain-new", { autoAlpha: 1, y: 0, duration: 0.6 }, 0.9)
  .to({}, { duration: 0.35 });`
      },
      {
        id:'opposing-gallery',title:'양방향 갤러리',en:'Opposing Columns',category:'pin',level:'intermediate',bg:'#e0e3ea',ink:'#7b88a0',
        short:'여러 열의 이미지가 서로 다른 방향과 속도로 움직여요.',headline:'하나의 스크롤, 여러 방향의 흐름.',
        description:'넘치는 길이를 열마다 계산해 홀수 열은 위로, 짝수 열은 아래로 이동시킵니다. 모바일에서는 두 열로 줄여 콘텐츠 크기를 유지합니다.',
        use:'포트폴리오 작업 모음, 무드보드, 제품 컬렉션',option:'열별 이동 거리 × 방향 × 속도 비율',experiment:'✳ 세 번째 열의 속도 비율을 0.7에서 1로 바꿔보세요.',
        flow:['이미지 열 배치','열마다 다른 방향으로 이동','컬렉션의 새로운 조합'],skills:['패럴랙스','화면 고정','반응형 거리 계산'],
        thumbnail:mini('opposing','<div><span>↑</span><span></span><span></span></div><div><span>↓</span><span></span><span></span></div><div><span>↑</span><span></span><span></span></div>'),
        html:view('30','Different directions.<br>Shared curiosity.',`${heading('THE VISUAL COLLECTION','Different directions.')}<div class="columns-window">${Array.from({length:3},(_,col)=>`<div class="gallery-column">${Array.from({length:5},(_,row)=>`<article class="gallery-tile"><div></div><span>OBJECT ${String(col*5+row+1).padStart(2,'0')}</span></article>`).join('')}</div>`).join('')}</div><p class="practice-status">ONE SCROLL. MANY PERSPECTIVES.</p>`,'opposing-scene'),
        css:css+`.opposing-scene { background: #e3e7ee; }
.columns-window { width: 100%; height: 58vh; min-height: 190px; overflow: hidden; display: flex; gap: 14px; margin: 20px 0 5px; border-radius: 4px; }
.gallery-column { flex: 1; min-width: 0; height: max-content; display: grid; gap: 14px; }
.gallery-tile { height: 180px; padding: 18px; background: #bec8d8; display: flex; flex-direction: column; justify-content: space-between; border-radius: 3px; }.gallery-tile:nth-child(2n) { background: #ced5bd; }.gallery-column:nth-child(2) .gallery-tile { background: #d4bfae; }.gallery-column:nth-child(3) .gallery-tile { background: #b4c8c5; }
.gallery-tile>div { width: 70%; aspect-ratio: 1; max-height: 110px; margin: auto; background: #ffffff66; border-radius: 50% 50% 3% 3%; }.gallery-tile:nth-child(2n)>div { border-radius: 50%; }.gallery-tile span { font-size: 7px; letter-spacing: 1px; }
@media(max-width:480px) { .columns-window { gap: 10px; }.gallery-column { gap: 10px; }.gallery-column:nth-child(3) { display: none; }.gallery-tile { height: 150px; padding: 14px; } }
@media(prefers-reduced-motion:reduce) { .columns-window { height: auto; overflow: visible; }.gallery-tile { height: 150px; } }`,
        js:`const viewport = document.querySelector(".columns-window");
const columns = gsap.utils.toArray(".gallery-column");
const distance = column => Math.max(0, column.scrollHeight - viewport.clientHeight);
const tl = gsap.timeline({ scrollTrigger: {
  trigger: ".opposing-scene", start: "top top", end: "+=210%", pin: true, scrub: 1,
  invalidateOnRefresh: true
}});
columns.forEach((column,index) => {
  const backwards = index % 2 === 1;
  const ratio = index === 2 ? 0.7 : 1;
  tl.fromTo(column, {
    y: () => backwards ? -distance(column) * ratio : 0
  }, {
    y: () => backwards ? 0 : -distance(column) * ratio, ease: "none"
  }, 0);
});`
      }
    ].map(demo=>({...demo,stage:'practice'}));
  }
  if(typeof module!=='undefined'&&module.exports) module.exports=createPractice;
  else root.ScrollLabPractice=createPractice;
})(typeof window!=='undefined'?window:globalThis);
