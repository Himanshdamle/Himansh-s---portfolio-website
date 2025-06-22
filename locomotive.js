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

  document.querySelectorAll(["data-scroll-to"]).forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = link.getAttribute("href");
      const targetElem = document.querySelector(targetId);

      if (!targetElem) return;

      scroll.scrollTo(targetElem);
    });
  });
}
