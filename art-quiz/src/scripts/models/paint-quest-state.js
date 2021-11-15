export default class PaintState {
  constructor(state = [[], [], [], [], [], [], [], [], [], [], [], []]) {
    this.state = localStorage.BVA_paintState
      ? JSON.parse(localStorage.getItem('BVA_paintState'))
      : state;
  }
}