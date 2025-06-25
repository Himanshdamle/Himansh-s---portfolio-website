const letterWrapper = document.querySelector("#letter-container");

const basicMaterial = {
  transformOrigin: "top center",
  duration: 0.4,
  ease: "power2.inout",
};

letterWrapper.addEventListener(
  "mouseenter",
  (e) => {
    const target = e.target;

    if (target === letterWrapper) return;

    gsap.to(target, {
      scaleY: 1.5,
      ...basicMaterial,
    });
  },
  true
);

letterWrapper.addEventListener(
  "mouseleave",
  (e) => {
    const target = e.target;

    if (target === letterWrapper) return;

    gsap.to(target, {
      scaleY: 1,
      ...basicMaterial,
    });
  },
  true
);
