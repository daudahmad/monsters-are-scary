const router = require("express").Router();

router.use("/", require("./rooms.js"));

module.exports = router;
