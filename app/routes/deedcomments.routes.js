module.exports = (app) => {
  const deedComments = require("../controllers/deedcomments.controller");
  //   const authJwt = require("../middlewares/authJwt");

  var router = require("express").Router();

  router.post("/", deedComments.createcomments);
  router.get("/findallallcomments", deedComments.findallcomments);
  router.get(
    "/findcommentbycitizenid/:id",
    deedComments.findcommentsbycitizenid
  );
  router.get("/findcommentbydeedid/:id", deedComments.findcommentsbydeedid);

  router.put("/updateByDeedId/:id", deedComments.updateComments);
  router.put("/disableById/:id", deedComments.disablecomments);
  router.put("/enableById/:id", deedComments.enablecomments);

  app.use("/api/deedcomments", router);
};
