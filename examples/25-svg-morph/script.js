gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.registerPlugin(MorphSVGPlugin);
  const tl = gsap.timeline({ scrollTrigger: {
    trigger: ".morph-scene", start: "top top", end: "+=210%", pin: true, scrub: 1
  }});
  tl.to(".morph-shape", { morphSVG: "#leaf-shape", fill: "#6d947a", duration: 1, ease: "none" })
    .to(".morph-shape", { morphSVG: "#bloom-shape", fill: "#a092bc", duration: 1, ease: "none" }, ">0.3")
    .to({}, { duration: 0.35 });
});
