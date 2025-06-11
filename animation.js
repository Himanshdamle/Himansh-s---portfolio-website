export function popImage(idObject = {}, setting = {}) {
  const nameWrapper = document.querySelector(`#${idObject.hoveringLayer}`);
  const imgBox = document.querySelector(`#${idObject.imgBox}`);
  const rightSlider = document.querySelector(`#${idObject.slider}`);

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

function move3DText() {
  const container = document.body;

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

function changeChar() {
  const movingComma = document.querySelector("#comma");

  console.log(movingComma);
}

changeChar();
