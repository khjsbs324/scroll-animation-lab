gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".split-layout",
      start: "top 75%",
      toggleActions: "play none none reverse"
    }
  });

  tl.from(".visual", {
    x: -80, opacity: 0, duration: 1, ease: "power2.out"
  })
  .from(".story", {
    x: 80, opacity: 0, duration: 1, ease: "power2.out"
  }, "<0.15"); // 앞 애니메이션 시작 0.15초 뒤에 재생
});
