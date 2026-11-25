gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  const tl = gsap.timeline({
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
    .to(".front", { y: -170, ease: "none" }, 0);
});
