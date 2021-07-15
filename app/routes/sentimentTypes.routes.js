module.exports = (app) => {
  const deedLikes = require("../controllers/sentimentTypes.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  router.post("/", deedLikes.createsentimenttype);
  router.get("/findall", deedLikes.findallsentimenttypes);
  router.get("/findbyId/:id", deedLikes.findsentimenttypebyid);

  router.put("/updateById/:id", deedLikes.updateSentimentType);
  router.put("/disableById/:id", deedLikes.disableSentimentType);
  router.put("/EnableById/:id", deedLikes.enableSentimentTypes);

  app.use("/api/sentimentTypes", router);
};
