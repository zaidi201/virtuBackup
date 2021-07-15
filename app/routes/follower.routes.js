module.exports = (app) => {
  const deedLikes = require("../controllers/followers.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  router.post("/", deedLikes.createFollower);
  router.get("/findallFollower", deedLikes.findallFollower);
  router.get(
    "/followerCitizenForTags/:id",
    deedLikes.getFollowerCitizenForTags
  );
  router.post("/findfollwerCitizenID", deedLikes.findFollowerCitizenProfile);
  router.get("/findbycitizenid/:id", deedLikes.findcitizenProfileId);

  router.put("/updateById/:id", deedLikes.updateFollowers);
  router.put("/disableById/:id", deedLikes.disableFollower);
  router.put("/EnableById/:id", deedLikes.enableFollower);

  app.use("/api/follower", router);
};
