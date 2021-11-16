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
    artQuest = [[], [], [], [], [], [], [], [], [], [], [], []],
    paintQuest = [[], [], [], [], [], [], [], [], [], [], [], []],
  ) {
    this.settings = localStorage.BVA_settings
      ? JSON.parse(localStorage.getItem('BVA_settings'))
      : settings;

    this.artQuest = localStorage.BVA_artQuest
      ? JSON.parse(localStorage.getItem('BVA_artQuest'))
      : artQuest;

    this.paintQuest = localStorage.BVA_paintQuest
      ? JSON.parse(localStorage.getItem('BVA_paintQuest'))
      : paintQuest;

    this.db = localStorage.BVA_db ? JSON.parse(localStorage.getItem('BVA_db')) : Model.getDb();
  }
}