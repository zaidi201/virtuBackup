const db = require("../models");
const comments = db.deedComments;
// const Shop = db.shops;
const Op = db.Sequelize.Op;
// const jwt = require("jsonwebtoken");
// const tokenData = require("../config/auth.config");

//const accessTokenSecret = tokenData.secret;
// Create and Save a new User
exports.createcomments = async (req, res) => {
  // Create comment
  const comment = {
    deedId: req.body.deedId,
    citizenProfileId: req.body.citizenProfileId,
    comments: req.body.comments,
    isApproved: req.body.isApproved,
    isEnable: 1,
  };

  let cid = await db.deeds.findOne({
    where: { id: req.body.deedId },
  });
  if (!cid)
    return res.status(403).send({
      message: "deed not found",
    });

  comments
    .create(comment)
    .then(async (data) => {
      const logger = {
        citizenProfileId: req.body.citizenProfileId,
        // notificationEntityId: data.id,
        entityId: req.body.deedId,
        log: "You commented deed" + " " + cid.deedTitle,
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
          notificationText: "commented on your deed",
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
        message: err.message || "comment cant be created",
      });
    });
};
exports.findallcomments = async (req, res) => {
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
        message: err.message || "no comments was found",
      });
    });
};

exports.findcommentsbydeedid = async (req, res) => {
  const deedid = req.params.id;
  let commentDetail = [];
  await comments
    .findAll({ where: { deedId: deedid }, order: [["updatedAt", "DESC"]] })
    .then(async (data) => {
      for (let i = 0; i < data.length; i++) {
        var cmnt = new Object();
        await db.citizenProfiles
          .findOne({ where: { id: data[i].citizenProfileId } })
          .then(async (data1) => {
            await db.citizenProfileAssets
              .findOne({
                where: { citizenProfileId: data[i].citizenProfileId },
              })
              .then((data2) => {
                cmnt.commentDetail = data[i];
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
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "this deed is has no comments ",
      });
    });
  res.send(commentDetail);
};

exports.findcommentsbycitizenid = async (req, res) => {
  comments
    .findAll({ where: { citizenProfileId: req.params.id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "this citizen has no comments ",
      });
    });
};

exports.updateComments = async (req, res) => {
  const id = req.params.id;

  comments
    .update(req.body, {
      where: { deedId: id },
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

exports.disablecomments = async (req, res) => {
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

exports.enablecomments = async (req, res) => {
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
