export function popImage(idObject = {}, setting = {}) {
  if (document.body.offsetWidth <= 1025) return;

  const nameWrapper = document.querySelector(`#${idObject.hoveringLayer}`);
  const imgBox = document.querySelector(`#${idObject.imgBox}`);
  const rightSlider = document.querySelector(`#${idObject.slider}`);

  // make it visible
  gsap.set(imgBox, { display: "block" });

  const hideSettings = {
    scale: 0,
    opacity: 0,
    filter: "blur(10px)",
  };

  const imgWidth = imgBox.getBoundingClientRect().width + setting.gap || 10;

  gsap.set(imgBox, {
    ...hideSettings,
  });

  gsap.set(rightSlider, { xPercent: setting.xPercentInitial || 50 });

  nameWrapper.addEventListener("mouseenter", () => {
    gsap.to(imgBox, {
      scale: 1,
      filter: "blur(0px)",
      opacity: 1,
      ease: "back.out(1.7)",
      duration: 0.4,
    });

    gsap.to(rightSlider, {
      x: imgWidth,
      duration: 0.4,
    });
  });

  nameWrapper.addEventListener("mouseleave", () => {
    gsap.to(imgBox, {
      ...hideSettings,
      duration: 0.4,
    });

    gsap.to(rightSlider, {
      x: 0,
      duration: 0.4,
    });
  });
}

export function cardTiltAnimation(card, hoveringLayer, setting) {
  hoveringLayer.addEventListener("mousemove", (e) => {
    const bounds = hoveringLayer.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;

    const offsetX = e.clientX - centerX;
    const offsetY = e.clientY - centerY;

    gsap.to(card, {
      rotateX: -offsetY / setting.xSensi,
      rotateY: offsetX / setting.ySensi,
      duration: setting.duration || 0.4,
      ease: setting.ease || "power2.out",

      transformPerspective: 800,
      transformOrigin: "center",
    });
  });
}

export function hoverToExpandTxt(hoveringLayer, boldTxt, setting = {}) {
  const commonSetting = {
    duration: setting.duration || 0.5,
    ease: setting.ease || "power1.in",
  };

  hoveringLayer.addEventListener("mouseenter", () => {
    gsap.to(boldTxt, {
      x: setting.expand || 4,
      ...commonSetting,
    });
  });

  hoveringLayer.addEventListener("mouseleave", () => {
    gsap.to(boldTxt, {
      x: 0,
      ...commonSetting,
    });
  });
}

export function rapidChangeEffect(hoveringLayer, multipleImage, intervalTime) {
  const starLen = multipleImage.length;

  let count = 0,
    intervalId;

  hoveringLayer.addEventListener("mouseenter", () => {
    intervalId = setInterval(() => {
      multipleImage[count].classList.add("hidden");
      multipleImage[count + 1].classList.remove("hidden");

      if (count === starLen - 2) {
        multipleImage[0].classList.remove("hidden");
        multipleImage[count + 1].classList.add("hidden");

        count = 0;
      } else count++;
    }, intervalTime || 300);
  });

  hoveringLayer.addEventListener("mouseleave", () => {
    clearInterval(intervalId);
  });
}

function move3DText() {
  if (document.body.offsetWidth <= 1025) return;

  const container = document.querySelector("#landing-page-section");

  const grp1Txt = document.querySelectorAll(".move-txt-grp1");
  const grp2Txt = document.querySelectorAll(".move-txt-grp2");

  function directionX(axis, index) {
    if (axis >= 50) {
      return `${5 + (index - 3) * 2}%`;
    } else return `${5 - index * 2}%`;
  }
  function directionY(axis, index) {
    if (axis >= 50) {
      return `${5 - index * 95}%`;
    } else return `-${index * 105}%`;
  }

  container.addEventListener("mousemove", (e) => {
    const xAxis = (e.x / container.offsetWidth) * 100;
    const yAxis = (e.y / container.offsetHeight) * 100;

    grp1Txt.forEach((txt, index) => {
      const motion = {
        x: directionX(xAxis, index, 2),
        y: directionY(yAxis, index, 95),
        delay: index * 0.04,
        duration: 0.5,
        ease: "sine.out",
      };

      gsap.to("#name-container", {
        x: xAxis / 10,
        y: yAxis / 10,
        duration: 0.5,
        ease: "power4.out",
      });

      gsap.to(txt, { ...motion });

      gsap.to(grp2Txt[index], { ...motion });
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
  const marquees = document.querySelectorAll(".animate-marquee");
  const marqueeWrapper = document.querySelector("#marquee-wrapper");

  const marqueesContent = document.querySelectorAll(".marquee-content");

  const skillsImgDisplays = document.querySelectorAll(".skills-img-display");

  function removeOpacity() {
    marqueesContent.forEach((marqueeContent) => {
      gsap.to(marqueeContent, {
        opacity: 1,
        duration: 0.3,
      });
    });
  }

  let hoveredSkillIndex = 0;

  marquees.forEach((marquee) => {
    marquee.addEventListener(
      "mousemove",
      (e) => {
        const target = e.target;
        const targetedMarquee = target.closest(".marquee-content");

        removeOpacity();

        gsap.to(skillsImgDisplays[hoveredSkillIndex], {
          rotateX: 0,
          rotateY: 0,
          duration: 0.4,
          ease: "power2.out",
        });

        if (!targetedMarquee) return;

        if (!targetedMarquee.classList.contains("marquee-content")) return;

        // BACKGROUND COLOR CHANGE
        gsap.to(marqueeWrapper, {
          backgroundColor: `${targetedMarquee.getAttribute("data-bg-color")}3d`,
          duration: 0.3,
        });

        // FOCUS
        marqueesContent.forEach((marqueeContent, index) => {
          if (marqueeContent == targetedMarquee) {
            hoveredSkillIndex = index;

            const bounds = marqueeContent.getBoundingClientRect();
            const centerX = bounds.left + bounds.width / 2;
            const centerY = bounds.top + bounds.height / 2;

            const offsetX = e.clientX - centerX;
            const offsetY = e.clientY - centerY;

            gsap.to(skillsImgDisplays[hoveredSkillIndex], {
              rotateX: -offsetY / 2,
              rotateY: offsetX / 3,
              duration: 0.4,
              ease: "power2.out",
              transformPerspective: 800,
              transformOrigin: "center",
            });

            return;
          }

          gsap.to(marqueeContent, {
            opacity: 0.3,
            duration: 0.3,
          });
        });
      },
      true
    );
  });

  marqueeWrapper.addEventListener("mouseleave", () => {
    removeOpacity();

    gsap.to(skillsImgDisplays[hoveredSkillIndex], {
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
      ease: "power2.out",
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
