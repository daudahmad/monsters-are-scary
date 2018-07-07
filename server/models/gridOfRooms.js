const gridOfRooms = function(sizeX, sizeY) {
  this.sizeX = sizeX;
  this.sizeY = sizeY;
};

gridOfRooms.prototype.initializeGrid = function() {
  let a = new Array(this.sizeX);
  for (i = 0; i < this.sizeX; i++) {
    a[i] = new Array(this.sizeY);
    for (j = 0; j < this.sizeY; j++) {
      a[i][j] = Math.random() < 0.5 ? "GOLD" : "MONSTER";
    }
  }
  this.rooms = a;
};

module.exports = gridOfRooms;
