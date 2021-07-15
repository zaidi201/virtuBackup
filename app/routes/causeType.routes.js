module.exports = (app) => {
  const cause = require("../controllers/causeType.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  // Create User
  router.post("/", cause.createCauseType);
  router.get("/getCauseTypes", cause.getAllCauseTypes);

  app.use("/api/causeTypes", router);
};
