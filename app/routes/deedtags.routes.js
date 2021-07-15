module.exports = (app) => {
  const deedTags = require("../controllers/deedtags.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  router.post("/", deedTags.createdeedtags);
  router.post("/searchByName", deedTags.searchByName);
  router.get("/finalldeedtags", deedTags.findalldeedtags);

  router.get("/finddeedtagbydeedid/:id", deedTags.finddeedtagsbydeedid);

  router.put("/updateById/:id", deedTags.updateDeedTag);
  router.put("/disableById/:id", deedTags.disableDeedTag);
  router.put("/enableById/:id", deedTags.enableDeedTag);

  app.use("/api/deedtags", router);
};
