gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.from(".poster", {
    y: 60,           // 시작 위치: 아래로 60px
    opacity: 0,      // 시작 투명도
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".scene", // 움직이지 않는 부모를 기준으로 측정
      start: "top 70%",
      toggleActions: "play none none reverse"
    }
  });
});
