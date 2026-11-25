gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.set(".expand-copy", { autoAlpha: 0, y: 30 });
  const tl = gsap.timeline({
    scrollTrigger: { trigger: ".expand-scene", start: "top top", end: "+=160%", pin: true, scrub: 1 }
  });
  tl.to(".expand-window", { width: "100%", height: "100%", borderRadius: 0, duration: 1.5, ease: "none" })
    .to(".expand-copy", { autoAlpha: 1, y: 0, duration: 0.6 }, ">0.15")
    .to({}, { duration: 0.4 });
});
