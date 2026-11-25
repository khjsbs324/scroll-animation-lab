gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  const cards = gsap.utils.toArray(".stack-card");
  gsap.set(cards, { position: "absolute", top: 0, left: 0 });
  gsap.set(cards.slice(1), { yPercent: 125 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".stack-scene",
      start: "top top",
      end: "+=220%",
      pin: true,
      scrub: 1
    }
  });

  cards.slice(1).forEach((card, index) => {
    tl.to(cards[index], { scale: 0.92, y: -16, duration: 1 })
      .to(card, { yPercent: 0, duration: 1 }, "<");
  });
  tl.to({}, { duration: 0.3 });
});
