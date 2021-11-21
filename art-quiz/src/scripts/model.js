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
      questNum: 0,
      lapStatus: [], // массив для отображения статусных индикаторов
      lapRes: [], // массив результатов раунда
      timeLeft: 0,
    },
    paintData = {},
    tickSound = {},
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
    this.tickSound = tickSound;
    this.db = localStorage.BVA_db ? JSON.parse(localStorage.getItem('BVA_db')) : [];
  }

  getDb() {
    fetch('assets/db.json')
      .then(response => response.json())
      .then(data => {
        if (!this.db.length) {
          this.db = data;
          localStorage.setItem('BVA_db', JSON.stringify(data));
        }
      });
  }
}