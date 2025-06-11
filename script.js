import { popImage } from "./animation.js";

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
