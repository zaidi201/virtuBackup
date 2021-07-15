const db = require("../models");
const deed = db.deeds;

// const Shop = db.shops;
const Op = db.Sequelize.Op;

const getcauses = (id) => {
  return new Promise(function (resolve, reject) {
    db.causes
      .findOne({ where: { id } })
      .then((r) => resolve(r))
      .catch((e) => reject(e));
  });
};

exports.profileData = async (req, res) => {
  let deeds = new Object();

  let exist = await db.citizenProfiles.findOne({
    where: { id: req.params.id },
  });
  if (!exist) {
    return res.status(400).send({
      message: "this citizen does not exist",
    });
  }

  deeds.citizenId = req.params.id;

  let auth_type = await db.authTypes.findOne({
    where: { authTypeName: "quickBlox" },
  });
  if (!auth_type)
    return res.status(403).send({
      message: "authentication type not defined",
    });

  await db.authentications
    .findOne({
      where: {
        citizenProfileId: req.params.id,
        authTypeId: auth_type.id,
        isEnable: 1,
      },
    })
    .then((chatdata) => {
      //   res.send(data);
      if (chatdata) {
        deeds.chatId = chatdata.valueSecret;
      } else {
        deeds.chatId = null;
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no chat id by this citizen ",
      });
    });

  await db.followers
    .findAll({ where: { citizenProfileId: req.params.id, isEnable: 1 } })
    .then((data) => {
      //   res.send(data);
      deeds.followersCount = data.length;
      let followersId = [];

      for (let i = 0; i < data.length; i++) {
        followersId.push(data[i].followerCitizenProfileId);
      }
      deeds.followersId = followersId;
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no followers by this citizen ",
      });
    });

  await db.citizenCauses
    .findAll({ where: { citizenProfileId: req.params.id, isEnable: 1 } })
    .then((data) => {
      //   res.send(data);

      let followersId = [];

      for (let i = 0; i < data.length; i++) {
        followersId.push(data[i].causeId);
      }
      deeds.causeId = followersId;
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no followers by this citizen ",
      });
    });

  await db.deeds
    .findAll({ where: { citizenProfileId: req.params.id, isEnable: 1 } })
    .then((dataa) => {
      var deedsAndAssets = [];
      for (let i = 0; i < dataa.length; i++) {
        db.deedAssets
          .findOne({ where: { deedId: dataa[i].id, assetTitle: "cover" } })
          .then((data) => {
            //   res.send(data);
            deedsAndAssets.push({
              assetDetail: data,
              deedDetail: dataa[i].dataValues,
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "this citizen has no comments ",
            });
          });
      }

      deeds.deedsAndAssetDetails = deedsAndAssets;
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "this citizen has no comments ",
      });
    });

  await db.deeds
    .findAll({ where: { citizenProfileId: req.params.id, isEnable: 1 } })
    .then(async (dataa) => {
      var deedsAndAssets = [];
      let deedShareLength = 0;
      for (let i = 0; i < dataa.length; i++) {
        await db.deedShares
          .findAll({ where: { deedId: dataa[i].id } })
          .then((data) => {
            deedShareLength = deedShareLength + data.length;
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "this citizen has no comments ",
            });
          });
      }
      deeds.deedShares = deedShareLength;
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "this citizen has no comments ",
      });
    });

  await db.earnedPoints
    .findOne({
      where: {
        citizenProfileId: req.params.id,
        isEnable: 1,
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
    })
    .then((data) => {
      if (data) {
        deeds.earnedPoints = data.pointValue;
        deeds.earnedPointsDetail = null;
      } else {
        deeds.earnedPoints = null;
        deeds.earnedPointsDetail = null;
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "this point title has no earned points ",
      });
    });
  //-------------------------------------
  // await db.earnedPoints
  //   .findAll({
  //     where: {
  //       citizenProfileId: req.params.id,
  //       isEnable: 1,
  //     },
  //   })
  //   .then(async (earndata) => {
  //     if (earndata.length != 0) {
  //       let g = [];
  //       for (let y = 0; y < earndata.length; y++) {
  //         let pointDetail = await db.pointTitles.findOne({
  //           where: { id: earndata[y].pointTitleId },
  //         });
  //         g.push(pointDetail);
  //       }
  //       deeds.achivements = g;
  //     } else {
  //       deeds.achivements = null;
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "this point title has no earned points ",
  //     });
  //   });

  await db.citizenProfiles
    .findOne({ where: { id: req.params.id } })
    .then((data) => {
      deeds.citizenProfile = data;
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "this citizen has no earned points ",
      });
    });

  // await db.pointTitles
  //   .findAll({ where: {} })
  //   .then((data) => {
  //     deeds.pointsDetail = data;
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "this citizen has no earned points ",
  //     });
  //   });

  // await db.pointTypes
  //   .findAll({ where: {} })
  //   .then((data) => {
  //     deeds.pointTypes = data;
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "this citizen has no earned points ",
  //     });
  //   });

  await db.earnedPoints
    .findAll({
      where: {
        citizenProfileId: req.params.id,
        isEnable: 1,
      },
    })
    .then(async (earndata) => {
      if (earndata.length != 0) {
        deeds.achivements = earndata;
      } else {
        deeds.achivements = null;
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "this point title has no earned points ",
      });
    });

  await db.citizenProfileAssets
    .findAll({ where: { citizenProfileId: req.params.id, isEnable: 1 } })
    .then((data) => {
      //   res.send(data);
      deeds.citizenProfileAssets = data;
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "this citizen has no sentiments ",
      });
    });

  res.send(deeds);
};

