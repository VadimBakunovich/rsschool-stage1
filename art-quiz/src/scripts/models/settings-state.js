export default class SettingsState {
  constructor(state = {
    toggleSound: '',
    volume: 50,
    toggleTimer: '',
    time: 20,
  }) {
    this.state = localStorage.BVA_settingsState
      ? JSON.parse(localStorage.getItem('BVA_settingsState'))
      : state;
  }
}