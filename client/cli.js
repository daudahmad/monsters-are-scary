const readline = require("readline");
const Game = require("./Game");
const Table = require("cli-table");
const constants = require("./constants");
const utils = require("./utils");

/*
    Declaraing the cli function
*/
const cli = function() {};

/*
    Print and introduction to the game when it first launches 
*/
cli.prototype.printIntroduction = function() {
  const table = new Table();

  table.push(
    ["=====================Welcome to MONSTER ARE SCARY!====================="],
    [
      ">> Monsters Are Scary places you in a dungeon with grid of rooms. Each room has 4 doors."
    ],
    [">> Some rooms have monsters in them. Other rooms have gold in them."],
    [
      ">> When you find GOLD your score will increment by 1. When you encounter a MONSTER you will lose 1 health."
    ],
    [">> You will start with 5 health and die when health reaches 0."],
    [
      ">> You can move either North, South, East or West by typing a command at the console."
    ],
    [
      `>> You have been placed inside a room with (0,0) coordinates and the game has started.`
    ],
    [
      `>> Current health: ${this.game.health} || Current score: ${
        this.game.score
      } `
    ],
    [
      `>> To begin crawling: Move North: ${utils.styleOutput(
        "MN"
      )}, Move South: ${utils.styleOutput("MS")}, Move East: ${utils.styleOutput(
        "ME"
      )}, Move West: ${utils.styleOutput("MW")}`
    ]
  );

  console.log(table.toString());
};

cli.prototype.processCommands = function(command) {
  if (typeof command == "string" && command.trim().length > 0) {
    const validCommands = ["MN", "MS", "ME", "MW"];
    command = command.trim().toUpperCase();
    if (validCommands.includes(command)) {
      return this.game.move(command);
      //   console.log(this.game);
    } else if (command === "EXIT" || command === "E") {
      this.exit();
    } else {
      return Promise.reject(constants.invalidCommandsMsg);
    }
  } else {
    return Promise.reject(constants.invalidCommandsMsg);
  }
};

cli.prototype.printMoveSuccess = function(response) {
  const table = new Table();
  table.push(
    [response.message],
    [`>> You found: ${this.game.lastRoomContents}`],
    [`>> Current room coordinates ${this.game.coordinates}`],
    [`>> Your SCORE: ${this.game.score}`],
    [`>> Your HEALTH: ${this.game.health}`]
  );
  console.log(table.toString());
};

cli.prototype.printMoveFailure = function(err) {
  const table = new Table();
  table.push([err]);
  console.log(table.toString());
};

cli.prototype.printFinalScore = function(response) {
  const table = new Table();
  if (response) {
    table.push(
      [response.message],
      [`>> You found: ${this.game.lastRoomContents}`],
      [`>> Your FINAL SCORE: ${this.game.score}`],
      [`Game exiting. Bye!`]
    );
  } else {
    table.push(
      [`Game exiting. Bye!`],
      [`>> Your FINAL SCORE: ${this.game.score}`]
    );
  }
  console.log(table.toString());
};

cli.prototype.exit = function(response) {
  this.printFinalScore(response);
  process.exit(0);
};

cli.prototype.init = function() {
  // Create a new Game
  this.game = new Game();

  this.printIntroduction();

  const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "MONSTERS-ARE-SCARY>> "
  });

  interface.prompt();

  interface.on("line", command => {
    // this should return a promise since commands will be processed asynchronously
    this.processCommands(command)
      .then(response => {
        // console.log(response);
        // console.log(this.game);
        if (response.isDead) {
          this.exit(response);
        } else {
          this.printMoveSuccess(response);
        }
        interface.prompt();
      })
      .catch(err => {
        this.printMoveFailure(err);
        // console.log("movement failure");
        // console.log(err);
        interface.prompt();
      });
  });

  interface.on("close", () => {
    this.exit();
  });
};

module.exports = new cli();
