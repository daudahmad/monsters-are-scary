const cli = require("../client/cli");
const expressServer = require("../server");
const chai = require("chai");
chai.should();

process.env.NODE_ENV = "test";

console.log(cli);
expressServer.server.init();
// cli.init();

const game = cli.game;

describe("Test the game command line", () => {
  it("it should move the player one room to the North", async () => {
    const response = await game.move("MN");
    console.log(response);
    console.log(game);
    if (game.lastRoomContents === "GOLD") {
      game.health.should.be.equal(5);
      game.score.should.be.equal(1);
    } else {
      game.health.should.be.equal(4);
      game.score.should.be.equal(0);
    }
    game.x.should.be.equal(1);
    game.y.should.be.equal(0);
  });

  it("it should try to move the player one room to the West but fail", async () => {
    const {health: prevHealth, score: prevScore, x: prevX, y: prevY} = game;
    let response;
    try {
      response = await game.move("MW");
    } catch (err) {
      //   console.log(err);
    }
    game.health.should.be.equal(prevHealth);
    game.score.should.be.equal(prevScore);
    game.x.should.be.equal(prevX);
    game.y.should.be.equal(prevY);
  });

  it("it should move the player one room to the East", async () => {
    const {health: prevHealth, score: prevScore, x: prevX, y: prevY} = game;
    const response = await game.move("ME");
    if (game.lastRoomContents === "GOLD") {
      game.health.should.be.equal(prevHealth);
      game.score.should.be.equal(prevScore+1);
    } else {
      game.health.should.be.equal(prevHealth-1);
      game.score.should.be.equal(prevScore);
    }
    game.x.should.be.equal(prevX);
    game.y.should.be.equal(prevY+1);
  });
});

expressServer.server.close();
