gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  const progress = { value: 0 };
  const output = document.querySelector(".compare-progress");
  const tl = gsap.timeline({ scrollTrigger: {
    trigger: ".compare-scene", start: "top top", end: "+=160%", pin: true, scrub: 0.6
  }});
  tl.fromTo(".after", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }, 0)
    .to(".compare-divider", { left: "100%", ease: "none" }, 0)
    .to(progress, { value: 100, ease: "none", onUpdate: () => {
      const value = Math.round(progress.value);
      output.textContent = "AFTER " + value + "%";
      output.setAttribute("aria-valuenow", value);
    } }, 0);
});
