gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  const chapters = gsap.utils.toArray(".product-chapter");
  gsap.set(chapters.slice(1), { autoAlpha: 0, y: 35 });
  gsap.set(".story-meter i", { scaleX: 0 });
  const tl = gsap.timeline({ scrollTrigger: {
    trigger: ".product-scene", start: "top top", end: "+=240%", pin: true, scrub: 1
  }});
  tl.addLabel("balance", 0.5)
    .to(chapters[0], { autoAlpha: 0, y: -35, duration: 0.4 }, "balance")
    .to(chapters[1], { autoAlpha: 1, y: 0, duration: 0.4 }, "balance+=0.3")
    .to(".tea-tin", { rotation: -14, scale: 1.12, duration: 0.7 }, "balance")
    .to(".product-scene", { backgroundColor: "#e9ddcc", duration: 0.7 }, "balance")
    .addLabel("ritual", 1.7)
    .to(chapters[1], { autoAlpha: 0, y: -35, duration: 0.4 }, "ritual")
    .to(chapters[2], { autoAlpha: 1, y: 0, duration: 0.4 }, "ritual+=0.3")
    .to(".tea-tin", { rotation: 10, scale: 1, duration: 0.7 }, "ritual")
    .to(".product-scene", { backgroundColor: "#d7e4e1", duration: 0.7 }, "ritual")
    .to({}, { duration: 0.5 });
  tl.to(".story-meter i", { scaleX: 1, duration: tl.duration(), ease: "none" }, 0);
});