exports.citizenData = async (req, res) => {
  let deeds = new Object();

  let exist = await db.citizenProfiles.findOne({
    where: { id: req.params.id },
  });
  if (!exist) {
    return res.status(400).send({
      message: "this citizen does not exist",
    });
  }

  deeds.citizenId = req.params.id;

  await db.citizenCauses
    .findAll({ where: { citizenProfileId: req.params.id, isEnable: 1 } })
    .then((data) => {
      //   res.send(data);

      let followersId = [];

      for (let i = 0; i < data.length; i++) {
        followersId.push(data[i].causeId);
      }
      deeds.causeId = followersId;
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no followers by this citizen ",
      });
    });

  await db.citizenProfiles
    .findOne({ where: { id: req.params.id } })
    .then((data) => {
      deeds.citizenProfile = data;
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "this citizen has no earned points ",
      });
    });

  await db.citizenProfileAssets
    .findOne({ where: { citizenProfileId: req.params.id, isEnable: 1 } })
    .then((data) => {
      //   res.send(data);
      deeds.citizenProfileAssets = data;
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "this citizen has no sentiments ",
      });
    });

  res.send(deeds);
};

exports.deedsIdAndTimeStamps = async (req, res) => {
  let d = [];

  causeids = await db.citizenCauses.findAll({
    where: { citizenProfileId: req.params.id },
  });
  if (causeids.length == 0) {
    return res.status(400).send({
      message: "no causes for that citizen",
    });
  }

  for (let q = 0; q < causeids.length; q++) {
    var deeds = await db.deeds.findAll({
      where: { causeId: causeids[q].causeId },
      // limit: 20,
      order: [["updatedAt", "DESC"]],
    });

    for (let a = 0; a < deeds.length; a++) {
      d.push({ deedId: deeds[a].id, deedTime: deeds[a].updatedAt });
    }
  }

  following = await db.followers.findAll({
    where: { followerCitizenProfileId: req.params.id },
  });
  if (following.length != 0) {
    for (let q = 0; q < following.length; q++) {
      deeds = await db.deeds.findAll({
        where: { citizenProfileId: following[q].citizenProfileId },
        // limit: 20,
        order: [["updatedAt", "DESC"]],
      });

      for (let a = 0; a < deeds.length; a++) {
        d.push({ deedId: deeds[a].id, deedTime: deeds[a].updatedAt });
      }
    }
  }

  res.send(d);
};

