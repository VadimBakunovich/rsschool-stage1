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

  //Up-btn handling
  document.onscroll = _ => {
    if (scrollY > 999) upBtn.classList.add('show');
    else upBtn.classList.remove('show');
  }
  console.log(`
  Результаты самооценки:
  1.Слайдер в секции Welcome +24
  2.Слайдер в секции Video +19
    Не реализовано: проигрывание видео останавливается, если кликнуть по другому слайду или кнопке Play в центре другого слайда.
    В указанной ситуации другое видео должно запуститься, а текущее остановиться. Невозможно проигрывание нескольких YouTube видео одновременно.
  3.Кастомный видеоплеер +36
  4.Слайдер сравнения изображений в секции Explore +10
  5.Анимация при прокрутке изображений в секции Galery +8
  6.Калькулятор продажи билетов в секции Tiсkets +10
  7.Калькулятор продажи билетов в форме продажи билетов +14
  8.Валидация формы +16
  9.Интерактивная карта в секции Contacts +12
  10.Дополнительный функционал: + 10
    В функционал видеоплеера добавлена поддержка следующих горячих клавиш из YouTube (+4 балла):
    'k' - приостановить или продолжить воспроизведение;
    'j' - перемотать ролик на 10 секунд назад;
    'l' - перемотать ролик на 10 секунд вперед;
    ',' - перейти к предыдущему кадру (когда воспроизведение приостановлено);
    '.' - перейти к следующему кадру (когда воспроизведение приостановлено);
    '0..9' - перейти к определенному моменту видео (например, при нажатии на цифру '7' ролик будет перемотан
              до временной отметки, которая соответствует 70% от длительности видео);
    '↑' - увеличить громкость;
    '↓' - уменьшить громкость;
    '←' - перемотать видео на 5 сек. назад;
    '→' - перемотать видео на 5 сек. вперед;
    Также в функционал видеоплеера добавлены (+4 балла):
    - отображение в полупрозрачном оверлее текущей громкости и др. параметров, при их изменении;
    - 'умное' управление громкостью как в YouTube;
    - 'умное' исчезновение курсора и панели управления в режиме fullscreen;
    - полноэкранный режим, а также выход из него по двойному щелчку мыши по видео.
    Добавлена кнопка прокрутки страницы вверх, которая выглядит и работает так же, как и в оригинальном сайте музея Лувр (+3 балла).
    Итого: 159 баллов.
    Весь функционал тщательно проверен в соответствии с видеопримером кроссчека задания museum-dom.
    Если у вас будут какие-либо вопросы к работе приложения прошу связаться со мной в дискорде: VadimBakunovich#0228. Заранее благодарен!
    PS: все изображения на странице и favicon, кроме иконок, пережаты в новейший формат avif для минимизации трафика и времени загрузки страницы.
    Этот формат поддерживает актуальная версия google chrome. По заданию сайт должен проверяться на последней версии chrome. Так что противоречий нет.
    Если у вас есть проблемы с отображением картинок, то установите себе последнюю версию chrome.
  `);
}