process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);
const possibleReturnVals = ["GOLD", "MONSTER"];

server.server.init();

describe("API endpoint /room/x/y", () => {
  it("it should return contents of the room (0,0)", done => {
    chai
      .request(server.app)
      .get("/room/0/0")
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.be.a("string");
        possibleReturnVals.should.contain(res.text)
        done();
      });
  });

  it("it should return contents of the room (3,3)", done => {
    chai
      .request(server.app)
      .get("/room/3/3")
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.be.a("string");
        possibleReturnVals.should.contain(res.text)
        done();
      });
  });

  it("it should return 400 bad request if room doesn't exist", done => {
    chai
      .request(server.app)
      .get("/room/-1/-1")
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