exports.getDeedsByTime = async (req, res) => {
  let d = [];

  following = await db.followers.findAll({
    where: { followerCitizenProfileId: req.params.id },
  });
  if (following.length == 0) {
    return res.status(400).send({
      message: "no following",
    });
  }

  for (let q = 0; q < following.length; q++) {
    var deeds = await db.deeds.findAll({
      where: {
        citizenProfileId: following[q].citizenProfileId,
        updatedAt: { [Op.lt]: req.body.updatedAt },
      },
      limit: 20,
      order: [["updatedAt", "DESC"]],
    });

    for (let a = 0; a < deeds.length; a++) {
      d.push({ deedId: deeds[a].id, deedTime: deeds[a].updatedAt });
    }
  }

  res.send(d);
};

exports.returnDeedDetail = async (req, res) => {
  let d = [];
  let deedid = [];
  let deedDetail = [];

  d.push(req.body.deedId);

  for (let a = 0; a < d[0].length; a++) {
    deedid.push(d[0][a]);
  }

  for (let w = 0; w < deedid.length; w++) {
    var deed = new Object();
    await db.deeds
      .findOne({ where: { id: deedid[w], isEnable: 1 } })
      .then(async (data) => {
        if (!data) {
          deedDetail.push({ deed: null });
        } else {
          console.log("cid");
          console.log(data.dataValues.citizenProfileId);
          let citizenId = data.dataValues.citizenProfileId;

          // deedDetail.push({ deedDetail: data });

          deed.deedDetail = data;

          await db.citizenProfiles
            .findAll({ where: { id: citizenId, isEnable: 1 } })
            .then(async (data) => {
              //   res.send(data);
              deed.citizenDetails = data;
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "no followers by this citizen ",
              });
            });

          await db.deedTags
            .findAll({ where: { deedId: deedid[w], isEnable: 1 } })
            .then(async (data) => {
              deed.deedTags = data;
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "this deed has no tags ",
              });
            });

          await db.deedAssets
            .findAll({ where: { deedId: deedid[w], isEnable: 1 } })
            .then(async (data) => {
              deed.deedAssets = data;
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "this deed has no tags ",
              });
            });

          await db.deedTaggedCitizens
            .findAll({ where: { deedId: deedid[w], isEnable: 1 } })
            .then(async (data) => {
              deed.deedTaggedCitizens = data;
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "no tagged citizen for this deed id ",
              });
            });

          await db.deedSentiment
            .findAll({ where: { deedId: deedid[w], isEnable: 1 } })
            .then(async (sentimentData) => {
              // console.log(sentimentData[0].sentimentTypeId);
              if (sentimentData.length != 0) {
                deed.deedSentiment = sentimentData;
              } else {
                // deed.deedSentimentType = null;
                deed.deedSentiment = null;
              }
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "this deed is has no deed sentiments ",
              });
            });

          await db.deedLikes
            .findAll({ where: { deedId: deedid[w], isEnable: 1 } })
            .then(async (data) => {
              // deedDetail.push({ deedLikes: data.length });
              deed.deedLikes = data.length;
              deed.deedLikesDetail = data;
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "this deed is has no likes ",
              });
            });

          let commentDetail = new Object();
          await db.deedComments
            .findOne({
              where: { deedId: deedid[w], isEnable: 1 },
              order: [["createdAt", "DESC"]],
            })
            .then(async (comment) => {
              if (comment) {
                await db.citizenProfiles
                  .findOne({
                    where: { id: comment.citizenProfileId, isEnable: 1 },
                  })
                  .then(async (cdata) => {
                    await db.citizenProfileAssets
                      .findOne({
                        where: { citizenProfileId: comment.citizenProfileId },
                      })
                      .then(async (assetdata) => {
                        // commentDetail.push({
                        //   comment: comment,
                        //   citizenId: cdata.id,
                        //   citizenName: cdata.citizenName,
                        //   citizenAsset: assetdata,
                        // });
                        commentDetail.comment = comment;
                        commentDetail.citizenId = cdata.id;
                        commentDetail.citizenName = cdata.citizenName;
                        commentDetail.citizenAsset = assetdata;
                        deed.commentDetail = commentDetail;
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
              } else {
                deed.commentDetail = null;
              }

              // deedDetail.push({ deedLikes: data.length });
              // deed.deedLikes = data.length;
              // deed.deedLikesDetail = data;
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "this deed is has no likes ",
              });
            });

          let likeDetail = new Object();
          await db.deedLikes
            .findAll({
              where: { deedId: deedid[w], isEnable: 1 },
              order: [["createdAt", "DESC"]],
            })
            .then(async (like) => {
              if (like.length != 0) {
                if (like.length == 1) {
                  await db.citizenProfiles
                    .findOne({
                      where: { id: like[0].citizenProfileId, isEnable: 1 },
                    })
                    .then(async (cdata) => {
                      await db.citizenProfileAssets
                        .findOne({
                          where: {
                            citizenProfileId: like[0].citizenProfileId,
                          },
                        })
                        .then(async (assetdata) => {
                          // likeDetail.citizenId = cdata.id;
                          likeDetail.citizenName = cdata.citizenName;
                          likeDetail.citizenAsset = assetdata;
                          deed.likeDetail = likeDetail;
                        })
                        .catch((err) => {
                          res.status(500).send({
                            message:
                              err.message || "this citizen has no assets ",
                          });
                        });
                    })
                    .catch((err) => {
                      res.status(500).send({
                        message: err.message || "citizen doesnt exist",
                      });
                    });
                } else {
                  for (var k = 0; k < 2; k++) {
                    await db.citizenProfiles
                      .findOne({
                        where: { id: like[k].citizenProfileId, isEnable: 1 },
                      })
                      .then(async (cdata) => {
                        if (k == 0) {
                          await db.citizenProfileAssets
                            .findOne({
                              where: {
                                citizenProfileId: like[k].citizenProfileId,
                              },
                            })
                            .then(async (assetdata) => {
                              // likeDetail.citizenId = cdata.id;
                              likeDetail.citizenName = cdata.citizenName;
                              likeDetail.citizenAsset = assetdata;
                              deed.likeDetail = likeDetail;
                            })
                            .catch((err) => {
                              res.status(500).send({
                                message:
                                  err.message || "this citizen has no assets ",
                              });
                            });
                        } else {
                          await db.citizenProfileAssets
                            .findOne({
                              where: {
                                citizenProfileId: like[k].citizenProfileId,
                              },
                            })
                            .then(async (assetdata) => {
                              likeDetail.citizenAsset2 = assetdata;
                              deed.likeDetail = likeDetail;
                            })
                            .catch((err) => {
                              res.status(500).send({
                                message:
                                  err.message || "this citizen has no assets ",
                              });
                            });
                        }
                      })
                      .catch((err) => {
                        res.status(500).send({
                          message: err.message || "citizen doesnt exist",
                        });
                      });
                  }
                }
              } else {
                deed.likeDetail = null;
              }

              // deedDetail.push({ deedLikes: data.length });
              // deed.deedLikes = data.length;
              // deed.deedLikesDetail = data;
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "this deed is has no likes ",
              });
            });

          //----------------------------------

          await db.citizenProfileAssets
            .findAll({ where: { citizenProfileId: citizenId, isEnable: 1 } })
            .then(async (data) => {
              deed.citizenProfileAssets = data;
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "this citizen has no assets ",
              });
            });

          await db.deedComments
            .findAll({ where: { deedId: deedid[w], isEnable: 1 } })
            .then(async (data) => {
              // deedDetail.push({ deedComments: data.length });
              deed.deedComments = data.length;
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "this deed is has no comments ",
              });
            });
          deedDetail.push({ deed });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "deed id doesnt exist",
        });
      });
  }
  res.send(deedDetail);
};
