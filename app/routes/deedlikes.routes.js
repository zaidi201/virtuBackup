module.exports = (app) => {
  const deedLikes = require("../controllers/deedlikes.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  router.post("/", deedLikes.createlikes);
  router.get("/finallalllikes", deedLikes.findalllikes);
  router.get("/findlikesbycitizenid/:id", deedLikes.findlikessbycitizenid);
  router.get("/findlikesbydeedid/:id", deedLikes.findlikesbydeedid);

  router.put("/updateById/:id", deedLikes.updateLikes);
  router.put("/disableById/:id", deedLikes.disablelikes);
  router.put("/EnableById/:id", deedLikes.enablelikes);
  router.delete("/deleteLikeById/:id", deedLikes.deleteLike);
  app.use("/api/deedlikes", router);
};
