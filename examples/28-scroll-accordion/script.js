gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  const bodies = gsap.utils.toArray(".feature-body");
  const visuals = gsap.utils.toArray(".feature-visual");
  gsap.set(bodies.slice(1), { height: 0, autoAlpha: 0 });
  gsap.set(visuals.slice(1), { autoAlpha: 0, scale: 0.9 });
  const tl = gsap.timeline({ scrollTrigger: {
    trigger: ".accordion-scene", start: "top top", end: "+=220%", pin: true, scrub: 1
  }});
  bodies.slice(1).forEach((body,index) => {
    const at = index * 1.3 + 0.4;
    tl.to(bodies[index], { height: 0, autoAlpha: 0, duration: 0.6 }, at)
      .to(body, { height: "auto", autoAlpha: 1, duration: 0.6 }, at)
      .to(visuals[index], { autoAlpha: 0, scale: 1.08, duration: 0.6 }, at)
      .to(visuals[index+1], { autoAlpha: 1, scale: 1, duration: 0.6 }, at);
  });
  tl.to({}, { duration: 0.5 });
});
