gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  const track = document.querySelector(".story-track");
  const viewport = document.querySelector(".horizontal-story-scene");
  const distance = () => track.scrollWidth - viewport.clientWidth;
  const horizontalTween = gsap.to(track, {
    x: () => -distance(), ease: "none",
    scrollTrigger: { trigger: viewport, start: "top top", end: () => "+=" + distance(),
      pin: true, scrub: 1, invalidateOnRefresh: true }
  });
  // 첫 패널은 그대로 표시하고, 이후 패널의 내부 요소를 움직입니다.
  gsap.utils.toArray(".story-panel").slice(1).forEach(panel => {
    gsap.from(panel.querySelector("h2"), {
      y: 80, opacity: 0, ease: "none",
      scrollTrigger: { trigger: panel, containerAnimation: horizontalTween,
        start: "left 85%", end: "left 25%", scrub: true }
    });
    gsap.from(panel.querySelector(".panel-shape"), {
      rotation: -100, scale: 0.4, ease: "none",
      scrollTrigger: { trigger: panel, containerAnimation: horizontalTween,
        start: "left 95%", end: "left 20%", scrub: true }
    });
  });
});
