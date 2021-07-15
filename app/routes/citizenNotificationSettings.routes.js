module.exports = (app) => {
  const cause = require("../controllers/citizenNotificationsettings.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  // Create User
  router.post("/", cause.createSettings);

  router.get(
    "/citizenNotificationSettingsByCitizenid/:id",
    cause.findbycitizenid
  );
  router.get(
    "/citizenNotificationSettingsByNotificationTypeid/:id",
    cause.findsettingsbynotificationtypeid
  );
  router.put(
    "/updateCitizenNotificationSettings/:id",
    cause.updatenotificationsetting
  );
  router.put(
    "/disableCitizenNotificationSettings/:citizenId/:notificationId",
    cause.disablenotificationsetting
  );
  router.put(
    "/enableCitzenNotificationSettings/:citizenId/:notificationId",
    cause.enablenotificationsetting
  );

  app.use("/api/CitizenNotificationSettings", router);
};
