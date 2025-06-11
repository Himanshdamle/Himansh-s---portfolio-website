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

function hoverToExpand() {
  const txtSection = document.querySelector("#core-skills-section");
  const boldTxt = document.querySelector("#cs-bold-txt");

  const commonSetting = { duration: 0.5 };

  txtSection.addEventListener("mouseenter", () => {
    gsap.to(boldTxt, {
      x: 4,
      ...commonSetting,
      ease: "power1.in",
    });
  });

  txtSection.addEventListener("mouseleave", () => {
    gsap.to(boldTxt, {
      x: 0,
      ...commonSetting,
      ease: "power1.out",
    });
  });
}
hoverToExpand();

function changeStars() {
  const stars = document.querySelectorAll(".stars");
  const hoverLayer = document.querySelector("#core-skills-section");

  const starLen = stars.length;

  let count = 0,
    intervalId;

  hoverLayer.addEventListener("mouseenter", () => {
    intervalId = setInterval(() => {
      stars[count].classList.add("hidden");
      stars[count + 1].classList.remove("hidden");

      console.log(count, count + 1);
      if (count === starLen - 2) {
        stars[0].classList.remove("hidden");
        stars[count + 1].classList.add("hidden");

        count = 0;
      } else count++;

      // count === starLen - 2 ? (count = 0) : count++;
    }, 300);
  });

  hoverLayer.addEventListener("mouseleave", () => {
    clearInterval(intervalId);
  });
}
changeStars();

function animateMarquee() {
  const marquees = document.querySelectorAll(".animate-marquee");

  marquees.forEach((marquee) => {
    gsap.to(marquee, {
      x: "-106%",
      duration: 10,
      ease: "none",
      repeat: -1,
    });
  });
}
animateMarquee();
