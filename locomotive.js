gsap.registerPlugin(ScrollTrigger);

export function initializeLocomotiveJS() {
  if (document.body.offsetWidth <= 1025) return;

  const scrollContainer = document.querySelector("[data-scroll-container]");
  if (!scrollContainer) {
    console.error("Scroll container not found!");
    return;
  }

  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    multiplier: 1,
    lerp: 0.1,
    smoothMobile: true,
    getDirection: true,
    getSpeed: true,
  });

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

  function connectLocoToGsapScroll() {
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

  connectLocoToGsapScroll();

  function scrollToZoom(scroll) {
    let timeoutId,
      isScrolling = true;

    const webContainer = document.querySelector("body");

    const basicMaterial = {
      transformOrigin: "center center",
      duration: 0.4,
    };

    scroll.on("scroll", () => {
      if (isScrolling) {
        gsap.to(webContainer, {
          scale: 1.04,
          ...basicMaterial,
        });

        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        gsap.to(webContainer, {
          scale: 1,
          ...basicMaterial,
        });
      }, 50);
    });
  }
  scrollToZoom(scroll);

  function detectUpDownScroll(scroll) {
    let isScrollDirectionUp = true;

    const navBar = document.querySelector("#nav-bar");

    scroll.on("scroll", (scrollInfo) => {
      const scrollDirection = scrollInfo.direction;

      // && isScrollDirectionUp to remove the repeatations
      if (scrollDirection === "down" && isScrollDirectionUp) {
        gsap.to(navBar, { y: "-100%" });

        isScrollDirectionUp = false;
      } else if (scrollDirection === "up" && !isScrollDirectionUp) {
        gsap.to(navBar, { y: 0 });

        isScrollDirectionUp = true;
      }
    });
  }
  detectUpDownScroll(scroll);
}
