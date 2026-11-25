gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.from(".item", {
    y: 70,
    opacity: 0,
    duration: 0.8,
    stagger: 0.18,   // 각 카드가 0.18초 간격으로 시작
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".cards",
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });
});
