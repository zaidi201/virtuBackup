module.exports = (app) => {
  const cause = require("../controllers/citizenActivity.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  // Create User

  router.get("/getCitizenActivity/:id", cause.findAllCitizenActivity);

  app.use("/api/activity", router);
};
