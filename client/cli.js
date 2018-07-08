const readline = require("readline");
const Game = require("./Game");
const Table = require("cli-table");
const constants = require("./constants");
const utils = require("./utils");

/*
    Declaraing the cli function
*/
const cli = function() {
  // Start a new Game
  this.game = new Game();
};

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
      )}, Move South: ${utils.styleOutput(
        "MS"
      )}, Move East: ${utils.styleOutput("ME")}, Move West: ${utils.styleOutput(
        "MW"
      )}`
    ]
  );

  console.log(table.toString());
};

cli.prototype.playerScore = function() {
  return utils.styleOutput(this.game.score);
};

cli.prototype.playerHealth = function() {
  return utils.styleOutput(this.game.health);
};

cli.prototype.playerCoordinates = function() {
  return utils.styleOutput(this.game.coordinates);
};

cli.prototype.playerEncountered = function() {
  return utils.styleOutput(this.game.lastRoomContents);
};

cli.prototype.processCommands = function(command) {
  if (typeof command == "string" && command.trim().length > 0) {
    const validCommands = ["MN", "MS", "ME", "MW"];
    command = command.trim().toUpperCase();
    if (validCommands.includes(command)) {
      return this.game.move(command);
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
    [`>> You found: ${this.playerEncountered()}`],
    [`>> Current room coordinates ${this.playerCoordinates()}`],
    [`>> Your SCORE: ${this.playerScore()}`],
    [`>> Your HEALTH: ${this.playerHealth()}`]
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
      [`>> You found: ${this.playerEncountered()}`],
      [`>> Your FINAL COORDINATES: ${this.playerCoordinates()}`],
      [`>> Your FINAL SCORE: ${this.playerScore()}`],
      [`Game exiting. Bye!`]
    );
  } else {
    table.push(
      [`Game exiting. Bye!`],
      [`>> Your FINAL SCORE: ${this.playerScore()}`]
    );
  }
  console.log(table.toString());
};

cli.prototype.exit = function(response) {
  this.printFinalScore(response);
  process.exit(0);
};

/*
  Initialize the command prompt and start processing commands
*/
cli.prototype.init = function() {
  this.printIntroduction();

  const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "MONSTERS ARE SCARY>> "
  });

  interface.prompt();

  interface.on("line", async command => {
    // this should return a promise since commands will be processed asynchronously
    try {
      const response = await this.processCommands(command);
      if (response.isDead) {
        this.exit(response);
      } else {
        this.printMoveSuccess(response);
      }
      interface.prompt();
    } catch (err) {
      this.printMoveFailure(err);
      interface.prompt();
    }
  });

  interface.on("close", () => {
    this.exit();
  });
};

module.exports = new cli();
