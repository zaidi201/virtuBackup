module.exports = (app) => {
  const deedComments = require("../controllers/deedtaggedcitizen.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  router.post("/", deedComments.createdeedtaggedcitizen);
  router.get("/findall", deedComments.findalldeedtaggedcitizen);
  router.get(
    "/findByCitizenId/:id",
    deedComments.finddeedtaggedcitizenbycitizenid
  );
  router.get("/findByDeedId/:id", deedComments.findtaggedcitizenbydeedid);

  router.put("/updateById/:id", deedComments.updateDeedTaggedCitizen);
  router.put("/disableById/:id", deedComments.disableDeedTaggedCitizen);
  router.put("/enableById/:id", deedComments.enableDeedTaggedCitizen);

  app.use("/api/deedtaggedcitizen", router);
};
