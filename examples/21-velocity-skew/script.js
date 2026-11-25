gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  const clamp = gsap.utils.clamp(-12, 12);
  const skew = gsap.quickTo(".velocity-art", "skewY", { duration: 0.35, ease: "power3.out" });
  const status = document.querySelector(".velocity-status");
  const settle = gsap.delayedCall(0.16, () => {
    skew(0);
    status.textContent = "AT REST";
  }).pause();
  ScrollTrigger.create({
    trigger: ".velocity-scene", start: "top bottom", end: "bottom top",
    onUpdate: self => {
      const velocity = self.getVelocity(); // px/초, 위로 움직이면 음수
      skew(clamp(-velocity / 350));
      status.textContent = "SPEED " + Math.round(Math.abs(velocity)) + " PX/S";
      settle.restart(true); // 마지막 스크롤로부터 0.16초 뒤에 복원
    }
  });
  return () => settle.kill();
});
