gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.registerPlugin(MotionPathPlugin);
  gsap.to(".traveler", {
    motionPath: {
      path: ".route", align: ".route", alignOrigin: [0.5, 0.5], autoRotate: true
    },
    ease: "none",
    scrollTrigger: { trigger: ".motionpath-scene", start: "top top", end: "+=190%", pin: true, scrub: 0.5 }
  });
});
