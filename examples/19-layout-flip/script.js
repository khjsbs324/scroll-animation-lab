gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.registerPlugin(Flip);
  const layout = document.querySelector(".flip-layout");
  const art = document.querySelector(".flip-art");
  // refreshInit에서 이전 상태로 되돌리고 새 화면 너비로 다시 측정합니다.
  let flipTween;
  function measureLayout() {
    if (flipTween) flipTween.kill();
    gsap.set(art, { clearProps: "transform,width,height" });
    layout.classList.remove("expanded");
    const state = Flip.getState(art);
    layout.classList.add("expanded");
    flipTween = Flip.from(state, { duration: 1, ease: "none", paused: true });
  }
  measureLayout();
  ScrollTrigger.addEventListener("refreshInit", measureLayout);
  ScrollTrigger.create({
    trigger: ".flip-scene", start: "top top", end: "+=150%", pin: true,
    onUpdate: self => flipTween.progress(self.progress),
    onRefresh: self => flipTween.progress(self.progress)
  });
  return () => {
    ScrollTrigger.removeEventListener("refreshInit", measureLayout);
    flipTween.kill();
    layout.classList.remove("expanded");
    art.removeAttribute("style");
  };
});
