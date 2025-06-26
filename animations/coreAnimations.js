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
  function animate(e) {
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
  }

  if (setting.addEventListener)
    hoveringLayer.addEventListener("mousemove", animate);
  else animate(setting.e);
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

export function strechLettersOnHover(letterWrapperId, setting = {}) {
  const letterWrapper = document.querySelector(`#${letterWrapperId}`);

  const basicMaterial = {
    transformOrigin: setting.transformOrigin || "top",
    duration: setting.duration || 0.3,
    ease: setting.ease || "power2.inOut",
  };

  letterWrapper.addEventListener(
    "mouseenter",
    (e) => {
      const target = e.target;

      if (target === letterWrapper) return;

      gsap.to(target, {
        scaleY: setting.streching || 1.3,
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
        scaleY: setting.defaultStrech || 1,
        ...basicMaterial,
      });
    },
    true
  );
}

/**
 * Animates smooth in/out transitions for elements using GSAP.
 */
export function smoothInnOutTransition(gsapSettings, play, currentDisplay) {
  const body = document.body;
  const bodyOverflow = window.getComputedStyle(body).overflow;

  const animeTarget =
    gsapSettings.el || document.querySelector(gsapSettings.el);

  console.log(animeTarget);

  if (play) {
    gsap.set(body, { overflow: "hidden" });

    gsap.to(animeTarget, {
      filter: `blur(${gsapSettings.blur || 10}px)`,
      scale: gsapSettings.scale || 1.1,
      opacity: 0,
      delay: gsapSettings.delay || 0,
      duration: gsapSettings.duration || 0.3,
      ease: gsapSettings.ease || "none",
      onComplete() {
        gsap.set(gsapSettings.el, { display: "none" });
        gsap.set(body, { overflow: bodyOverflow });
        if (gsapSettings.onCompleteTransition)
          gsapSettings.onCompleteTransition();
      },
    });
  } else {
    gsap.set(animeTarget, {
      display: currentDisplay || "block",
      filter: `blur(${gsapSettings.blur || 10}px)`,
      scale: gsapSettings.scale || 1.1,
    });
    gsap.set(body, { overflow: "hidden" });

    gsap.to(animeTarget, {
      filter: "blur(0px)",
      scale: 1,
      opacity: gsapSettings.opacity || 1,
      ease: gsapSettings.ease,
      duration: gsapSettings.duration,
      onComplete() {
        gsap.set(body, { overflow: bodyOverflow });

        if (gsapSettings.onCompleteTransition)
          gsapSettings.onCompleteTransition();
      },
    });
  }
}
