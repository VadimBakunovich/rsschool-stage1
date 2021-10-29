let randomNum = Math.floor(Math.random() * 20) + 1;
let timeOfDay = getTimeOfDay('en');
let urlsUnsplash = [];
let urlsPixels = [];
let isSrcChanged = false;
let nextImg;

const getRandomNum = arrLength => Math.floor(Math.random() * arrLength);

const renderBg = urls => {
  if (nextImg && !isSrcChanged) body.style.backgroundImage = `url(${nextImg.src})`;
  else {
    const img = new Image();
    img.src = urls[getRandomNum(urls.length)];
    img.onload = _ => body.style.backgroundImage = `url(${img.src})`;
  }
    nextImg = new Image();
    nextImg.src = urls[getRandomNum(urls.length)];
    isSrcChanged = false;
}

const setBgGitHub = (timeOfDay, bgNum) => {
  bgNum = `${bgNum}`.padStart(2, '0');
  const img = new Image();
  img.src = `
  https://raw.githubusercontent.com/VadimBakunovich/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = _ => body.style.backgroundImage = `url(${img.src})`;
}

const fetchUnsplash = tag => {
  fetch(`https://api.unsplash.com/photos/random?client_id=uptGnKCFuXbzoqFtHN3O6nI9sZ9ZucidddULq3dDQ2w&query=${tag}&orientation=landscape&count=30`)
    .then(response => response.json())
    .then(data => {
      urlsUnsplash = data.filter(i => i.urls.raw).map(i => i = i.urls.raw + '&crop=entropy&cs=tinysrgb&fm=jpg&q=45&w=1920&h=1080');
      renderBg(urlsUnsplash);
    });
}

const fetchPixels = tag => {
  fetch(`https://api.pexels.com/v1/search?query=${tag}&orientation=landscape&page=1&per_page=80`, {
    headers: {
      Authorization: "563492ad6f91700001000001e37ddac374ed4c8fa4e0926c408de06c"
    }
  }).then(response => response.json())
    .then(data => {
      urlsPixels = data.photos.filter(i => i.src.original).map(i => i.src.original + '?auto=compress&cs=tinysrgb&h=1080&w=1920');
      renderBg(urlsPixels);
    });
}

const setBg = src => {
  isSrcChanged = true;
  switch (src) {
    case 'Unsplash':
      selectTag.value === 'default' ? fetchUnsplash(getTimeOfDay('en')) : fetchUnsplash(selectTag.value);
      break;
    case 'Pixels':
      selectTag.value === 'default' ? fetchPixels(getTimeOfDay('en')) : fetchPixels(selectTag.value);
      break;
    default:
      setBgGitHub(getTimeOfDay('en'), randomNum);
      break;
  }
}
setBg(localStorage.getItem('bgSrc'));

sliderPrev.onclick = _ => {
  if (srcGitHub.checked) {
    randomNum === 1 ? randomNum = 20 : randomNum -= 1;
    setBgGitHub(getTimeOfDay('en'), randomNum);
  } else if (srcUnsplash.checked) renderBg(urlsUnsplash);
    else if (srcPixels.checked) renderBg(urlsPixels);
}
sliderNext.onclick = _ => {
  if (srcGitHub.checked) {
    randomNum === 20 ? randomNum = 1 : randomNum += 1;
    setBgGitHub(getTimeOfDay('en'), randomNum);
  } else if (srcUnsplash.checked) renderBg(urlsUnsplash);
    else if (srcPixels.checked) renderBg(urlsPixels);
}
srcGitHub.addEventListener('change', _ => setBg('GitHub'));

srcUnsplash.addEventListener('change', _ => setBg('Unsplash'));

srcPixels.addEventListener('change', _ => setBg('Pixels'));

setInterval(_ => {
  if (timeOfDay !== getTimeOfDay('en')) {
    timeOfDay = getTimeOfDay('en');
    if (srcGitHub.checked) setBgGitHub(timeOfDay, randomNum);
    else if (!selectTag.disabled && selectTag.value === 'default') {
      if (srcUnsplash.checked) fetchUnsplash(timeOfDay);
      else if (srcPixels.checked) fetchPixels(timeOfDay);
    }
  }
}, 1000);

selectTag.addEventListener('change', _ => {
  if (srcUnsplash.checked) setBg('Unsplash');
  else if (srcPixels.checked) setBg('Pixels');
});