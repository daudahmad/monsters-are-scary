const readline = require("readline");
const util = require("util");
// const EventEmitter = require("events");
const Game = require("./Game");

// class cliEventEmitter extends EventEmitter {}

// const mycliEmitter = new cliEventEmitter();

// mycliEmitter.on("exit", () => {
//   console.log("Game exiting. Bye!");
//   process.exit(0);
// });

// mycliEmitter.on("move", function(moveDirection) {
  //   console.log(moveDirection);
  // myCli.move(moveDirection);
// });

// mycliEmitter.on("MN", function(moveDirection) {
  //   console.log(moveDirection);
  //   myCli.move(moveDirection);
// });

/*
    Declaraing the cli function
*/
const cli = function() {
  // this.game = new Game();
  // console.log(this.game);
};

/*
    Print and introduction to the game when it first launches 
*/
cli.prototype.introduction = function() {
  console.log("\n", "------Welcome to MONSTER ARE SCARY!------", "\n");
  console.log(
    "* Monsters Are Scary places the player in a grid of rooms. Each room has 4 doors."
  );
  console.log(
    "* Some rooms have monsters in them. Other rooms have gold in them."
  );
  console.log(
    "* When you find GOLD your score will increment by 1. When you encounter a monster you will lose 1 health"
  );
  console.log("* You will start with 5 health and die when health reaches 0");
  console.log(
    "* The player can move either North, South, East or West by typing a command at the console. "
  );
  console.log(
    "* To begin playing: Move North: MN, Move South: MS, Move East: ME, Move West: MW"
  );
  console.log(
    "* To Move North type: MN, To Move South: MS, To Move East: ME, To Move West: MW"
  );
};

// cli.prototype.move = function(moveDirection) {
//   this.game.move(moveDirection);
// };

cli.prototype.processCommands = function(command) {
  if (typeof command == "string" && command.trim().length > 0) {
    const validCommands = ["MN", "MS", "ME", "MW"];
    command = command.trim().toUpperCase();
    if (validCommands.includes(command)) {
      //   mycliEmitter.emit("move", command);
      return this.game.move(command);
      //   console.log(this.game);
    } else if (command === "EXIT" || command === "E") {
      this.exit();
      //   mycliEmitter.emit("exit");
    } else {
      //   console.log();
      return Promise.resolve("Invalid command, please try again!");
    }
  }
};

cli.prototype.exit = function() {
  console.log("Game exiting. Bye!");
  process.exit(0);
};

cli.prototype.init = function() {
  this.game = new Game();
  console.log(this.game);

  this.introduction();

  const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "MONSTERS-ARE-CRAZY>"
  });

  interface.prompt();

  interface.on("line", command => {
    // this should return a promise since commands will be processed asynchronously
    this.processCommands(command)
      .then(response => {
        console.log(response);
        console.log(this.game);
        if (response.isDead) {
          this.exit();
        }
        interface.prompt();
      })
      .catch(err => {
        console.log(err);
        interface.prompt();
      });
  });

  interface.on("close", () => {
    this.exit();
  });
};

// const myCli = new cli();

module.exports = new cli();
