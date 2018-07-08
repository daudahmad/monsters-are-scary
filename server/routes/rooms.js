const router = require("express").Router();
const GridOfRooms = require("../models/GridOfRooms");

const sizeX = 100;
const sizeY = 100;
let gridOfRooms = new GridOfRooms(sizeX, sizeY);
gridOfRooms.initializeGrid();
// console.log(gridOfRooms);

const validCoordinates = (x, y) => x >= 0 && x < sizeX && y >= 0 && y < sizeY;

router.get("/room/:x/:y", function(req, res) {
  if (validCoordinates(req.params.x, req.params.y)) {
    res
      .status(200)
      .type("text")
      .send(gridOfRooms.rooms[req.params.x][req.params.y]);
  } else {
    res.status(400).send();
  }
});

module.exports = router;
