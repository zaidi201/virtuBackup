const db = require("../models");
const comments = db.causeType;
// const Shop = db.shops;
const Op = db.Sequelize.Op;
// const jwt = require("jsonwebtoken");
// const tokenData = require("../config/auth.config");

//const accessTokenSecret = tokenData.secret;
// Create and Save a new User
exports.createCauseType = async (req, res) => {
  // Create comment
  const earnedpoint = {
    causeTypeName: req.body.causeTypeName,
    isEnable: 1,
  };
  comments
    .create(earnedpoint)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "created",
      });
    });
};

exports.getAllCauseTypes = async (req, res) => {
  await comments
    .findAll({
      //^^^^^^^^^^^^^^^^^^^^^^^^^^
      where: {},
    })
    .then(async (d) => {
      res.send(d);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no cause was found",
      });
    });
};
