const server = require("./server");
const client = require("./client");

const app = {
  init() {
    console.log("init called");

    // Start the server
    server.init();

    // Start the game's command line interface after a short while
    setTimeout(() => {
      client.init();
    }, 100);
  }
};

app.init();

module.exports = app;
