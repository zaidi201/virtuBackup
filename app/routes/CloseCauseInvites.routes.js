module.exports = (app) => {
  const cause = require("../controllers/closeCauseinvites.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  // Create User
  router.post("/", cause.createclosecauseinvites);
  router.get("/findAll", cause.findallclosecauseinvites);
  router.get("/findByCauseId/:id", cause.findclosecauseinvitesbycauseid);

  router.put("/updateById/:id", cause.updatecloseCauseInvites);
  router.put("/disableById/:id", cause.disablCloseCauseInvites);
  router.put("/enableById/:id", cause.enableCloseCauseInvites);

  app.use("/api/closeCauseinvites", router);
};
