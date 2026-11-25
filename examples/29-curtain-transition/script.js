gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.set(".curtain-new", { autoAlpha: 0, y: 35 });
  const tl = gsap.timeline({ scrollTrigger: {
    trigger: ".curtain-scene", start: "top top", end: "+=180%", pin: true, scrub: 1
  }});
  tl.to(".curtain-old", { autoAlpha: 0, y: -25, duration: 0.4 }, 0)
    .to(".curtain-left", { xPercent: -100, duration: 1.3, ease: "power2.inOut" }, 0.1)
    .to(".curtain-right", { xPercent: 100, duration: 1.3, ease: "power2.inOut" }, 0.1)
    .to(".curtain-new", { autoAlpha: 1, y: 0, duration: 0.6 }, 0.9)
    .to({}, { duration: 0.35 });
});
