export default class Model {
  constructor(
    settings = {
      toggleSound: '',
      volume: 70,
      toggleTimer: '',
      time: 20,
    },
    artQuizRes = [[], [], [], [], [], [], [], [], [], [], [], []],
    paintQuizRes = [[], [], [], [], [], [], [], [], [], [], [], []],
    currData = {
      quizType: '',
      catNum: 1,
      isPlaying: false,
      questNum: 0,
      lapStatus: [],
      lapRes: [],
      timeLeft: 0,
    },
    paintData = {},
  ) {
    this.settings = localStorage.BVA_settings
      ? JSON.parse(localStorage.getItem('BVA_settings'))
      : settings;

    this.artQuizRes = localStorage.BVA_artQuizRes
      ? JSON.parse(localStorage.getItem('BVA_artQuizRes'))
      : artQuizRes;

    this.paintQuizRes = localStorage.BVA_paintQuizRes
      ? JSON.parse(localStorage.getItem('BVA_paintQuizRes'))
      : paintQuizRes;

    this.currData = currData;
    this.currData.timeLeft = this.settings.time;
    this.paintData = paintData;
    this.db = localStorage.BVA_db ? JSON.parse(localStorage.getItem('BVA_db')) : [];
  }

  getDb() {
    fetch('assets/db.json')
      .then(response => response.json())
      .then(data => {
        this.db = data;
        localStorage.setItem('BVA_db', JSON.stringify(data));
      });
  }
}