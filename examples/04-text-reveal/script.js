gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.from(".line span", {
    yPercent: 110,  // 각 줄의 높이보다 아래에서 시작
    duration: 1.1,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".headline",
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });
});
