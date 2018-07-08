const chalk = require("chalk");

const styleOutput = text => chalk.bgWhite.black(` ${text} `);

module.exports = {
  styleOutput
};
