export function player() {

  const playList = [
    {
      title: 'Secret Garden - Songs from a secret garden',
      src: 'assets/music/Secret Garden - Songs from a secret garden.mp3'
    },
    {
      title: 'Secret Garden - The Promise',
      src: 'assets/music/Secret Garden - The Promise.mp3'
    },
    {
      title: 'Thematic pianos - Pain',
      src: 'assets/music/Thematic pianos - Pain.mp3'
    },
    {
      title: 'Yiruma - Moonlight',
      src: 'assets/music/Yiruma - Moonlight.mp3'
    },
    {
      title: 'Yiruma - River Flowns In You',
      src: 'assets/music/Yiruma - River Flowns In You.mp3'
    }
  ];
  const fillPlayList = _ => {
    for (let i of playList) {
      const li = `<li class="track-name"><button class="play-track"></button>${i.title}</li>`;
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
  
  audio.addEventListener('loadeddata', _ => {
    audio.currentTime = 0;
    if (!isPaused) audio.play();
    currTrack.textContent = playList[currTrackNum].title;
    playBtn.className = 'controls__play';
    showDuration();
  });

  audio.addEventListener('ended', _ => {
    currTrackNum === playList.length - 1 ? currTrackNum = 0 : currTrackNum += 1;
    audio.src = playList[currTrackNum].src;
  });

  const fillProgressBar = value =>`
    linear-gradient(to right, #FDAC53 0%, #FDAC53 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
  
  audioPlayer.addEventListener('click', e => {
    if (e.target.className === 'play-track') e.target.parentNode.classList.add('playing');
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
  });
  audio.onplay = _ => playBtn.className = 'controls__play pause';
  audio.onpause = _ => playBtn.className = 'controls__play';

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
}