const { deeds } = require("../models");
const db = require("../models");
const deed = db.deeds;

// const Shop = db.shops;
const Op = db.Sequelize.Op;
// const jwt = require("jsonwebtoken");
// const tokenData = require("../config/auth.config");

//const accessTokenSecret = tokenData.secret;
// Create and Save a new User
exports.createdeed = async (req, res) => {
  // Validate request
  if (!req.body.deedTitle) {
    res.status(400).send({
      message: "deed name is not defined",
    });
    return;
  }

  // Create User
  const deeds = {
    causeId: req.body.causeId,
    citizenProfileId: req.body.citizenProfileId,
    deedTitle: req.body.deedTitle,
    deedDetail: req.body.deedDetail,
    deedLocationCity: req.body.deedLocationCity,
    deedLocationCountry: req.body.deedLocationCountry,
    isDraft: req.body.isDraft,
    isEnable: 1,
  };
  await deed
    .create(deeds)
    .then(async (deedData) => {
      // res.send(data);

      let enviCount = await db.causes.findOne({
        where: { causeName: "Climate Action" },
      });

      let deedCount = await db.deeds.findAll({
        where: {
          citizenProfileId: req.body.citizenProfileId,
          causeId: enviCount.id,
        },
      });

      // if (deedCount.length == 10) {
      //   let newPointTitle = await db.pointTitles.findOne({
      //     where: { nameTitle: "Environmentalist-bronze" },
      //   });
      //   let PointTitle = newPointTitle.id;

      //   const earnedpoint = {
      //     citizenProfileId: req.body.citizenProfileId,
      //     pointTitleId: PointTitle,
      //     pointValue: 3,
      //     isEnable: 1,
      //   };
      //   await db.earnedPoints
      //     .create(earnedpoint)
      //     .then((data) => {})
      //     .catch((err) => {
      //       res.status(500).send({
      //         message: err.message || "earned points cant be created",
      //       });
      //     });
      // }
      if (deedCount.length == 10) {
        let newPointTitle = await db.pointTitles.findOne({
          where: { nameTitle: "Environmentalist-bronze" },
        });
        let PointTitle = newPointTitle.id;

        const earnedpoint = {
          citizenProfileId: req.body.citizenProfileId,
          pointTitleId: PointTitle,
          pointValue: 3,
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
      if (deedCount.length > 10 && deedCount.length <= 250) {
        let newPointTitle = await db.pointTitles.findOne({
          where: { nameTitle: "Environmentalist-bronze" },
        });
        let PointTitle = newPointTitle.id;

        await db.earnedPoints
          .update(
            { pointTitleId: PointTitle },
            {
              where: {
                citizenProfileId: req.body.citizenProfileId,
                pointValue: 3,
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
      if (deedCount.length >= 251 && deedCount.length <= 500) {
        let newPointTitle = await db.pointTitles.findOne({
          where: { nameTitle: "Environmentalist-silver" },
        });
        let PointTitle = newPointTitle.id;

        await db.earnedPoints
          .update(
            { pointTitleId: PointTitle },
            {
              where: {
                citizenProfileId: req.body.citizenProfileId,
                pointValue: 3,
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

      if (deedCount.length >= 501) {
        let newPointTitle = await db.pointTitles.findOne({
          where: { nameTitle: "Environmentalist-gold" },
        });
        let PointTitle = newPointTitle.id;

        await db.earnedPoints
          .update(
            { pointTitleId: PointTitle },
            {
              where: {
                citizenProfileId: req.body.citizenProfileId,
                pointValue: 3,
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

      deedCount = await db.deeds.findAll({
        where: { citizenProfileId: req.body.citizenProfileId },
      });

      if (deedCount.length == 10) {
        let newPointTitle = await db.pointTitles.findOne({
          where: { nameTitle: "Good Samaritan-bronze" },
        });
        let PointTitle = newPointTitle.id;

        const earnedpoint = {
          citizenProfileId: req.body.citizenProfileId,
          pointTitleId: PointTitle,
          pointValue: 1,
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
          where: { nameTitle: "Good Samaritan-bronze" },
        });
        let PointTitle = newPointTitle.id;

        await db.earnedPoints
          .update(
            { pointTitleId: PointTitle },
            {
              where: {
                citizenProfileId: req.body.citizenProfileId,
                pointValue: 1,
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
          where: { nameTitle: "Good Samaritan-silver" },
        });
        let PointTitle = newPointTitle.id;

        await db.earnedPoints
          .update(
            { pointTitleId: PointTitle },
            {
              where: {
                citizenProfileId: req.body.citizenProfileId,
                pointValue: 1,
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
          where: { nameTitle: "Good Samaritan-gold" },
        });
        let PointTitle = newPointTitle.id;

        await db.earnedPoints
          .update(
            { pointTitleId: PointTitle },
            {
              where: {
                citizenProfileId: req.body.citizenProfileId,
                pointValue: 1,
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

      if (req.body.tagsPeople) {
        if (req.body.tagsPeople.length != 0) {
          for (let i = 0; i < req.body.tagsPeople.length; i++) {
            const deedTags = {
              deedId: deedData.id,
              citizenProfileId: req.body.tagsPeople[i],
              isEnable: 1,
            };
            db.deedTaggedCitizens
              .create(deedTags)
              .then((tagsdata) => {})
              .catch((err) => {
                res.status(500).send({
                  message: err.message || "deed tag cant be created",
                });
              });
          }
        }
      }

      if (req.body.tags) {
        if (req.body.tags.length != 0) {
          for (let i = 0; i < req.body.tags.length; i++) {
            const deedTags = {
              deedId: deedData.id,
              tag: req.body.tags[i],

              isEnable: 1,
            };
            db.deedTags
              .create(deedTags)
              .then((tagsdata) => {})
              .catch((err) => {
                res.status(500).send({
                  message: err.message || "deed tag cant be created",
                });
              });
          }
        }
      }

      if (req.body.asset) {
        if (req.body.asset.length != 0) {
          for (let i = 0; i < req.body.asset.length; i++) {
            let deedAsset = {
              deedId: deedData.id,
              assetTypeId: req.body.asset[i].assetTypeId,
              assetTitle: req.body.asset[i].assetTitle,
              assetUrl: req.body.asset[i].assetUrl,
              isEnable: 1,
            };
            await db.deedAssets
              .create(deedAsset)
              .then((assetData) => {
                // res.send(data);
              })
              .catch((err) => {
                res.status(500).send({
                  message: err.message || "deed assets cant be created",
                });
              });
          }
        }
      }
      res.status(200).send({
        message: "deed created",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "deed cant be created",
      });
    });
};
exports.finallalldeeds = async (req, res) => {
  deed
    .findAll({
      //^^^^^^^^^^^^^^^^^^^^^^^^^^
      where: {},
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no deed was found",
      });
    });
};

exports.finddeedbycauseid = async (req, res) => {
  deed
    .findAll({ where: { causeId: req.params.id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "cause id doesnt exist",
      });
    });
};

const getcauses = (id) => {
  return new Promise(function (resolve, reject) {
    db.causes
      .findOne({ where: { id } })
      .then((r) => resolve(r))
      .catch((e) => reject(e));
  });
};

exports.finddeedandcausebycitizenid = async (req, res) => {
  deed
    .findAll({ where: { citizenProfileId: req.params.id } })
    .then((data) => {
      let deeds = [];

      let d = data.map((deed) => {
        return getcauses(deed.causeId).then((causes) => {
          return causes;
        });
      });

      // .then((r) => res.send(deeds));
      Promise.all(d)
        .then((results) => {
          results.map((cause, i) => {
            deeds.push({ deed: data[i], cause });
          });
          res.send(deeds);
          // Handle results
        })
        .catch((e) => {
          console.error(e);
        });
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "citizen id doesnt exist",
      });
    });
};

exports.findbydeedid = async (req, res) => {
  deed
    .findOne({ where: { id: req.params.id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "deed id doesnt exist",
      });
    });
};

exports.updatedeeds = async (req, res) => {
  const id = req.params.id;

  deed
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

exports.disabledeed = async (req, res) => {
  const id = req.params.id;

  deed
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

exports.enabledeed = async (req, res) => {
  const id = req.params.id;

  deed
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

exports.searchDeedByName = async (req, res) => {
  let deedDetail = [];

  await db.deeds
    .findAll({
      where: {
        deedTitle: {
          [Op.like]: "%" + req.body.deedTitle + "%",
        },
      },
    })
    .then(async (deed) => {
      for (let i = 0; i < deed.length; i++) {
        var data = new Object();
        data.deed = deed[i];
        await db.deedAssets
          .findOne({ where: { deedId: deed[i].id, assetTitle: "cover" } })
          .then(async (deedasset) => {
            // deedDetail.push({ deed: deed, deedAsset: deedasset });
            data.deedAsset = deedasset;
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "this deed has no deed assets ",
            });
          });

        await db.citizenProfiles
          .findOne({ where: { id: deed[i].citizenProfileId } })
          .then(async (citizendata) => {
            // deedDetail.push({ deed: deed, deedAsset: deedasset });
            data.citizenProfile = citizendata;
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "this deed has no deed assets ",
            });
          });

        await db.citizenProfileAssets
          .findAll({ where: { citizenProfileId: deed[i].citizenProfileId } })
          .then(async (citizenassets) => {
            // deedDetail.push({ deed: deed, deedAsset: deedasset });
            data.citizenAssets = citizenassets;
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "this deed has no deed assets ",
            });
          });

        deedDetail.push(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "cause id doesnt exist",
      });
    });

  res.send(deedDetail);
};
