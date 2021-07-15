const db = require("../models");
const comments = db.citizenNotificationSettings;
// const Shop = db.shops;
const Op = db.Sequelize.Op;
// const jwt = require("jsonwebtoken");
// const tokenData = require("../config/auth.config");

//const accessTokenSecret = tokenData.secret;
// Create and Save a new User
exports.createSettings = async (req, res) => {
  // Create comment
  const earnedpoint = {
    citizenProfileId: req.body.citizenProfileId,
    notificationsTypeId: req.body.notificationsTypeId,
    isSettingEnable: 1,
    isEnable: 1,
  };
  comments
    .create(earnedpoint)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "citizen settings created",
      });
    });
};

exports.findsettingsbynotificationtypeid = async (req, res) => {
  comments
    .findAll({
      where: { notificationsTypeId: req.params.id },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no notification type found",
      });
    });
};

exports.findbycitizenid = async (req, res) => {
  comments
    .findAll({ where: { citizenProfileId: req.params.id } })
    .then(async (cdata) => {
      await db.notificationTypes
        .findAll({
          //^^^^^^^^^^^^^^^^^^^^^^^^^^
          where: {},
        })
        .then(async (tdata) => {
          await db.notificationGroups
            .findAll({
              //^^^^^^^^^^^^^^^^^^^^^^^^^^
              where: {},
            })
            .then((gdata) => {
              res.send({
                citizenSettings: cdata,
                notificationsType: tdata,
                notificationGroup: gdata,
              });
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "no groups was found",
              });
            });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "no types was found",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no record found by this name ",
      });
    });
};

exports.updatenotificationsetting = async (req, res) => {
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
        res.send({
          message: `Cannot update  id:${id}. Please check  ID.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating  id=" + id,
      });
    });
};

exports.disablenotificationsetting = async (req, res) => {
  const id = req.params.citizenId;
  const notificationId = req.params.notificationId;

  comments
    .update(
      { isSettingEnable: 0 },
      {
        where: { citizenProfileId: id, notificationsTypeId: notificationId },
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

exports.enablenotificationsetting = async (req, res) => {
  const id = req.params.citizenId;
  const notificationId = req.params.notificationId;

  comments
    .update(
      { isSettingEnable: 1 },
      {
        where: { citizenProfileId: id, notificationsTypeId: notificationId },
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
