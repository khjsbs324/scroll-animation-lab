gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.fromTo(".scatter-char", {
    x: index => Math.sin(index * 2.4) * 180,
    y: index => Math.cos(index * 1.7) * 130,
    rotation: index => (index % 2 ? -1 : 1) * 90,
    scale: 0.25, opacity: 0
  }, {
    x: 0, y: 0, rotation: 0, scale: 1, opacity: 1,
    stagger: { each: 0.04, from: "center" }, ease: "power2.out",
    scrollTrigger: { trigger: ".scatter-scene", start: "top top", end: "+=170%", pin: true, scrub: 1 }
  });
});
