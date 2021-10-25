let randomNum = Math.floor(Math.random() * 20) + 1;
let timeOfDay = getTimeOfDay('en');

const setBgGitHub = (timeOfDay, bgNum) => {
  bgNum = `${bgNum}`.padStart(2, '0');
  const img = new Image();
  img.src = `
  https://raw.githubusercontent.com/VadimBakunovich/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = _ => body.style.backgroundImage = `url(${img.src})`;
}

const backUpAPI = tag => {
  fetch(`https://api.pexels.com/v1/search?query=landscapes+${tag}&orientation=landscape&page=1&per_page=80`, {
    headers: {
      Authorization: "563492ad6f91700001000001e37ddac374ed4c8fa4e0926c408de06c"
    }
  }).then(response => response.json())
    .then(data => {
      pages = Math.round(data.total_results / 80);
      const bgNum = Math.floor(Math.random() * 80) + 1;
      const image = new Image();
      image.src = data.photos[bgNum].src.original + '?auto=compress&cs=tinysrgb&h=1080&w=1920';
      image.onload = _ => body.style.backgroundImage = `url(${image.src})`;
    });
}

const setBgUnsplash = tag => {
  fetch(`https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=uptGnKCFuXbzoqFtHN3O6nI9sZ9ZucidddULq3dDQ2w`)
    .then(response => response.json())
    .then(data => {
      if (data.urls.raw) {
        const image = new Image();
        image.src = data.urls.raw + '&crop=entropy&cs=tinysrgb&fm=jpg&q=45&w=1920&h=1080';
        image.onload = _ => body.style.backgroundImage = `url(${image.src})`;
      } else backUpAPI(tag);
  });
}

const setBgFlickr = tag => {
  fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=d6177c054cd0164f294c529b2551ad55&tags=${tag},landscape&tag_mode=all&extras=tags,url_h&per_page=99&format=json&nojsoncallback=1`)
    .then(response => response.json())
    .then(data => {
      const urls = data.photos.photo.filter(i => i.url_h);
      if (urls.length) {
        const bgNum = Math.floor(Math.random() * urls.length);
        const image = new Image();
        image.src = urls[bgNum].url_h;
        image.onload = _ => body.style.backgroundImage = `url(${image.src})`;
      } else backUpAPI(tag);
  });
}

const setBg = src => {
  switch (src) {
    case 'Unsplash':
      selectTag.value === 'default' ? setBgUnsplash(getTimeOfDay('en')) : setBgUnsplash(selectTag.value);
      break;
    case 'Flickr':
      selectTag.value === 'default' ? setBgFlickr(getTimeOfDay('en')) : setBgFlickr(selectTag.value);
      break;
    default:
      setBgGitHub(getTimeOfDay('en'), randomNum);
      break;
  }
}
setBg(localStorage.bgSrc);

sliderPrev.onclick = _ => {
  if (srcGitHub.checked) {
    randomNum === 1 ? randomNum = 20 : randomNum -= 1;
    setBgGitHub(getTimeOfDay('en'), randomNum);
  } else if (srcUnsplash.checked) setBg('Unsplash');
    else if (srcFlickr.checked) setBg('Flickr');
}
sliderNext.onclick = _ => {
  if (srcGitHub.checked) {
    randomNum === 20 ? randomNum = 1 : randomNum += 1;
    setBgGitHub(getTimeOfDay('en'), randomNum);
  } else if (srcUnsplash.checked) setBg('Unsplash');
    else if (srcFlickr.checked) setBg('Flickr');
}
srcGitHub.addEventListener('change', _ => setBg('GitHub'));

srcUnsplash.addEventListener('change', _ => setBg('Unsplash'));

srcFlickr.addEventListener('change', _ => setBg('Flickr'));

setInterval(_ => {
  if (timeOfDay !== getTimeOfDay('en')) {
    timeOfDay = getTimeOfDay('en');
    if (srcGitHub.checked) setBgGitHub(getTimeOfDay('en'), randomNum);
    else if (!selectTag.disabled && selectTag.value === 'default') {
      if (srcUnsplash.checked) setBgUnsplash(getTimeOfDay('en'));
      else if (srcFlickr.checked) setBgFlickr(getTimeOfDay('en'));
    }
  }
}, 1000);

selectTag.addEventListener('change', _ => {
  if (selectTag.value !== 'default') {
    if (srcUnsplash.checked) setBgUnsplash(selectTag.value);
    else if (srcFlickr.checked) setBgFlickr(selectTag.value);
  } else {
    if (srcUnsplash.checked) setBgUnsplash(getTimeOfDay('en'));
    else if (srcFlickr.checked) setBgFlickr(getTimeOfDay('en'));
  }
});