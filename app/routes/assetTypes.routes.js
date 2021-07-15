module.exports = (app) => {
  const cause = require("../controllers/assetTypes.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  // Create User
  router.post("/", cause.createAssetTypes);

  app.use("/api/assetTypes", router);
};
