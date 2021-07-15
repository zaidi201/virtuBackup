module.exports = (app) => {
  const deedLikes = require("../controllers/notificationGroup.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  router.post("/", deedLikes.createnotificationgroup);
  router.get("/finallalllikes", deedLikes.findallnotificationttype);
  router.get(
    "/findlikesbycitizenid/:name",
    deedLikes.findnotificationgroupbyname
  );

  router.put("/updateById/:id", deedLikes.updateNotificationGroup);
  router.put("/disableById/:id", deedLikes.disableNotificationGroup);
  router.put("/EnableById/:id", deedLikes.enableNotificationGroup);

  app.use("/api/notificationGroup", router);
};
