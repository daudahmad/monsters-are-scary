const rp = require("request-promise");
const constants = require("./constants");

class Game {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.health = 5;
    this.score = 0;
    this.lastRoomContents = "";
  }

  get coordinates() {
    return `(${this.x},${this.y})`;
  }

  get distanceTravelled() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  move(moveDirection) {
    return new Promise((resolve, reject) => {
      // Check if movement is possible
      if (this.canMove(moveDirection)) {
        // Fetch room contents
        this.checkRoomContents(this.getNewCoordinates(moveDirection)).then(
          roomContents => {
            // console.log(`checkRoomContents response: ${roomContents}`);
            this.lastRoomContents = roomContents;
            // Move player
            this.movePlayer(moveDirection, roomContents);
            // Check health
            if (this.health === 0) {
              resolve({
                isDead: true,
                message: `You have DIED!`
              });
            } else {
              resolve({ isDead: false, message: "Move successful" });
            }
          }
        );
      } else {
        reject(
          "You cannot move because there is no door in this direction, try moving in another direction"
        );
      }
    });
  }

  canMove(moveDirection) {
    const newCoordinates = this.getNewCoordinates(moveDirection);
    return newCoordinates.x >= 0 && newCoordinates.y >= 0 ? true : false;
  }

  checkRoomContents(newCoordinates) {
    const url = `${constants.serviceUrl}${newCoordinates.x}/${
      newCoordinates.y
    }`;
    return rp(url)
      .then(function(response) {
        return response;
      })
      .catch(function(err) {
        return err;
      });
  }

  getNewCoordinates(moveDirection) {
    if (moveDirection === constants.moveNorth) {
      return { x: this.x + 1, y: this.y };
    }
    if (moveDirection === constants.moveSouth) {
      return { x: this.x - 1, y: this.y };
    } else if (moveDirection === constants.moveWest) {
      return { x: this.x, y: this.y - 1 };
    } else {
      return { x: this.x, y: this.y + 1 };
    }
  }

  setNewCoordinates(moveDirection) {
    const newCoordinates = this.getNewCoordinates(moveDirection);
    this.x = newCoordinates.x;
    this.y = newCoordinates.y;
  }

  movePlayer(moveDirection, roomContents) {
    this.setNewCoordinates(moveDirection);
    if (this.foundGold(roomContents)) {
      this.score++;
    }
    if (this.encounteredMonster(roomContents)) {
      this.health--;
    }
  }

  foundGold(roomContents) {
    return roomContents === "GOLD";
  }

  encounteredMonster(roomContents) {
    return roomContents === "MONSTER";
  }
}

module.exports = Game;
