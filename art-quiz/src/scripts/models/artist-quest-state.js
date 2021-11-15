export default class ArtistState {
  constructor(state = [[], [], [], [], [], [], [], [], [], [], [], []]) {
    this.state = localStorage.BVA_artistState
      ? JSON.parse(localStorage.getItem('BVA_artistState'))
      : state;
  }
}