const db = require("../models");
const comments = db.citizenActivity;
// const Shop = db.shops;
const Op = db.Sequelize.Op;

exports.findAllCitizenActivity = async (req, res) => {
  await comments
    .findAll({
      where: { citizenProfileId: req.params.id },
      order: [["updatedAt", "DESC"]],
    })
    .then(async (data) => {
      let detail = [];

      for (let i = 0; i < data.length; i++) {
        let obj = new Object();
        if (data[i].isDeed == 1) {
          await db.deedAssets
            .findOne({
              where: { deedId: data[i].entityId, assetTitle: "cover" },
            })
            .then((assetData) => {
              if (assetData) {
                obj.logDetail = data[i];
                obj.assetUrl = assetData.assetUrl;
                detail.push(obj);
              } else {
                obj.logDetail = data[i];
                obj.assetUrl = null;
                detail.push(obj);
              }
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "this deed has no deed assets ",
              });
            });
        } else {
          await db.citizenProfileAssets
            .findOne({ where: { citizenProfileId: data[i].entityId } })
            .then((assetData) => {
              if (assetData) {
                obj.logDetail = data[i];
                obj.assetUrl = assetData.urlAsset;
                detail.push(obj);
              } else {
                obj.logDetail = data[i];
                obj.assetUrl = null;
                detail.push(obj);
              }
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "this deed has no deed assets ",
              });
            });
        }
      }
      res.send(detail);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no notification type found",
      });
    });
};
