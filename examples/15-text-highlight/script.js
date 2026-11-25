gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.fromTo(".reading-copy h2 span", {
    color: "#c9c3b7"
  }, {
    color: "#493f30",
    stagger: 0.25,
    duration: 0.4,
    ease: "none",
    scrollTrigger: {
      trigger: ".reading-scene", start: "top top", end: "+=170%", pin: true, scrub: 0.5
    }
  });
});
