class GridOfRooms {
  constructor(sizeX, sizeY) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  }

  initializeGrid() {
    let a = new Array(this.sizeX);
    for (let i = 0; i < this.sizeX; i++) {
      a[i] = new Array(this.sizeY);
      for (let j = 0; j < this.sizeY; j++) {
        a[i][j] = Math.random() < 0.5 ? "GOLD" : "MONSTER";
      }
    }
    this.rooms = a;
  }
}

module.exports = GridOfRooms;
