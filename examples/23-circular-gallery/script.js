gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  const wheel = document.querySelector(".gallery-wheel");
  const cards = gsap.utils.toArray(".orbit-card");
  function positionCards() {
    const radius = wheel.clientWidth * 0.35;
    cards.forEach((card,index) => {
      const angle = index / cards.length * Math.PI * 2 - Math.PI / 2;
      gsap.set(card, { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius,
        xPercent: -50, yPercent: -50 });
    });
  }
  positionCards();
  ScrollTrigger.addEventListener("refreshInit", positionCards);
  const tl = gsap.timeline({ scrollTrigger: {
    trigger: ".circular-scene", start: "top top", end: "+=230%", pin: true, scrub: 1,
    onUpdate: self => {
      const index = Math.min(5, Math.floor(self.progress * 6)) + 1;
      document.querySelector(".gallery-current").textContent = String(index).padStart(2,"0") + " / 06";
    }
  }});
  tl.to(wheel, { rotation: -300, ease: "none" }, 0)
    .to(cards, { rotation: 300, ease: "none" }, 0)
    .to(".wheel-center", { rotation: 300, ease: "none" }, 0);
  return () => ScrollTrigger.removeEventListener("refreshInit", positionCards);
});
