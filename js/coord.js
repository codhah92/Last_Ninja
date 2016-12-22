class Coord {
  constructor(xCoord, yCoord) {
    this.xCoord = xCoord;
    this.yCoord = yCoord;
  }

  jump() {
    return new Coord(this.xCoord, 20 + this.yCoord);
  }

  equals(next) {
    if ((next.xCoord === this.xCoord) && (next.yCoord === this.yCoord)){
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Coord;
