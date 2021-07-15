module.exports = (app) => {
  const email = require("../controllers/emailverification.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  // Create User
  router.post("/verifycitizen", email.verified);
  router.post("/anyQuestions", email.question);

  app.use("/api/emailverify", router);
};
