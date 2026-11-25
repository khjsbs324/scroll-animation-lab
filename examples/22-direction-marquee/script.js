gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  const loop = gsap.fromTo(".marquee-track", { xPercent: 0 }, {
    xPercent: -50, duration: 14, repeat: -1, ease: "none",
    onReverseComplete() { this.totalTime(this.rawTime() + this.duration() * 100); }
  }).totalTime(100);
  let direction = 1;
  const settle = gsap.delayedCall(0.2, () => {
    gsap.to(loop, { timeScale: direction * 0.8, duration: 0.5, overwrite: true });
  }).pause();
  ScrollTrigger.create({
    trigger: ".marquee-scene", start: "top bottom", end: "bottom top",
    onToggle: self => loop.paused(!self.isActive),
    onUpdate: self => {
      direction = self.direction;
      const speed = 0.8 + Math.min(3, Math.abs(self.getVelocity()) / 1000);
      gsap.to(loop, { timeScale: direction * speed, duration: 0.2, overwrite: true });
      document.querySelector(".marquee-direction").textContent = direction > 0 ? "← 아래로 스크롤" : "→ 위로 스크롤";
      settle.restart(true);
    }
  });
  return () => settle.kill();
});
