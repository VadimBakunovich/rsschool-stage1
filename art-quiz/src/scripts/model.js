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
      volume: 0,
      toggleTimer: '',
      time: 0,
    },
    artQuest = [[], [], [], [], [], [], [], [], [], [], [], []],
    paintQuest = [[], [], [], [], [], [], [], [], [], [], [], []],
  ) {
    this.settings = settings;
    this.artQuest = artQuest;
    this.paintQuest = paintQuest;
    this.db = localStorage.BVA_db ? JSON.parse(localStorage.getItem('BVA_db')) : Model.getDb();
  }
}