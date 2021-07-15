const { deedSentiment } = require("../models");
const db = require("../models");
const deedsentiment = db.deedSentiment;
// const Shop = db.shops;
const Op = db.Sequelize.Op;
// const jwt = require("jsonwebtoken");
// const tokenData = require("../config/auth.config");

//const accessTokenSecret = tokenData.secret;
// Create and Save a new User
exports.createdeedsentiment = async (req, res) => {
  let cid = await db.deeds.findOne({
    where: { id: req.body.deedId },
  });
  if (!cid)
    return res.status(403).send({
      message: "deed not found",
    });
  let deedCheck = await deedsentiment.findOne({
    where: {
      deedId: req.body.deedId,
      citizenProfileId: req.body.citizenProfileId,
      isEnable: 1,
    },
  });
  if (!deedCheck) {
    const deed_sentiment = {
      deedId: req.body.deedId,
      citizenProfileId: req.body.citizenProfileId,
      sentimentTypeId: req.body.sentimentTypeId,
      isEnable: 1,
    };
    await deedsentiment
      .create(deed_sentiment)
      .then(async (data) => {
        const logger = {
          citizenProfileId: req.body.citizenProfileId,
          // notificationEntityId: data.id,
          entityId: req.body.deedId,
          log: "You reacted on deed " + `"${cid.deedTitle}"`,
          isDeed: 1,
          isEnable: 1,
        };
        await db.citizenActivity
          .create(logger)
          .then((data) => {})
          .catch((err) => {
            res.status(500).send({
              message: err.message || "citizen activity cant be created",
            });
          });

        if (cid.citizenProfileId != req.body.citizenProfileId) {
          const cmntNotification = {
            citizenProfileId: cid.citizenProfileId,
            // notificationEntityId: data.id,
            notificationEntityId: req.body.citizenProfileId,
            notificationText: "reacted on your deed",
            isRead: 0,
            isEnable: 1,
          };
          await db.citizenNotifications
            .create(cmntNotification)
            .then((data) => {
              console.log("commnent notification added");
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "citizen notifications cant be created",
              });
            });
        }
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "deed sentiment cant be created",
        });
      });
  } else {
    await deedsentiment
      .update(
        { sentimentTypeId: req.body.sentimentTypeId },
        {
          where: {
            deedId: req.body.deedId,
            citizenProfileId: req.body.citizenProfileId,
          },
        }
      )
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
  }

  // Create comment
};
exports.findalldeedsentiments = async (req, res) => {
  deedsentiment
    .findAll({
      //^^^^^^^^^^^^^^^^^^^^^^^^^^
      where: {},
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no deed sentiment was found",
      });
    });
};

exports.finddeedsentimentbydeedid = async (req, res) => {
  const deedid = req.params.id;
  deedsentiment
    .findAll({ where: { deedId: deedid } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "this deed is has no deed sentiments ",
      });
    });
};

exports.finddeedsentimentbycitizenid = async (req, res) => {
  const c_id = req.params.id;
  deedsentiment
    .findAll({ where: { citizenProfileId: c_id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "this citizen has no deed sentiments ",
      });
    });
};

exports.updateDeedSentiment = async (req, res) => {
  const id = req.params.id;

  deedsentiment
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

exports.disableDeedSentiment = async (req, res) => {
  const id = req.params.id;

  deedsentiment
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

exports.enableDeedSentiment = async (req, res) => {
  const id = req.params.id;

  deedsentiment
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
