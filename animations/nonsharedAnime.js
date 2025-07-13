import {
  cardTiltAnimation,
  changeCursorShape,
  addCursorText,
} from "./coreAnimations.js";

function move3DText() {
  if (document.body.offsetWidth <= 1025) return;

  const container = document.querySelector("#landing-page-section");

  const grp1Txt = document.querySelectorAll(".move-txt-grp1");
  const grp2Txt = document.querySelectorAll(".move-txt-grp2");

  function directionX(axis, index) {
    // (direction shift value) + {- for -xAxis direction} (index) * gap b/w letters

    if (axis >= 50) return `${5 + index * 2}%`;
    else return `${5 - index * 2}%`;
  }
  function directionY(axis, index) {
    if (axis >= 50) return `${5 - index * 95}%`;
    else return `-${index * 105}%`;
  }

  container.addEventListener("mousemove", (e) => {
    const xAxis = (e.x / container.offsetWidth) * 100;
    const yAxis = (e.y / container.offsetHeight) * 100;

    grp1Txt.forEach((txt, index) => {
      const motion = {
        x: directionX(xAxis, index),
        y: directionY(yAxis, index),
        delay: index * 0.04,
        duration: 0.5,
        ease: "sine.out",
      };

      gsap.to(txt, { ...motion });
      gsap.to(grp2Txt[index], { ...motion });
    });

    gsap.to("#name-container", {
      x: xAxis / 10,
      y: yAxis / 10,
      duration: 0.5,
      ease: "power4.out",
    });
  });
}
move3DText();

function animateMarquee() {
  const marquees = document.querySelectorAll(".animate-marquee");
  const marqueeWrapper = document.querySelector("#marquee-wrapper");

  const animations = [];

  marquees.forEach((marquee) => {
    const animation = gsap.to(marquee, {
      x: "-106%",
      duration: 10,
      ease: "none",
      repeat: -1,
    });

    animations.push(animation);
  });

  marqueeWrapper.addEventListener("mouseenter", () => {
    animations.forEach((animation) => animation.timeScale(-0.5));
  });

  marqueeWrapper.addEventListener("mouseleave", () => {
    animations.forEach((animation) => animation.timeScale(1));
  });
}
animateMarquee();

function changeMarqueeBG() {
  const marqueeWrapper = document.querySelector("#marquee-wrapper");

  const marqueesContent = document.querySelectorAll(".marquee-content");

  function removeOpacity() {
    marqueesContent.forEach((marqueeContent) => {
      gsap.to(marqueeContent, {
        opacity: 1,
        duration: 0.3,
      });
    });
  }

  function changeBG(targetedMarquee, marqueeWrapper) {
    const colourHexCode = targetedMarquee.getAttribute("data-bg-color");
    gsap.to(marqueeWrapper, {
      backgroundColor: `${colourHexCode}3d`,
      duration: 0.3,
    });
  }

  function removeTilt(card) {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  }

  const sensitivityTilt = document.body.offsetWidth / 400;

  marqueesContent.forEach((marqueeContent) => {
    marqueeContent.addEventListener("mouseenter", (e) => {
      const target = e.target;

      marqueesContent.forEach((marqueeContent) => {
        switch (true) {
          case target === marqueeContent:
            changeBG(target, marqueeWrapper);

            gsap.to(marqueeContent, {
              opacity: 1,
              duration: 0.3,
            });

            const card = target.querySelector(".skills-img-display");
            cardTiltAnimation(card, target, {
              addEventListener: true,
              xSensi: sensitivityTilt,
              ySensi: sensitivityTilt,
            });
            break;

          default:
            gsap.to(marqueeContent, {
              opacity: 0.3,
              duration: 0.3,
            });
            break;
        }
      });
    });

    marqueeContent.addEventListener("mouseleave", (e) => {
      const target = e.target;
      removeOpacity();
      removeTilt(target.querySelector(".skills-img-display"));
    });
  });
}
changeMarqueeBG();

