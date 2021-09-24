// Initialize swiper in welcome section
new Swiper('.welcome__swiper', {
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
  grabCursor: true,
  on: {
    slideChange: function() {
      swipFracCurr.textContent = `0${this.realIndex + 1}`;
    }
  },
});

// Initialize before-after slider
new BeerSlider(document.getElementById('slider'));

// Initialize swiper in video section
new Swiper('.video__swiper', {
  pagination: {
    el: '.video-swp-ctrl-pag',
    type: 'bullets',
    bulletClass: 'video-swp-ctrl-pag__bullet',
    bulletActiveClass: 'video-swp-ctrl-pag__bullet--active',
    clickable: true,
  },
  navigation: {
    nextEl: '.video-swp-ctrl__next',
    prevEl: '.video-swp-ctrl__prev',
  },
  slidesPerView: 3,
  loop: true,
  simulateTouch: false,
  spaceBetween: 42,
  on: {
    slideChange: function() {
      video.src = `assets/video/video${this.realIndex}.mp4`;
      video.poster = `assets/video/poster${this.realIndex}.jpg`;
      video.currentTime = 0;
      progress.value = 0;
      progress.style.background = `
        linear-gradient(to right, #710707 0%, #710707 0%, #c4c4c4 0%, #c4c4c4 100%)`;
      if (video.paused) {
        playBtn.className = 'play';
        playBtnBig.className = 'big-play';
      } else {
        playBtn.className = 'play pause';
        playBtnBig.className = 'big-play hidden';
      }
    }
  },
});