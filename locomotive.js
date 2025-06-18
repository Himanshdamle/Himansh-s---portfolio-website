export function initializeLocomotiveJS() {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    multiplier: 1.5,
    lerp: 0.1,
    smoothMobile: true,
    getDirection: true,
    getSpeed: true,
  });
}
