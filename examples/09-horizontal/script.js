gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  const track = document.querySelector(".track");
  const viewport = document.querySelector(".horizontal-scene");
  const distance = () => track.scrollWidth - viewport.clientWidth;

  gsap.to(track, {
    x: () => -distance(), // 화면 밖으로 넘친 너비만큼 이동
    ease: "none",
    scrollTrigger: {
      trigger: viewport,
      start: "top top",
      end: () => "+=" + distance(),
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true // 화면 크기가 바뀌면 거리 재계산
    }
  });
});
