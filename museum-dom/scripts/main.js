export function main() {

  import('./swiper-min.js').then(obj => {
    obj.swiper();

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
      spaceBetween: 42,
      breakpoints: {
        // when window width is >= 300px
        300: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        // when window width is >= 769px
        769: {
          slidesPerView: 3,
          spaceBetween: 42
        },
      },
      loop: true,
      simulateTouch: false,
      on: {
        slideChange: function() {
          for (let i of this.slides) {
            i.firstElementChild.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}','*');
          }
          video.src = `assets/video/video${this.realIndex}.mp4`;
          video.poster = `assets/video/poster${this.realIndex}.avif`;
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
  });
  
  // Popup handling
  buyBtn.addEventListener('click', _ => {
    popup.style.visibility = 'visible';
    popup.style.opacity = 1;
    popupContent.classList.add('open');
  });

  const closePopup = _ => {
    popupContent.classList.remove('open');
    setTimeout(function() {
      popup.style.opacity = 0;
      setTimeout(function() { popup.style.visibility = 'hidden'; }, 500);
    }, 200);
  }

  popup.addEventListener('click', function(e) {
    if (e.target == this || e.target.id == 'btnClose') closePopup();
  });

  // Virtual tour hadling
  document.addEventListener('click', e => {
    switch(e.target.id) {
      case 'tour1': {
        localStorage.setItem('tourURL', JSON.stringify('https://www.google.com/maps/embed?pb=!4v1632721730817!6m8!1m7!1sCAoSLEFGMVFpcE9WeFpRdVN5M0J4OVRfSHBIXzdGdEJIRFRYdkk2U0YtQTEwb2NU!2m2!1d48.86181593314584!2d2.336681797486702!3f81.55!4f-16.599999999999994!5f0.7820865974627469'));
        break;
      }
      case 'tour2': {
        localStorage.setItem('tourURL', JSON.stringify('https://www.google.com/maps/embed?pb=!4v1632723093915!6m8!1m7!1sCAoSLEFGMVFpcE1aOVlnbkFyYndFSWJUREFOZVNRWUZ1OWdOcXBXXzJTdjhGQnZZ!2m2!1d48.8606881835717!2d2.335679134426641!3f328.36!4f-2.450000000000003!5f0.4000000000000002'));
        break;
      }
      case 'tour3': {
        localStorage.setItem('tourURL', JSON.stringify('https://www.google.com/maps/embed?pb=!4v1632723182591!6m8!1m7!1sCAoSLEFGMVFpcE5Sal9Dd1A0Y29ETVlkQ0hqNnFIZUJlSnBJMlZ4VTVCVXNPWDRG!2m2!1d48.8563254!2d2.3352706!3f0!4f0!5f0.7820865974627469'));
        break;
      }
      case 'tour4': {
        localStorage.setItem('tourURL', JSON.stringify('https://www.google.com/maps/embed?pb=!4v1632723247062!6m8!1m7!1sCAoSLEFGMVFpcE5NWkdRdUVBLXBBVXZJR19lUF8yZjNnV1RLWkVKNlhMVkotUGdi!2m2!1d48.8601723!2d2.3395439!3f322.04!4f-5.75!5f0.440292882915489'));
        break;
      }
      case 'tour5': {
        localStorage.setItem('tourURL', JSON.stringify('https://www.google.com/maps/embed?pb=!4v1632723345016!6m8!1m7!1sCAoSLEFGMVFpcFA3dUZablRJVFJlLTdBRVZBZ0hBZnFpQ0wtMDNndkJIY1lXZ0Yz!2m2!1d48.86018303140322!2d2.335615591987402!3f177.69!4f5.609999999999999!5f0.4000000000000002'));
        break;
      }
      case 'tour6': {
        localStorage.setItem('tourURL', JSON.stringify('https://www.google.com/maps/embed?pb=!4v1632723423861!6m8!1m7!1sCAoSLEFGMVFpcE8xd2tVVWJ5enBQamotT1IwbVI1ZXRaSlQteGwtNDBYSzhyRFEz!2m2!1d48.85987877384653!2d2.335515730085149!3f7.53!4f4!5f0.5970117501821992'));
        break;
      }
      case 'tour7': {
        localStorage.setItem('tourURL', JSON.stringify('https://www.google.com/maps/embed?pb=!4v1632723478680!6m8!1m7!1sCAoSLEFGMVFpcFBwR0Fvd1lhdFZ5azNNTUduWkFhUWtZbTJFVWstRGxjYTA2U1M1!2m2!1d48.8563254!2d2.3352706!3f21.26!4f-10.090000000000003!5f0.4000000000000002'));
        break;
      }
      default: break;
    }
  });

  // ripple effect for the button 'Book'
  bookBtn.addEventListener('click', function (e) {

    const circle = document.createElement('span');
    circle.className = 'circle';

    circle.style.top = `${e.offsetY}px`;
    circle.style.left = `${e.offsetX}px`;

    this.appendChild(circle);

    setTimeout(() => circle.remove(), 500);
  });
  
  // add map
  mapboxgl.accessToken = 'pk.eyJ1IjoidmFkemltYmEiLCJhIjoiY2t1aTdnNTB3MGp4ZzJvb3pvMWx0NWcwayJ9.t8pFSafWsERcOYoF8EOwzQ';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: [2.3363, 48.86095], // starting position [lng, lat]
    zoom: 15.75 // starting zoom
  });
  map.addControl(new mapboxgl.NavigationControl());
  new mapboxgl.Marker({color: "#222"}).setLngLat([2.3364, 48.86091]).addTo(map);
  new mapboxgl.Marker({color: "#777"}).setLngLat([2.3333, 48.8602]).addTo(map);
  new mapboxgl.Marker({color: "#777"}).setLngLat([2.3397, 48.8607]).addTo(map);
  new mapboxgl.Marker({color: "#777"}).setLngLat([2.3330, 48.8619]).addTo(map);
  new mapboxgl.Marker({color: "#777"}).setLngLat([2.3365, 48.8625]).addTo(map);
  
  // console.log(`
  //   PS: все изображения на странице и favicon, кроме иконок, пережаты в новейший формат avif для минимизации трафика и времени загрузки страницы.
  //   Этот формат поддерживает актуальная версия google chrome. По заданию сайт должен проверяться на последней версии chrome. Так что противоречий нет.
  //   Если у вас есть проблемы с отображением картинок, то установите себе последнюю версию chrome.
  // `);
}