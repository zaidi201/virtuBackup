const db = require("../models");
const comments = db.citizenNotifications;
// const Shop = db.shops;
const Op = db.Sequelize.Op;
// const jwt = require("jsonwebtoken");
// const tokenData = require("../config/auth.config");

//const accessTokenSecret = tokenData.secret;
// Create and Save a new User
exports.createcitizennotification = async (req, res) => {
  // Create comment
  const earnedpoint = {
    citizenProfileId: req.body.citizenProfileId,
    notificationEntityId: req.body.notificationEntityId,
    notificationText: req.body.notificationText,
    isRead: req.body.isRead,
    isEnable: 1,
  };
  comments
    .create(earnedpoint)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "citizen notifications cant be created",
      });
    });
};
exports.findallnotifications = async (req, res) => {
  comments
    .findAll({
      //^^^^^^^^^^^^^^^^^^^^^^^^^^
      where: {},
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no earned points was found",
      });
    });
};

exports.findnotificationsbycitizenid = async (req, res) => {
  let commentDetail = [];
  comments
    .findAll({
      where: { citizenProfileId: req.params.id },
      order: [["updatedAt", "DESC"]],
    })
    .then(async (data) => {
      for (let i = 0; i < data.length; i++) {
        var cmnt = new Object();
        await db.citizenProfiles
          .findOne({ where: { id: data[i].notificationEntityId } })
          .then(async (data1) => {
            await db.citizenProfileAssets
              .findOne({
                where: { citizenProfileId: data[i].notificationEntityId },
              })
              .then(async (data2) => {
                cmnt.notificationDetail = data[i];
                cmnt.citizenProfile = {
                  citizenName: data1.citizenName,
                  citizenId: data1.id,
                };
                cmnt.citizenProfileAsset = data2;
              })
              .catch((err) => {
                res.status(500).send({
                  message: err.message || "this citizen has no assets ",
                });
              });
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "citizen doesnt exist",
            });
          });
        commentDetail.push(cmnt);
      }
      res.send(commentDetail);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "this citizen has no notifications ",
      });
    });
};

exports.updatecitizennotification = async (req, res) => {
  const id = req.params.id;

  comments
    .update(req.body, {
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: " updated successfully .",
        });
      } else {
        res.status(500).send({
          message: "Error updating  id=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating  id=" + id,
      });
    });
};

exports.disablecitizennotification = async (req, res) => {
  const id = req.params.id;

  comments
    .update(
      { isEnable: 0 },
      {
        where: { id: id },
      }
    )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: " disable successfully .",
        });
      } else {
        res.send({
          message: `Cannot disable  id:${id}. Please check  ID.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating  id=" + id,
      });
    });
};

exports.enablecitizennotification = async (req, res) => {
  const id = req.params.id;

  comments
    .update(
      { isEnable: 1 },
      {
        where: { id: id },
      }
    )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: " enable successfully .",
        });
      } else {
        res.send({
          message: `Cannot enable  id:${id}. Please check  ID.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating  id=" + id,
      });
    });
};
