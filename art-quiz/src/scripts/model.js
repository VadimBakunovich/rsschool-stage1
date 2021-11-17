export default class Model {
  static async getDb() {
    await fetch('assets/db.json')
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('BVA_db', JSON.stringify(data));
        return data;
      });
  }

  constructor(
    settings = {
      toggleSound: '',
      volume: 70,
      toggleTimer: '',
      time: 20,
    },
    artQuizRes = [[], [], [], [], [], [], [], [], [], [], [], []],
    paintQuizRes = [[], [], [], [], [], [], [], [], [], [], [], []],
    quizType = '',
    currData = {
      questNum: 1,
      author: '',
      name: '',
      year: '',
      imgNum: 0,
    },
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

    this.quizType = quizType;
    this.currData = currData;
    this.db = localStorage.BVA_db ? JSON.parse(localStorage.getItem('BVA_db')) : Model.getDb();
  }
}