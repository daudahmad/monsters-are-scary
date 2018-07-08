const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

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

    app.listen(PORT, () =>
      console.log(
        `MONSTERS ARE SCARY API server started...listening on port ${PORT}`
      )
    );
  }
};

module.exports = { server, app };
