module.exports = (app) => {
  const deedLikes = require("../controllers/notificationTypes.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  router.post("/", deedLikes.createnotificationtype);
  router.get("/getAllTypes", deedLikes.findallnotificationttype);
  router.get("/findlikesbycitizenid/:id", deedLikes.findbynotificationgroupid);
  router.get(
    "/findlikesbycitizenid/:name",
    deedLikes.findnotificationtypebyname
  );

  router.put("/updateById/:id", deedLikes.updateNotificationType);
  router.put("/disableById/:id", deedLikes.disableNotificationType);
  router.put("/EnableById/:id", deedLikes.enableNotificationType);

  app.use("/api/notificationTypes", router);
};
