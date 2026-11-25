gsap.registerPlugin(ScrollTrigger);

// 운영체제에서 '동작 줄이기'를 설정했다면 정적인 콘텐츠를 보여줍니다.
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  const number = { value: 0 };
  const output = document.querySelector(".count");

  gsap.to(number, {
    value: 120,    // 목표 숫자
    duration: 2,
    ease: "power2.out",
    snap: { value: 1 }, // 소수점 없이 정수로
    onUpdate: () => {
      output.textContent = number.value.toLocaleString("ko-KR");
    },
    scrollTrigger: {
      trigger: ".stat",
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });
});
