module.exports = (app) => {
  const deeds = require("../controllers/deeds.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  router.post("/", deeds.createdeed);
  router.post("/getDeedByName", deeds.searchDeedByName);
  router.get("/finallalldeeds", deeds.finallalldeeds);
  router.get("/finddeedbycauseid/:id", deeds.finddeedbycauseid);
  router.get(
    "/finddeedandcausebycitizenid/:id",
    deeds.finddeedandcausebycitizenid
  );
  router.get("/findbydeedid/:id", deeds.findbydeedid);

  router.put("/updateById/:id", deeds.updatedeeds);
  router.put("/enableById/:id", deeds.enabledeed);
  router.put("/disableById/:id", deeds.disabledeed);

  app.use("/api/deeds", router);
};
