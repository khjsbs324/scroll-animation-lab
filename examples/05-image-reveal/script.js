gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.fromTo(".image-wrap", {
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
  });
});
