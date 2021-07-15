const db = require("../models");
const likes = db.deedLikes;
// const Shop = db.shops;
const Op = db.Sequelize.Op;

exports.createlikes = async (req, res) => {
  // Create comment
  const like = {
    deedId: req.body.deedId,
    citizenProfileId: req.body.citizenProfileId,
    isEnable: 1,
  };
  let cid = await db.deeds.findOne({
    where: { id: req.body.deedId },
  });
  if (!cid)
    return res.status(403).send({
      message: "deed not found",
    });

  let cid1 = await db.citizenProfiles.findOne({
    where: { id: req.body.citizenProfileId },
  });
  if (!cid1)
    return res.status(403).send({
      message: "citizen not found",
    });

  let unlike = await db.deedLikes.findOne({
    where: {
      citizenProfileId: req.body.citizenProfileId,
      deedId: req.body.deedId,
    },
  });
  if (!unlike) {
    await likes
      .create(like)
      .then(async (data) => {
        let deedCount = await likes.findAll({
          where: { citizenProfileId: req.body.citizenProfileId },
        });

        if (deedCount.length == 10) {
          let newPointTitle = await db.pointTitles.findOne({
            where: { nameTitle: "Spokesperson-bronze" },
          });
          let PointTitle = newPointTitle.id;

          const earnedpoint = {
            citizenProfileId: req.body.citizenProfileId,
            pointTitleId: PointTitle,
            pointValue: 2,
            isEnable: 1,
          };
          await db.earnedPoints
            .create(earnedpoint)
            .then((data) => {})
            .catch((err) => {
              res.status(500).send({
                message: err.message || "earned points cant be created",
              });
            });
        }
        if (deedCount.length > 10 && deedCount.length <= 25) {
          let newPointTitle = await db.pointTitles.findOne({
            where: { nameTitle: "Spokesperson-bronze" },
          });
          let PointTitle = newPointTitle.id;

          await db.earnedPoints
            .update(
              { pointTitleId: PointTitle },
              {
                where: {
                  citizenProfileId: req.body.citizenProfileId,
                  pointValue: 2,
                },
              }
            )
            .then((num) => {
              if (num == 1) {
                console.log("updated silver");
              } else {
                console.log("not updated silver");
              }
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "Error updating  id=" + id,
              });
            });
        }
        if (deedCount.length >= 26 && deedCount.length <= 50) {
          let newPointTitle = await db.pointTitles.findOne({
            where: { nameTitle: "Spokesperson-silver" },
          });
          let PointTitle = newPointTitle.id;

          await db.earnedPoints
            .update(
              { pointTitleId: PointTitle },
              {
                where: {
                  citizenProfileId: req.body.citizenProfileId,
                  pointValue: 2,
                },
              }
            )
            .then((num) => {
              if (num == 1) {
                console.log("updated silver");
              } else {
                console.log("not updated silver");
              }
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "Error updating  id=" + id,
              });
            });
        }

        if (deedCount.length >= 51) {
          let newPointTitle = await db.pointTitles.findOne({
            where: { nameTitle: "Spokesperson-gold" },
          });
          let PointTitle = newPointTitle.id;

          await db.earnedPoints
            .update(
              { pointTitleId: PointTitle },
              {
                where: {
                  citizenProfileId: req.body.citizenProfileId,
                  pointValue: 2,
                },
              }
            )
            .then((num) => {
              if (num == 1) {
                console.log("updated gold");
              } else {
                console.log("not updated gold");
              }
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "Error updating  id=" + id,
              });
            });
        }

        let citizenPoints = await db.earnedPoints.findOne({
          where: {
            citizenProfileId: req.body.citizenProfileId,

            [Op.and]: [
              {
                pointValue: { [Op.ne]: 2 },
              },
              {
                pointValue: { [Op.ne]: 1 },
              },
              {
                pointValue: { [Op.ne]: 3 },
              },
            ],
          },
        });

        if (citizenPoints) {
          let newPoints = citizenPoints.pointValue + 5;

          let PointTitle = 0;

          if (newPoints >= 100 && newPoints <= 399) {
            let newPointTitle = await db.pointTitles.findOne({
              where: { nameTitle: "Citizen" },
            });
            PointTitle = newPointTitle.id;
          } else if (newPoints >= 400 && newPoints <= 699) {
            let newPointTitle = await db.pointTitles.findOne({
              where: { nameTitle: "Council Member" },
            });
            PointTitle = newPointTitle.id;
          } else if (newPoints >= 700 && newPoints <= 999) {
            let newPointTitle = await db.pointTitles.findOne({
              where: { nameTitle: "House of Representative" },
            });
            PointTitle = newPointTitle.id;
          } else if (newPoints >= 1000) {
            let newPointTitle = await db.pointTitles.findOne({
              where: { nameTitle: "Mayor" },
            });
            PointTitle = newPointTitle.id;
          }

          await db.earnedPoints
            .update(
              { pointTitleId: PointTitle, pointValue: newPoints },
              {
                where: {
                  citizenProfileId: req.body.citizenProfileId,
                  [Op.and]: [
                    {
                      pointValue: { [Op.ne]: 2 },
                    },
                    {
                      pointValue: { [Op.ne]: 1 },
                    },
                    {
                      pointValue: { [Op.ne]: 3 },
                    },
                  ],
                },
              }
            )
            .then((num) => {
              if (num == 1) {
                console.log("peace points updated");
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
        // else {
        //   res.status(200).send({
        //     message:
        //       "earned points are not added for the first time but like is counted",
        //   });
        // }

        const logger = {
          citizenProfileId: req.body.citizenProfileId,
          // notificationEntityId: data.id,
          entityId: req.body.deedId,
          log: "You liked deed" + " " + cid.deedTitle,
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
            notificationEntityId: req.body.citizenProfileId,
            notificationText: "liked your deed",
            isRead: 0,
            isEnable: 1,
          };
          await db.citizenNotifications
            .create(cmntNotification)
            .then((data) => {
              //----------------------------
              //----------------------------
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "citizen notifications cant be created",
              });
            });
        } else {
          res.send({
            message: " updated successfully .",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "like cant be created",
        });
      });
  } else {
    db.deedLikes
      .destroy({
        where: { id: unlike.id },
      })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: " updated successfully .",
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
};

exports.findalllikes = async (req, res) => {
  likes
    .findAll({
      //^^^^^^^^^^^^^^^^^^^^^^^^^^
      where: {},
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no likes was found",
      });
    });
};

exports.findlikesbydeedid = async (req, res) => {
  const deedid = req.params.id;
  likes
    .findAll({ where: { deedId: deedid } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "this deed is has no likes ",
      });
    });
};

exports.findlikessbycitizenid = async (req, res) => {
  const c_id = req.params.id;
  likes
    .findAll({ where: { citizenProfileId: c_id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "this citizen has no likes ",
      });
    });
};

exports.updateLikes = async (req, res) => {
  const id = req.params.id;

  likes
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

exports.disablelikes = async (req, res) => {
  const id = req.params.id;

  likes
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

exports.enablelikes = async (req, res) => {
  const id = req.params.id;

  likes
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

exports.deleteLike = async (req, res) => {
  const id = req.params.id;
  likes
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "like was deleted successfully.",
        });
      } else {
        res.send({
          message: `Cannot delete like with id=${id}. Please check ID.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error deleting like with id=" + id,
      });
    });
};
