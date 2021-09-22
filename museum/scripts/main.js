// Initialize swiper
new Swiper('.swiper-container', {
  pagination: {
    el: '.swip-ctrl-pag',
    type: 'bullets',
    bulletClass: 'swip-ctrl-pag__bullet',
    bulletActiveClass: 'swip-ctrl-pag__bullet--active',
    clickable: true,
  },
  navigation: {
    nextEl: '.swip-ctrl-btns__next',
    prevEl: '.swip-ctrl-btns__prev',
  },
  loop: true,
  on: {
    slideChange: function() {
      swipFracCurr.textContent = `0${this.realIndex + 1}`;
    }
  },
});