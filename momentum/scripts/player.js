import { playList } from './playlist.js';

const fillPlayList = _ => {
  for (let i of playList) {
    const li = `
      <li class="track-name">
        <button class="btn-play-track"></button>
        ${i.title}<span class="track-duration">${i.duration}</span>
      </li>`;
    trackList.innerHTML += li;
  }
}
fillPlayList();

audio.src = playList[0].src;

let currTrackNum = 0;
let isPaused = true;

const timeConverter = s => (s - (s %= 60)) / 60 + (s > 9 ? ':' : ':0') + s;

const showDuration = _ => {
  audioCurrTime.textContent = timeConverter(Math.round(audio.currentTime));
  audioDuration.textContent = timeConverter(Math.round(audio.duration));
}
showDuration();

const styleCurrTrack = _ => {
  const listItems = document.querySelectorAll('.track-name');
  for (let i of listItems) {
    if (i.textContent.includes(currTrack.textContent)) {
      i.classList.add('curr-track');
    } else i.classList.remove('curr-track');
  }
}

audio.addEventListener('loadeddata', _ => {
  audio.currentTime = 0;
  if (!isPaused) audio.play();
  currTrack.textContent = playList[currTrackNum].title;
  showDuration();
  styleCurrTrack();
});

audio.addEventListener('ended', _ => {
  currTrackNum === playList.length - 1 ? currTrackNum = 0 : currTrackNum += 1;
  audio.src = playList[currTrackNum].src;
});

const fillProgressBar = value =>`
  linear-gradient(to right, #FDAC53 0%, #FDAC53 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;

audioPlayer.addEventListener('click', e => {
  switch (e.target.id) {
    case 'playBtn':
      audio.paused ? audio.play() : audio.pause();
      audio.paused ? isPaused = true : isPaused = false;
      break;
    case 'muteBtn':
      audio.muted ? audio.muted = false : audio.muted = true;
      break;
    case 'prevTrack':
      currTrackNum ? currTrackNum -= 1 : currTrackNum = playList.length - 1;
      audio.src = playList[currTrackNum].src;
      break;
    case 'nextTrack':
      currTrackNum === playList.length - 1 ? currTrackNum = 0 : currTrackNum += 1;
      audio.src = playList[currTrackNum].src;
      break;
    default: break;
  }
  if (e.target.classList.contains('btn-play-track')) {
    const nextTrackName = e.target.nextSibling.textContent.trim();
    if (currTrack.textContent !== nextTrackName) {
      for (let i = 0; i < playList.length; i++) {
        if (playList[i].title === nextTrackName) {
          currTrackNum = i;
          audio.src = playList[i].src;
        }
      }
    }
    audio.paused ? audio.play() : audio.pause();
    audio.paused ? isPaused = true : isPaused = false;
  };
});

audio.onplay = _ => {
  playBtn.classList.add('pause');
  const listItems = document.querySelectorAll('.track-name');
  for (let i of listItems) {
    if (i.textContent.includes(playList[currTrackNum].title)) {
      i.firstElementChild.classList.add('--pause-track');
    } else i.firstElementChild.classList.remove('--pause-track');
  }
}

audio.onpause = _ => {
  playBtn.classList.remove('pause');
  const listItems = document.querySelectorAll('.track-name');
  for (let i of listItems) {
    if (i.textContent.includes(playList[currTrackNum].title)) {
      i.firstElementChild.classList.remove('--pause-track');
    }
  }
}

audio.addEventListener('timeupdate', _ => {
  if (!isNaN(audio.duration)) {
    showDuration();
    progress.value = audio.currentTime * 100 / audio.duration;
    progress.style.background = fillProgressBar(progress.value);
  }
});

progress.oninput = _ => audio.currentTime = progress.value * audio.duration / 100;

vol.addEventListener('input', _ => {
  if (!audio.muted) audio.volume = vol.value / 100;
  else {
    audio.muted = false;
    audio.volume = 0.05;
  }
});

audio.addEventListener('volumechange', _ => {
  if (audio.muted) {
    vol.style.background = fillProgressBar(0);
    vol.value = 0;
  } else {
      vol.style.background = fillProgressBar(audio.volume * 100);
      vol.value = audio.volume * 100;
    }
  audio.volume === 0 || audio.muted ? muteBtn.classList.add('muted') : muteBtn.classList.remove('muted');
});

audio.volume = vol.value / 100;