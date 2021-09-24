const fillGallery = _ => {

  let templates = [
    ['vertic', 'square', 'vertic',
     'square', 'horizo', 'square',
     'vertic', 'square', 'vertic',
     'others', 'vertic', 'others',
     'others', 'others', 'others'],

    ['square', 'vertic', 'square',
     'vertic', 'horizo', 'vertic',
     'square', 'square', 'square',
     'vertic', 'vertic', 'vertic',
     'others', 'others', 'others'],

    ['vertic', 'square', 'vertic',
     'horizo', 'vertic', 'horizo',
     'vertic', 'vertic', 'vertic',
     'vertic', 'square', 'vertic',
     'others', 'others', 'others'],

    ['vertic', 'square', 'vertic',
     'vertic', 'vertic', 'square',
     'square', 'vertic', 'square',
     'horizo', 'square', 'vertic',
     'others', 'others', 'others'],

    ['vertic', 'square', 'vertic',
     'square', 'vertic', 'vertic',
     'square', 'vertic', 'square',
     'vertic', 'square', 'horizo',
     'others', 'others', 'others']
  ];

  let idxs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const shuffle = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  shuffle(templates);
  shuffle(idxs);

  let gallery = [];
  for (let i of idxs) {
    const item = document.createElement('img');
    item.className = 'gallery__item';
    item.src = `assets/img/galery/galery${i}.jpg`;
    item.alt = `tile-${i}`;
    if (item.width > item.height) item.classList.add('horizo');
    else if (item.width == item.height) item.classList.add('square');
    else if (item.width < item.height) item.classList.add('vertic');
    gallery.push(item);
  }
  
  for (let i of templates[0]) {
    for (let j of gallery) {
      if (j.classList.contains(i) || i == 'others') {
        inner.append(j);
        gallery = gallery.filter(el => el.src != j.src);
        break;
      } else continue;
    }
  }
}
fillGallery();