const setBg = (timeOfDay, bgNum) => {
  bgNum = `${bgNum}`.padStart(2, '0');
  const img = new Image();
  img.src = `
  https://raw.githubusercontent.com/VadimBakunovich/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = _ => body.style.backgroundImage = `url(${img.src})`;
}
let randomNum = Math.floor(Math.random() * 20) + 1;

setBg(getTimeOfDay('en'), randomNum);

sliderPrev.onclick = _ => {
  randomNum === 1 ? randomNum = 20 : randomNum -= 1;
  setBg(getTimeOfDay('en'), randomNum);
}
sliderNext.onclick = _ => {
  randomNum === 20 ? randomNum = 1 : randomNum += 1;
  setBg(getTimeOfDay('en'), randomNum);
}
let timeOfDay = getTimeOfDay('en');

setInterval(_ => {
  if (timeOfDay !== getTimeOfDay('en')) {
    setBg(getTimeOfDay('en'), randomNum);
    timeOfDay = getTimeOfDay('en');
  }
}, 1000);

let pages = 1;
let page = pages === 1 ? 1 : Math.floor(Math.random() * pages) + 1;
// Very good API
// fetch(`https://api.pexels.com/v1/search?query=landscapes+${getTimeOfDay('en')}&orientation=landscape&page=1&per_page=80`, {
//   headers: {
//     Authorization: "563492ad6f91700001000001e37ddac374ed4c8fa4e0926c408de06c"
//   }
// }).then(response => response.json())
// .then(data => {
//   console.log('data:', data);
//   pages = Math.round(data.total_results / 80);
//   console.log(data.total_results, pages);
//   const rn = Math.floor(Math.random() * 80) + 1;
//   const image = new Image();
//   image.src = data.photos[rn].src.original + '?auto=compress&cs=tinysrgb&h=1080&w=1920';
//   image.onload = _ => body.style.backgroundImage = `url(${image.src})`;
// });

// fetch('https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=uptGnKCFuXbzoqFtHN3O6nI9sZ9ZucidddULq3dDQ2w')
// .then(response => response.json())
// .then(data => {
//   const image = new Image();
//   image.src = data.urls.raw + '&crop=entropy&cs=tinysrgb&fm=jpg&q=45&w=1920&h=1080';
//   image.onload = _ => body.style.backgroundImage = `url(${image.src})`;
// });

fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=d6177c054cd0164f294c529b2551ad55&tags=${getTimeOfDay('en')},landscape&tag_mode=all&extras=tags,url_h&per_page=500&format=json&nojsoncallback=1`)
.then(response => response.json())
.then(data => {
  //console.log(data);
  const urls = data.photos.photo.filter(i => i.url_h);
  const rn = Math.floor(Math.random() * urls.length) + 1;
  //console.log(data.photos.photo[rn].tags);
  const image = new Image();
  image.src = urls[rn].url_h;
  image.onload = _ => body.style.backgroundImage = `url(${image.src})`;
});
selectTag.onchange = _ => {
  const options = selectTag.querySelectorAll('option');
  for(let i of options) {
    if (i.selected) console.log(i.textContent);
  }
  // if (selectTag.options[1].selected) {
  //   console.log('test')
  // }
}