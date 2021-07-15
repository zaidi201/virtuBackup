const db = require("../models");
const comments = db.followers;
// const Shop = db.shops;
const Op = db.Sequelize.Op;
// const jwt = require("jsonwebtoken");
// const tokenData = require("../config/auth.config");

//const accessTokenSecret = tokenData.secret;
// Create and Save a new User
exports.createFollower = async (req, res) => {
  let check = await db.citizenProfiles.findOne({
    where: { id: req.body.citizenProfileId },
  });
  if (!check)
    return res.status(403).send({
      message: "citizen with this id doest not exist",
    });
  let check1 = await db.citizenProfiles.findOne({
    where: { id: req.body.followerCitizenProfileId },
  });
  if (!check1)
    return res.status(403).send({
      message: "citizen with this id doest not exist",
    });
  await comments
    .findOne({
      //^^^^^^^^^^^^^^^^^^^^^^^^^^
      where: {
        citizenProfileId: req.body.citizenProfileId,
        followerCitizenProfileId: req.body.followerCitizenProfileId,
      },
    })
    .then(async (data) => {
      if (!data) {
        let cid1 = await db.citizenProfiles.findOne({
          where: { id: req.body.citizenProfileId },
        });
        if (!cid1)
          return res.status(403).send({
            message: "citizen not found",
          });

        const logger = {
          citizenProfileId: req.body.followerCitizenProfileId,
          // notificationEntityId: data.id,
          entityId: req.body.citizenProfileId,
          log: "You followed" + " " + cid1.citizenName,
          isDeed: 0,
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

        const earnedpoint = {
          citizenProfileId: req.body.citizenProfileId,
          followerCitizenProfileId: req.body.followerCitizenProfileId,
          isEnable: 1,
        };
        await comments
          .create(earnedpoint)
          .then(async (data) => {
            const cmntNotification = {
              citizenProfileId: req.body.citizenProfileId,
              notificationEntityId: req.body.followerCitizenProfileId,
              notificationText: "started following you",
              isRead: 0,
              isEnable: 1,
            };
            await db.citizenNotifications
              .create(cmntNotification)
              .then((data) => {
                console.log("following notification added");
              })
              .catch((err) => {
                res.status(500).send({
                  message:
                    err.message || "citizen notifications cant be created",
                });
              });

            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "follower cant be created",
            });
          });
      } else {
        await db.followers
          .destroy({
            where: { id: data.id },
          })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: " unfollow successfully .",
              });
            } else {
              res.send({
                message: `Cannot delete like with id=${id}. Please check ID.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "Error deleting User with id=" + id,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no Follower was found",
      });
    });

  // Create comment
  // const earnedpoint = {
  //   citizenProfileId: req.body.citizenProfileId,
  //   followerCitizenProfileId: req.body.followerCitizenProfileId,
  //   isEnable: 1,
  // };
  // comments
  //   .create(earnedpoint)
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "follower cant be created",
  //     });
  //   });
};
exports.findallFollower = async (req, res) => {
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
        message: err.message || "no Follower was found",
      });
    });
};

exports.findFollowerCitizenProfile = async (req, res) => {
  let d = [];
  let followerid = [];
  let followerDetail = [];

  d.push(req.body.followerId);

  for (let a = 0; a < d[0].length; a++) {
    followerid.push(d[0][a]);
  }

  var deed = new Object();
  for (let w = 0; w < followerid.length; w++) {
    await db.citizenProfiles
      .findOne({ where: { id: followerid[w] } })
      .then(async (data) => {
        followerDetail.push((deed.citizenProfile = data));
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "no follower to this citizen ",
        });
      });
  }

  res.send(followerDetail);
};

exports.findcitizenProfileId = async (req, res) => {
  comments
    .findAll({ where: { citizenProfileId: req.params.id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no followers by this citizen ",
      });
    });
};

exports.updateFollowers = async (req, res) => {
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

exports.disableFollower = async (req, res) => {
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

exports.enableFollower = async (req, res) => {
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

exports.getFollowerCitizenForTags = async (req, res) => {
  let arr = [];
  comments
    .findAll({ where: { citizenProfileId: req.params.id } })
    .then(async (fdata) => {
      for (let i = 0; i < fdata.length; i++) {
        await db.citizenProfiles
          .findOne({ where: { id: fdata[i].followerCitizenProfileId } })
          .then((namedata) => {
            arr.push({
              id: fdata[i].followerCitizenProfileId,
              citizenName: namedata.citizenName,
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "citizen doesnt exist",
            });
          });
      }
      res.send(arr);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no followers by this citizen ",
      });
    });
};
