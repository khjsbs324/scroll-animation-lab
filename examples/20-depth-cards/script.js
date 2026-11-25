gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  const cards = gsap.utils.toArray(".depth-card");
  cards.forEach((card,index) => {
    gsap.set(card, { z: -700 - index * 180, rotationY: 45 - index * 35, y: 80 });
  });
  gsap.to(cards, {
    z: 0, rotationY: 0, y: 0, stagger: 0.2, duration: 1, ease: "none",
    scrollTrigger: { trigger: ".depth-scene", start: "top top", end: "+=190%", pin: true, scrub: 1 }
  });
});
