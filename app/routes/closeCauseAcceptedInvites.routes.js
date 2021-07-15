module.exports = (app) => {
  const cause = require("../controllers/closeCauseAcceptedinvites.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  // Create User
  router.post("/", cause.createcloseacceptedinvites);

  router.get("/findAll/:id", cause.findallclosecauseacceptedinvites);

  router.put("/updatebyId/:id", cause.updateclosecauseacceptedinvites);

  app.use("/api/closeCauseAcceptedInvites", router);
};
