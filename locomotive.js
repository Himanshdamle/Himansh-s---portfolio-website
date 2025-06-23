gsap.registerPlugin(ScrollTrigger);

export function initializeLocomotiveJS() {
  const scrollContainer = document.querySelector("[data-scroll-container]");
  if (!scrollContainer) {
    console.error("Scroll container not found!");
    return;
  }

  const scroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    multiplier: 1.5,
    lerp: 0.1,
    smoothMobile: true,
    getDirection: true,
    getSpeed: true,
  });

  // Fix your selector here too
  document.querySelectorAll("[data-scroll-to]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        scroll.scrollTo(targetElem);
      }
    });
  });

  // ScrollerProxy setup
  ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
      return arguments.length
        ? scroll.scrollTo(value, 0, 0)
        : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: scrollContainer.style.transform ? "transform" : "fixed",
  });

  scroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.addEventListener("refresh", () => scroll.update());
  ScrollTrigger.refresh();
}
