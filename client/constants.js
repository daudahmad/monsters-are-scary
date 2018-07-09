const moveNorth = "MN";
const moveSouth = "MS";
const moveEast = "ME";
const moveWest = "MW";
const invalidCommandsMsg = "Invalid command, valid commands are: MN, MS, ME, MW, EXIT please try again!";
const PORT = process.env.PORT || 8080;
const serviceUrl = `http://localhost:${PORT}/room/`;

module.exports = {
  moveNorth: moveNorth,
  moveSouth: moveSouth,
  moveEast: moveEast,
  moveWest: moveWest,
  invalidCommandsMsg: invalidCommandsMsg,
  serviceUrl: serviceUrl
};
