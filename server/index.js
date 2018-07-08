const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;
let running;

const server = {
  init() {
    app.use(require("./routes"));

    app.use(function(err, req, res, next) {
      console.error(err.stack);
      return res.status(err.status).json({ message: err.message });
    });

    app.use(function(req, res) {
      res.status(404).send();
    });

    running = app.listen(PORT, () =>
      console.log(
        `MONSTERS ARE SCARY API server started...listening on port ${PORT}`
      )
    );
  },

  close() {
    running.close();
  }
};

module.exports = { server, app };
