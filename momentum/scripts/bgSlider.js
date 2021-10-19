export function bgSlider() {
  
  const getTimeOfDay = _ => {
    const hours = new Date().getHours();
    if (hours < 6) return 'night';
    else if (hours < 12) return 'morning';
    else if (hours < 18) return 'afternoon';
    else return 'evening';
  }
  let randomNum = Math.floor(Math.random() * 20) + 1;

  const setBg = (timeOfDay, bgNum) => {
    bgNum = `${bgNum}`.padStart(2, '0');
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/VadimBakunovich/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = _ => body.style.backgroundImage = `url(${img.src})`;
  }
  setBg(getTimeOfDay(), randomNum);

  sliderPrev.onclick = _ => {
    randomNum === 1 ? randomNum = 20 : randomNum -= 1;
    setBg(getTimeOfDay(), randomNum);
  }
  sliderNext.onclick = _ => {
    randomNum === 20 ? randomNum = 1 : randomNum += 1;
    setBg(getTimeOfDay(), randomNum);
  }
  let timeOfDay = getTimeOfDay();

  setInterval(_ => {
    if (timeOfDay !== getTimeOfDay()) {
      setBg(getTimeOfDay(), randomNum);
      timeOfDay = getTimeOfDay();
    }
  }, 1000);
}