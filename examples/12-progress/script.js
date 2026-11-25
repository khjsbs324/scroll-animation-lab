gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.fromTo(".reading-progress, .bar-fill", {
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
  });
});
