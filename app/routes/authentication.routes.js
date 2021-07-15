module.exports = (app) => {
  const authentication = require("../controllers/authentication.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  router.post("/login", authentication.LoginVerify);
  router.post("/changePassword", authentication.resetPassword);
  router.post("/forgotPassword", authentication.forgetPass);
  router.post("/resetPassword", authentication.resetPassAfterForget);
  router.post("/resetPassword", authentication.resetPassAfterForget);
  router.post("/chat", authentication.createChat);
  app.use("/api/auth", router);
};
