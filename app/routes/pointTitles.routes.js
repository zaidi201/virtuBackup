module.exports = (app) => {
  const deedLikes = require("../controllers/pointTitles.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  router.post("/", deedLikes.createPointTitles);
  router.get("/findall", deedLikes.findAllPointTitles);
  router.get("/findbyname/:name", deedLikes.findPointTitlesBYname);
  router.get("/findByDeedId/:id", deedLikes.findPointTitlesByPointtypeid);
  router.get("/findByPointTitleId/:id", deedLikes.findPointTitlesByid);

  router.put("/updateById/:id", deedLikes.updatePointTitles);
  router.put("/disableById/:id", deedLikes.disablePointTitles);
  router.put("/EnableById/:id", deedLikes.enablePointTitles);

  app.use("/api/pointTitles", router);
};
