module.exports = (app) => {
  const deedsentiment = require("../controllers/deedsentiment.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  router.post("/", deedsentiment.createdeedsentiment);
  router.get("/findalldeedsentiment", deedsentiment.findalldeedsentiments);
  router.get(
    "/findsentimentbycitizenid/:id",
    deedsentiment.finddeedsentimentbycitizenid
  );
  router.get(
    "/findsentimentbydeedid/:id",
    deedsentiment.finddeedsentimentbydeedid
  );

  router.put("/updateById/:id", deedsentiment.updateDeedSentiment);
  router.put("/enableById/:id", deedsentiment.enableDeedSentiment);

  router.put("/DisableById/:id", deedsentiment.disableDeedSentiment);

  app.use("/api/deedsentiment", router);
};
