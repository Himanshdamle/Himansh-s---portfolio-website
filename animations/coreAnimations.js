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
