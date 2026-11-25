gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.fromTo(".poster", {
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
  });
});
