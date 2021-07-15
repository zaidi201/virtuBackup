module.exports = (app) => {
  const cause = require("../controllers/citizenProfileAssets.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  // Create User
  router.post("/", cause.createProfileassets);

  router.get("/findAll", cause.findallassets);
  router.get("/findByCitizenid/:id", cause.findassetsbycitizenid);
  router.put("/update/:id", cause.updateassets);
  router.put("/disable/:id", cause.disableassets);
  router.put("/enable/:id", cause.enableassets);

  app.use("/api/CitizenProfileAssets", router);
};
