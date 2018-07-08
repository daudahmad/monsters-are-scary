const router = require("express").Router();
const GridOfRooms = require("../models/gridOfRooms");

let gridOfRooms = new GridOfRooms(50, 50);
gridOfRooms.initializeGrid();
// console.log(gridOfRooms);
// console.log(grid.gridOfRooms);
// console.log(grid.gridOfRooms[0][0]);
// console.log(grid.gridOfRooms[0][1]);
// console.log(grid.gridOfRooms[1][1]);

router.get("/room/:x/:y", function(req, res) {
  res
    .status(200)
    .type("text")
    .send(gridOfRooms.rooms[req.params.x][req.params.y]);
});

module.exports = router;
