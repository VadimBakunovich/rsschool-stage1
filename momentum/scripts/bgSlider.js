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