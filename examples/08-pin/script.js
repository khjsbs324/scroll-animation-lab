gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  // 고정할 부모 자체가 아닌, 안쪽 콘텐츠를 움직입니다.
  gsap.set(".second", { autoAlpha: 0, y: 40 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".pin-scene",
      start: "top top",
      end: "+=160%", // 화면 높이의 160%만큼 스크롤하는 동안 고정
      pin: true,
      scrub: 1
    }
  });

  tl.to(".product", { rotation: -12, duration: 1 })
    .to(".first", { autoAlpha: 0, y: -40, duration: 0.5 }, 0.5)
    .to(".second", { autoAlpha: 1, y: 0, duration: 0.5 }, 0.8)
    .to({}, { duration: 0.4 }); // 마지막 문장을 읽을 여유
});
