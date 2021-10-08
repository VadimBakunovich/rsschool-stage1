export function gallery() {

  const fillGallery = _ => {

    let idxs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    const shuffle = arr => {
      for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    shuffle(idxs);

    let galleryItems = [];

    for (let i of idxs) {
      const img = document.createElement('img');
      img.className = 'gallery__item';
      img.alt = `tile-${i}`;
      img.loading = 'lazy';

      switch (i) {
        case 1 : img.src = 'assets/img/galery/1square.avif'; break;
        case 2 : img.src = 'assets/img/galery/2vertic.avif'; break;
        case 3 : img.src = 'assets/img/galery/3vertic.avif'; break;
        case 4 : img.src = 'assets/img/galery/4square.avif'; break;
        case 5 : img.src = 'assets/img/galery/5vertic.avif'; break;
        case 6 : img.src = 'assets/img/galery/6vertic.avif'; break;
        case 7 : img.src = 'assets/img/galery/7vertic.avif'; break;
        case 8 : img.src = 'assets/img/galery/8vertic.avif'; break;
        case 9 : img.src = 'assets/img/galery/9vertic.avif'; break;
        case 10 : img.src = 'assets/img/galery/10square.avif'; break;
        case 11 : img.src = 'assets/img/galery/11square.avif'; break;
        case 12 : img.src = 'assets/img/galery/12horizo.avif'; break;
        case 13 : img.src = 'assets/img/galery/13horizo.avif'; break;
        case 14 : img.src = 'assets/img/galery/14vertic.avif'; break;
        case 15 : img.src = 'assets/img/galery/15square.avif'; break;
        default : break;
      }
      if (img.src.includes('horizo')) img.classList.add('horizo');
      else if (img.src.includes('square')) img.classList.add('square');
      else if (img.src.includes('vertic')) img.classList.add('vertic');

      galleryItems.push(img);
    }

    galleryItems.map(i => galleryInner.append(i));
  }
  fillGallery();

  // Gallery animation handling
  const animItems = document.querySelectorAll('.gallery__item');
  const galleryAnimate = _ => {
    for (let item of animItems) {
      const itemHeight = item.offsetHeight;
      const itemOffset = item.getBoundingClientRect().top + scrollY;
      const ItemPoint = window.innerHeight - itemHeight / 4;
      if ((scrollY > itemOffset - ItemPoint) && (scrollY < itemOffset + itemHeight)) {
        item.classList.add('--item-show');
      } else item.classList.remove('--item-show');
    }
  }
  document.addEventListener('scroll', galleryAnimate);
}