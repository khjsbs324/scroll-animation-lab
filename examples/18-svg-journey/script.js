gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  const path = document.querySelector(".draw-path");
  const length = path.getTotalLength();
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
  gsap.set(".journey-stop", { autoAlpha: 0 });
  const tl = gsap.timeline({ scrollTrigger: {
    trigger: ".journey-scene", start: "top 65%", end: "bottom 70%", scrub: 0.6
  }});
  tl.to(path, { strokeDashoffset: 0, duration: 1, ease: "none" }, 0)
    .to(".stop-one", { autoAlpha: 1, duration: 0.15 }, 0)
    .to(".stop-two", { autoAlpha: 1, duration: 0.15 }, 0.45)
    .to(".stop-three", { autoAlpha: 1, duration: 0.15 }, 0.85);
});
