import { smoothInnOutTransition } from "./animations/coreAnimations.js";

function goFullScreen() {
  const elem = document.documentElement;

  const fullScreenButton = document.querySelector("#full-screen-btn");

  let svgSrc, modeName;

  fullScreenButton.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => console.error(err));

      svgSrc = "assets/minimize.svg";
      modeName = "Minimize";
    } else {
      document.exitFullscreen();

      svgSrc = "assets/full_screen.svg";
      modeName = "Full Screen";
    }

    function onCompleteTransition() {
      fullScreenButton.querySelector("#full-screen-svg").src = svgSrc;

      fullScreenButton.querySelector("#txt").textContent = modeName;

      smoothInnOutTransition(
        {
          el: fullScreenButton,
          duration: 0.3,
        },
        false,
        "flex"
      );
    }

    smoothInnOutTransition(
      {
        el: fullScreenButton,
        duration: 0.3,
        scale: 1.3,
        onCompleteTransition,
      },
      true
    );
  });
}

goFullScreen();
