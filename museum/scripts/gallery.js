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
    const img = document.createElement('img');
    img.className = 'gallery__item';
    img.alt = `tile-${i}`;

    switch (i) {
      case 1 : img.src = 'assets/img/galery/1square.jpg'; break;
      case 2 : img.src = 'assets/img/galery/2vertic.jpg'; break;
      case 3 : img.src = 'assets/img/galery/3vertic.jpg'; break;
      case 4 : img.src = 'assets/img/galery/4square.jpg'; break;
      case 5 : img.src = 'assets/img/galery/5vertic.jpg'; break;
      case 6 : img.src = 'assets/img/galery/6vertic.jpg'; break;
      case 7 : img.src = 'assets/img/galery/7vertic.jpg'; break;
      case 8 : img.src = 'assets/img/galery/8vertic.jpg'; break;
      case 9 : img.src = 'assets/img/galery/9vertic.jpg'; break;
      case 10 : img.src = 'assets/img/galery/10square.jpg'; break;
      case 11 : img.src = 'assets/img/galery/11square.jpg'; break;
      case 12 : img.src = 'assets/img/galery/12horizo.jpg'; break;
      case 13 : img.src = 'assets/img/galery/13horizo.jpg'; break;
      case 14 : img.src = 'assets/img/galery/14vertic.jpg'; break;
      case 15 : img.src = 'assets/img/galery/15square.jpg'; break;
      default : break;
    }

    if (img.src.includes('horizo')) img.classList.add('horizo');
    else if (img.src.includes('square')) img.classList.add('square');
    else if (img.src.includes('vertic')) img.classList.add('vertic');

    gallery.push(img);
  }

  const container = document.querySelector('.gallery__inner');

  for (let i of templates[0]) {
    for (let j of gallery) {
      if (j.classList.contains(i) || i == 'others') {
        container.append(j);
        gallery = gallery.filter(el => el.src != j.src);
        break;
      } else continue;
    }
  }
}

fillGallery();