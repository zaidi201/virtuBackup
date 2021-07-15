module.exports = (app) => {
  const cause = require("../controllers/citizenNotification.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  // Create User
  router.post("/", cause.createcitizennotification);
  router.get("/getAllcitizenNotification", cause.findallnotifications);
  router.get(
    "/citizenNotificationByCitizenid/:id",
    cause.findnotificationsbycitizenid
  );

  router.put("/updateCitizenNotification/:id", cause.updatecitizennotification);
  router.put(
    "/disableCitizenNotification/:id",
    cause.disablecitizennotification
  );
  router.put("/enableCitzenNotification/:id", cause.enablecitizennotification);

  app.use("/api/CitizenNotification", router);
};
