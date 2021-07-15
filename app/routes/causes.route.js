module.exports = (app) => {
  const cause = require("../controllers/causes.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  // Create User
  router.post("/", cause.createcause);
  router.get("/getallcauses", cause.finallallcauses);
  router.get("/getcausebyname/:name", cause.findcausebyname);
  router.put("/updateCause/:id", cause.updateCause);
  router.put("/disableCause/:id", cause.disablecause);
  router.put("/enableCause/:id", cause.enableCause);

  app.use("/api/cause", router);
};
