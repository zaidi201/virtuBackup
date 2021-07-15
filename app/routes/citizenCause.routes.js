module.exports = (app) => {
  const cause = require("../controllers/citizenCauses.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  // Create User
  router.post("/", cause.createcitizencauses);
  router.get("/getAllcitizenCauses", cause.findallcitizencauses);
  router.get(
    "/citizenCausesByCitizenid/:id",
    cause.findcitizencausesbycitizenid
  );
  router.get("/citizenCausesByCauseid/:id", cause.findcitizencausesbycauseid);

  router.put("/updateCitizenCause/:id", cause.updatecitizencause);
  router.put("/disableCitizenCause/:id", cause.disablecitizencause);
  router.put("/enableCitzenCause/:id", cause.enableCitizenCause);

  app.use("/api/CitizenCause", router);
};
