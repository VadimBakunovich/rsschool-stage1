// const elements = document.querySelectorAll(".lazyframe");
// lazyframe(elements);

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
    setTimeout(function() { popup.style.visibility = 'hidden'; }, 600);
  }, 300);
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

console.log(`
Результаты самопроверки:
1. Вёрстка валидная +10
2. Вёрстка семантическая. В коде страницы присутствуют следующие элементы (указано минимальное количество, может быть больше) +24
- <header>, <main>, <footer> +2
- семь элементов <section> (по количеству секций) +2
- только один заголовок <h1> +2
- семь заголовков <h2> (по количеству секций) +2
- шесть заголовков <h3> (по количеству карточек) +2
- два элемента <nav> (основная и вспомогательная панель навигации) +2
- три списка ul > li > a (основная и вспомогательная панель навигации, ссылки на соцсети) +2
- тринадцать кнопок button (четыре из них в секции Video, пять в секции Tickets, по две - стрелки слайдера и плейлиста) +2
- три тега input type="radio" (в секции Tickets) +2
- два тега input type="number"(в секции Tickets) +2
- два тега input type="range" (громкось и прогрес-бар видео) +2
- для всех элементов <img> указан обязательный атрибут alt +2
3. Вёрстка соответствует макету +45
- блок <header> +5
- секция Welcome +5
- секция Visiting +5
- секция Explore +5
- секция Video +5
- секция Gallery +5
- секция Tickets +5
- секция Contacts +5
- блок <footer> +5
4. Форма покупки билетов +22
- форма плавно выдвигается слева при открытии и плавно возвращается назад при закрытии. В открытом состоянии под формой есть полупрозрачный overlay, который занимает весь экран. +2
- форма открывается при клике по кнопке Buy Now в секции Tickets и закрывается кликом по иконке с крестиком в верхнем правом углу или кликом по overlay +2
- при вёрстке формы используются следующие элементы: form, input type="date", input type="time", input type="text", input type="email", input type="tel", input type="number", select +8
- вёрстка формы соответствует макету + 10
5. Требования к css + 18
- добавлен favicon +2
- для построения сетки используются флексы или гриды +2
- при уменьшении масштаба страницы браузера вёрстка размещается по центру, а не сдвигается в сторону +2
- фоновый цвет каждого блока и секции тянется на всю ширину страницы +2
- иконки добавлены в формате .svg. SVG может быть добавлен любым способом. Обращаем внимание на формат, а не на способ добавления +2
- расстояние между буквами, там, где это требуется по макету, регулируется css-свойством letter-spacing +2
- переключаются радиокнопки в блоке Tickets, одновременно может быть выбрана только одна кнопка +2
- в блоке Contacts правильно указанны ссылки на почту mailto и на телефон tel +2
- в футере добавлены ссылки на соцсети. Круглая граница вокруг иконок соцсетей выполнена при помощи css +2
6. Интерактивность, реализуемая через css +25
- плавная прокрутка по якорям +5
- параллакс +5
- при кликам по кнопке Discover the Louvre и карточкам секции Visiting открываются полноэкранные панорамы Google Street View встроенные в страницы вашего сайта при помощи iframe +5
- изменение стиля интерактивных элементов при наведении и клике +10
- интерактивность включает в себя не только изменение внешнего вида курсора, например, при помощи свойства cursor: pointer, но и другие визуальные эффекты – изменение цвета фона или шрифта, появление подчёркивания и т.д. Если в макете указаны стили при наведении и клике, для элемента указываем эти стили. Если в макете стили не указаны, реализуете их по своему усмотрению, руководствуясь общим стилем макета +4
- обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы +2
- интерактивность при наведении карточек в секции Visiting предусматривает плавное растягивание подчёркивания заголовка карточки на всю ширину карточки Демо +2
- интерактивность при наведении иконок социальных сетей в футере предусматривает изменение цвета иконки и круглой границы вокруг иконки на золотистый +2
7. Интерактивность, реализуемая через js +16
- можно передвигать ползунки громкости и прогресс-бар видео, при этом цвет шкалы до и после ползунка отличается и соответствует макету +2
- кликами по кнопкам + и - в секции Tiskets можно менять количество билетов Basic и Senior от 0 до 20 +2
- кнопке "Book" в форме покупки билетов добавлен ripple-эффект Демо +2
- при перезагрузке (обновлении) страницы картины в блоке Galery отображаются в рандомном порядке + 10

Итого: 160 баллов.

PS: все изображения на странице и favicon, кроме иконок, пережаты в новейший формат avif для минимизации трафика и времени загрузки страницы.
Этот формат поддерживает актуальная версия google chrome. По заданию сайт должен проверяться на последней версии chrome. Так что противоречий нет.
Если у вас есть проблемы с отображением картинок, то установите себе последнюю версию chrome.
`);