function loop(selector = "", setting = {}) {
  const t = gsap.timeline({ ease: "none" });

  t.to(selector, {
    y: "-100%",
    duration: 0.9,
    delay: setting.delay || 0.1,
  })
    .set(selector, { y: 0 })
    .to(selector, {
      y: 0,
      duration: 0.9,
      onComplete() {
        if (setting.onCompleteAnimation) setting.onCompleteAnimation();
      },
    });
}
loop(".ia-grp-box-1", {});
loop(".ia-grp-box-2", { delay: 0.2 });
loop(".ia-grp-box-3", { delay: 0.3 });

loop(".ia-web", { delay: 0 });

function hoverToSeeScrollbar() {
  const scrollBarContainer = document.querySelector(
    "#custom-scroll-bar-container"
  );

  const basicSetting = {
    duration: 0.2,
    ease: "none",
  };

  scrollBarContainer.addEventListener("mouseenter", () => {
    gsap.to(scrollBarContainer, {
      opacity: 1,
      ...basicSetting,
    });
  });

  scrollBarContainer.addEventListener("mouseleave", () => {
    gsap.to(scrollBarContainer, {
      opacity: 0,
      ...basicSetting,
    });
  });
}
hoverToSeeScrollbar();

function showISTTime() {
  const timeElem = document.querySelector("#show-time");

  const options = {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat("en-IN", options);

  function changeTime() {
    const timeString = formatter.format(new Date());

    timeElem.textContent = timeString;
  }

  changeTime();
  setInterval(changeTime, 1000);
}
showISTTime();

function textGradientEffect() {
  const txt = document.querySelector("#india-txt");
  const hoveringLayer = document.querySelector("#timing-box");

  let tween;

  hoveringLayer.addEventListener("mouseenter", () => {
    txt.style["-webkit-text-fill-color"] = "transparent";
    tween = gsap.to(txt, {
      backgroundPosition: "100% 100%",
      backgroundSize: "100%",
      duration: 0.5,
    });
  });

  hoveringLayer.addEventListener("mouseleave", () => {
    if (tween) tween.kill();
    gsap.to(txt, {
      backgroundPosition: "50% 0%",
      backgroundSize: "400%",
      duration: 0.5,
      onComplete() {
        txt.style["-webkit-text-fill-color"] = "unset";
      },
    });
  });
}
textGradientEffect();

function scrollTriggerAboutMeSection() {
  const scrollTrigger = {
    trigger: "#about-me-section",
    start: "top center",
    end: "20px 80%",
  };

  gsap.to("#seprate-line-abt-sec", {
    width: "100%",
    ease: "power2.in",
    duration: 0.8,

    scrollTrigger,
  });

  gsap.to(".highlight-animation-st", {
    x: 0,
    ease: "power2.in",
    duration: 0.8,

    scrollTrigger,
  });

  gsap.to("#zoom-out-st", {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,

    ease: "power2.out",
    duration: 0.8,

    scrollTrigger,
  });
}
scrollTriggerAboutMeSection();

function cursor() {
  const cursor = document.querySelector("#cursor");
  const webContainer = document.querySelector("#web-container");

  webContainer.addEventListener("mousemove", (e) => {
    const cursorRect = cursor.getBoundingClientRect();

    let xAxis;
    if (e.x + cursorRect.width > window.innerHeight)
      xAxis = e.x - cursorRect.width;
    else xAxis = e.x;

    gsap.to(cursor, {
      x: xAxis,
      y: e.y - 5,
      duration: 0.2,
    });
  });
}
cursor();

function label(elementId = "", label = "") {
  const element = document.querySelector(`${elementId}`);
  const labelLenght = label.length;

  const boxWidth = labelLenght >= 8 ? labelLenght - 2 : labelLenght;

  element.addEventListener("mouseenter", (e) => {
    addCursorText(label);
    changeCursorShape(true, {
      duration: 0.5,
      width: `${boxWidth * 0.7}vw`,
      transformOrigin: "left",
      ease: "power2.out",
    });
  });

  element.addEventListener("mouseleave", () => {
    addCursorText("");
    changeCursorShape(false, {
      duration: 0.5,
    });
  });
}

label("#about-me-btn", "About me section");
label("#project-btn", "Project section");
label("#top-scroll-box", "Top");
label("#bottom-scroll-box", "Bottom");

label("#timing-box", "Bhilai, Chhattisgarh");
