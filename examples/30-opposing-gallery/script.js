gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  const viewport = document.querySelector(".columns-window");
  const columns = gsap.utils.toArray(".gallery-column");
  const distance = column => Math.max(0, column.scrollHeight - viewport.clientHeight);
  const tl = gsap.timeline({ scrollTrigger: {
    trigger: ".opposing-scene", start: "top top", end: "+=210%", pin: true, scrub: 1,
    invalidateOnRefresh: true
  }});
  columns.forEach((column,index) => {
    const backwards = index % 2 === 1;
    const ratio = index === 2 ? 0.7 : 1;
    tl.fromTo(column, {
      y: () => backwards ? -distance(column) * ratio : 0
    }, {
      y: () => backwards ? 0 : -distance(column) * ratio, ease: "none"
    }, 0);
  });
});
