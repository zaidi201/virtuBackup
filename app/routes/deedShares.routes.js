module.exports = (app) => {
  const deedComments = require("../controllers/deedShares.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  router.post("/", deedComments.createdeedshare);
  router.get("/findall", deedComments.findalldeedshares);
  router.get("/findByCitizenId/:id", deedComments.finddeedsharesbycitizen);
  router.get("/findTocitizenid/:id", deedComments.finddeedsharesoftocitizen);

  router.put("/updateById/:id", deedComments.updateDeedShare);
  router.put("/disableById/:id", deedComments.disableDeedShare);
  router.put("/enableById/:id", deedComments.enableDeedShares);

  app.use("/api/deedShares", router);
};
