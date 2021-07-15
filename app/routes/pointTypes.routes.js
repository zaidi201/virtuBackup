module.exports = (app) => {
  const cause = require("../controllers/pointTypes.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  // Create User
  router.post("/", cause.createPointTypes);
  router.get("/findall", cause.findAllPointTypes);

  app.use("/api/pointTypes", router);
};
