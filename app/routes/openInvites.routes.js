module.exports = (app) => {
  const deeds = require("../controllers/openInvites.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  router.post("/", deeds.createopneinvites);
  router.get("/findall", deeds.findAllopeninvites);
  router.get("/findbyCitizenId/:id", deeds.findopeninvitesbycitizenid);

  router.put("/updateById/:id", deeds.updateOpenInvites);
  router.put("/enableById/:id", deeds.enableOpenInvites);
  router.put("/disableById/:id", deeds.disableOpenInvites);

  app.use("/api/openInvites", router);
};
