module.exports = (app) => {
  const cause = require("../controllers/deedsCategories.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  // Create User

  router.get("/editorPick", cause.editorPick);
  router.get("/popular", cause.popularDeeds);
  router.get("/newDeeds", cause.newDeeds);
  router.get("/bestDeeds", cause.bestDeeds);

  app.use("/api/getDeedsBy", router);
};
