module.exports = (app) => {
  const cause = require("../controllers/allProfileData.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  router.post("/getDeedDetails", cause.returnDeedDetail);
  router.get("/getAll/:id", cause.profileData);
  router.get("/getCitizenDetails/:id", cause.citizenData);
  router.get("/getDeedIdOfFollowing/:id", cause.deedsIdAndTimeStamps);

  router.get("/getDeedsByUpdatedAt/:id", cause.getDeedsByTime);

  app.use("/api/profileData", router);
};
