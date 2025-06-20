import {
  popImage,
  cardTiltAnimation,
  hoverToExpandTxt,
  rapidChangeEffect,
} from "./animation.js";
import { initializeLocomotiveJS } from "./locomotive.js";

initializeLocomotiveJS();

popImage(
  {
    hoveringLayer: "name-wrapper",
    imgBox: "himansh-image-box",
    slider: "img-right-side-box",
  },
  { xPercentInitial: -53, gap: 30 }
);

popImage(
  {
    hoveringLayer: "desktop-showcase-wrapper",
    imgBox: "himansh-desktop-box",
    slider: "desktop-right-slider",
  },
  { xPercentInitial: -50, gap: 10 }
);

const sensi = document.body.offsetWidth / 120;

cardTiltAnimation(
  document.querySelector("#himansh-img"),
  document.querySelector("#name-wrapper"),
  { xSensi: sensi, ySensi: sensi }
);

cardTiltAnimation(
  document.querySelector("#himansh-desktop"),
  document.querySelector("#desktop-showcase-wrapper"),
  { xSensi: sensi, ySensi: sensi }
);

hoverToExpandTxt(
  document.querySelector("#core-skills-section"),
  document.querySelector("#cs-bold-txt")
);
hoverToExpandTxt(
  document.querySelector("#about-me-section"),
  document.querySelector("#about-me-bold-txt"),
  { expand: 3 }
);

rapidChangeEffect(
  document.querySelector("#core-skills-section"),
  document.querySelectorAll(".stars")
);
rapidChangeEffect(
  document.querySelector("#about-me-section"),
  document.querySelectorAll(".question-mark")
);

rapidChangeEffect(
  document.querySelector("#top-scroll-box"),
  document.querySelectorAll(".up-arrows")
);
hoverToExpandTxt(
  document.querySelector("#top-scroll-box"),
  document.querySelector("#top-scroll-bold-txt"),
  { expand: 4 }
);

rapidChangeEffect(
  document.querySelector("#bottom-scroll-box"),
  document.querySelectorAll(".arrows-down")
);
hoverToExpandTxt(
  document.querySelector("#bottom-scroll-box"),
  document.querySelector("#bottom-scroll-bold-txt"),
  { expand: 4 }
);
