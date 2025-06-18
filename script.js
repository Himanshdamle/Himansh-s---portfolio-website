import { popImage, cardTiltAnimation } from "./animation.js";
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

cardTiltAnimation(
  document.querySelector("#himansh-img"),
  document.querySelector("#name-wrapper"),
  { xSensi: 10, ySensi: 10 }
);

cardTiltAnimation(
  document.querySelector("#himansh-desktop"),
  document.querySelector("#desktop-showcase-wrapper"),
  { xSensi: 10, ySensi: 10 }
);
