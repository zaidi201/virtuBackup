const db = require("../models");
const comments = db.assetTypes;
// const Shop = db.shops;
const Op = db.Sequelize.Op;
// const jwt = require("jsonwebtoken");
// const tokenData = require("../config/auth.config");

//const accessTokenSecret = tokenData.secret;
// Create and Save a new User
exports.createAssetTypes = async (req, res) => {
  // Create comment
  const earnedpoint = {
    assetTypeName: req.body.assetTypeName,
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
