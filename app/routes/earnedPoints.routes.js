module.exports = (app) => {
  const deedComments = require("../controllers/earnedPoints.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  router.post("/", deedComments.createearnedpoints);
  router.get("/findall", deedComments.findallearnedpoints);
  router.get("/findByCitizenId/:id", deedComments.findearnedpointsbycitizenid);
  router.get(
    "/findByPointTitleId/:id",
    deedComments.findearnedpointsbypointtitleid
  );

  router.put("/updateById/:id", deedComments.updateEarnedPoint);
  router.put("/disableById/:id", deedComments.disableEarnedPoint);
  router.put("/enableById/:id", deedComments.enableEarnedPoint);

  app.use("/api/earnedPoints", router);
};
