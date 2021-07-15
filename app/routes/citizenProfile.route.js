module.exports = (app) => {
  const user = require("../controllers/citizenProfiles.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  // Create User
  router.post("/", user.createUser);
  router.post("/getCitizenByName", user.getcitizenbyname);
  router.get("/getusers", user.finallalluser);
  router.get("/getcitizenbyid/:id", user.getcitizenbyid);
  router.put("/updatecitizen/:id", user.updateUser);
  router.put("/disablecitizen/:id", user.disablecitizen);
  router.put("/enablecitizen/:id", user.enablecitizen);

  app.use("/api/user", router);
};
