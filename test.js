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

loop(".ia-web", {
  delay: 0,

  onCompleteAnimation() {
    gsap.to("#ia-web-wrapper", {
      y: "100%",
      duration: 1,
      ease: "expo.in", // add ease here

      onComplete() {
        gsap.to("#ia-container", {
          x: "30%",
          y: "150%",
          duration: 1,
          ease: "expo.out", // and here
        });
      },
    });
  },
});
