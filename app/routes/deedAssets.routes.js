module.exports = (app) => {
  const cause = require("../controllers/deedassets.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  // Create User
  router.post("/", cause.createdeedassets);

  router.get("/findAll", cause.findalldeedassets);
  router.get("/findByAssetTypeId/:id", cause.finddeedassetsbyassetTypeId);
  router.get("/findByDeedId/:id", cause.finddeedassetsbydeedid);
  router.put("/updateByid/:id", cause.updatedeedassets);
  router.put("/disableById/:id", cause.disabledeedassets);
  router.put("/enableById/:id", cause.enabledeedassets);

  app.use("/api/deedAssets", router);
};
