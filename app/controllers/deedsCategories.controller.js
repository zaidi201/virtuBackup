const db = require("../models");
const deed = db.deeds;

// const Shop = db.shops;
const Op = db.Sequelize.Op;
// const jwt = require("jsonwebtoken");
// const tokenData = require("../config/auth.config");

//const accessTokenSecret = tokenData.secret;
// Create and Save a new User

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

//------------------------------------------------

// deeds.filter((deed) => {
// if (deedId === id) {
//     return deed;
//   }
// });

exports.editorPick = async (req, res) => {
  let data = [];
  await db.deedComments
    .findAll({
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "id",
          "citizenProfileId",
          "isEnable",
          "isApproved",
          "comments",
        ],
      },
    })
    .then((resp) => (data = [...resp]))
    .catch((err) => console.log(err));

  var count = {};
  data.forEach(function (i) {
    count[i.deedId] = (count[i.deedId] || 0) + 1;
  });

  let commentValues = Object.values(count);
  let commentKeys = Object.keys(count);

  var allSotredIndices = Array.from(
    Array(commentValues.length).keys()
  ).sort((a, b) =>
    commentValues[a] < commentValues[b]
      ? -1
      : (commentValues[b] < commentValues[a]) | 0
  );

  let topDeed = [];
  let desCommentsValue = allSotredIndices.reverse();

  topDeed = desCommentsValue.map((d) => {
    return Number(commentKeys[d]);
  });

  if (topDeed.length > 30) {
    topDeed = topDeed.slice(0, 30);
  }

  let final = [];
  for (let j = 0; j < topDeed.length; j++) {
    let deed = new Object();
    await db.deeds
      .findOne({ where: { id: topDeed[j] } })
      .then(async (deedData) => {
        await db.deedAssets
          .findOne({ where: { deedId: topDeed[j], assetTitle: "cover" } })
          .then((assetData) => {
            deed.deedDetail = deedData;
            deed.assetDetail = assetData;
            final.push(deed);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "this deed has no deed assets ",
            });
          });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "deed id doesnt exist",
        });
      });
  }
  res.send(final);
};

exports.popularDeeds = async (req, res) => {
  let data = [];
  await db.deedLikes
    .findAll({
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "id",
          "citizenProfileId",
          "isEnable",
        ],
      },
    })
    .then((resp) => (data = [...resp]))
    .catch((err) => console.log(err));

  var count = {};
  data.forEach(function (i) {
    count[i.deedId] = (count[i.deedId] || 0) + 1;
  });

  let commentValues = Object.values(count);
  let commentKeys = Object.keys(count);

  var allSotredIndices = Array.from(
    Array(commentValues.length).keys()
  ).sort((a, b) =>
    commentValues[a] < commentValues[b]
      ? -1
      : (commentValues[b] < commentValues[a]) | 0
  );

  let topDeed = [];
  let desCommentsValue = allSotredIndices.reverse();

  topDeed = desCommentsValue.map((d) => {
    return Number(commentKeys[d]);
  });

  if (topDeed.length > 30) {
    topDeed = topDeed.slice(0, 30);
  }

  let final = [];
  for (let j = 0; j < topDeed.length; j++) {
    let deed = new Object();
    await db.deeds
      .findOne({ where: { id: topDeed[j] } })
      .then(async (deedData) => {
        await db.deedAssets
          .findOne({ where: { deedId: topDeed[j], assetTitle: "cover" } })
          .then((assetData) => {
            deed.deedDetail = deedData;
            deed.assetDetail = assetData;
            final.push(deed);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "this deed has no deed assets ",
            });
          });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "deed id doesnt exist",
        });
      });
  }
  res.send(final);
};

exports.newDeeds = async (req, res) => {
  await db.deeds
    .findAll({ where: {}, limit: 30, order: [["updatedAt", "DESC"]] })
    .then(async (deedData) => {
      let detail = [];
      for (let j = 0; j < deedData.length; j++) {
        let deed = new Object();
        await db.deedAssets
          .findOne({ where: { deedId: deedData[j].id, assetTitle: "cover" } })
          .then((assetData) => {
            deed.deedDetail = deedData[j];
            deed.assetDetail = assetData;
            detail.push(deed);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "this deed has no deed assets ",
            });
          });
      }
      res.send(detail);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "deed id doesnt exist",
      });
    });
};

exports.bestDeeds = async (req, res) => {
  let data = [];
  await db.followers
    .findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "id", "isEnable"],
      },
    })
    .then((resp) => (data = [...resp]))
    .catch((err) => console.log(err));

  var count = {};
  data.forEach(function (i) {
    count[i.citizenProfileId] = (count[i.citizenProfileId] || 0) + 1;
  });

  let commentValues = Object.values(count);
  let commentKeys = Object.keys(count);

  var allSotredIndices = Array.from(
    Array(commentValues.length).keys()
  ).sort((a, b) =>
    commentValues[a] < commentValues[b]
      ? -1
      : (commentValues[b] < commentValues[a]) | 0
  );

  let topDeed = [];
  let desCommentsValue = allSotredIndices.reverse();

  topDeed = desCommentsValue.map((d) => {
    return Number(commentKeys[d]);
  });

  if (topDeed.length > 30) {
    topDeed = topDeed.slice(0, 30);
  }
  console.log(topDeed);
  let final = [];
  for (let j = 0; j < topDeed.length; j++) {
    let deed = new Object();
    await db.deeds
      .findAll({
        where: { citizenProfileId: topDeed[j] },
        limit: 2,
        order: [["updatedAt", "DESC"]],
      })
      .then(async (deedData) => {
        if (deedData.length != 0) {
          for (let i = 0; i < deedData.length; i++) {
            await db.deedAssets
              .findOne({
                where: { deedId: deedData[i].id, assetTitle: "cover" },
              })
              .then((assetData) => {
                deed.deedDetail = deedData[i];
                deed.assetDetail = assetData;
                final.push(deed);
              })
              .catch((err) => {
                res.status(500).send({
                  message: err.message || "this deed has no deed assets ",
                });
              });
          }
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "deed id doesnt exist",
        });
      });
  }
  res.send(final);
};
