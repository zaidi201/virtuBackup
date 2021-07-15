const db = require("../models");
const User = db.citizenProfiles;
const authtype = db.authTypes;
const citizenAssets = db.citizenProfileAssets;
const comments = db.citizenCauses;
const auth = require("./authentication.controller");
// const Shop = db.shops;
const Op = db.Sequelize.Op;
// const jwt = require("jsonwebtoken");
// const tokenData = require("../config/auth.config");

//const accessTokenSecret = tokenData.secret;
// Create and Save a new User
exports.createUser = async (req, res) => {
  // Validate request
  // if (!req.body.firstName) {
  //   res.status(400).send({
  //     message: "citizen first name cannot be Empty",
  //   });
  //   return;
  // }
  // Create User

  let auth_type = await authtype.findOne({
    where: { authTypeName: req.body.authType, isEnable: 1 },
  });
  if (!auth_type)
    return res.status(400).send({
      message: "authentication type not defined",
    });

  let notificationTypeLike = await db.notificationTypes.findOne({
    where: { notificationTypeName: "Like", isEnable: 1 },
  });
  if (!notificationTypeLike)
    return res.status(400).send({
      message: "notification type not defined",
    });

  let notificationTypeNewFollower = await db.notificationTypes.findOne({
    where: { notificationTypeName: "New Follower", isEnable: 1 },
  });
  if (!notificationTypeNewFollower)
    return res.status(400).send({
      message: "notification type not defined",
    });

  let notificationTypeSentiment = await db.notificationTypes.findOne({
    where: { notificationTypeName: "Sentiment", isEnable: 1 },
  });
  if (!notificationTypeSentiment)
    return res.status(400).send({
      message: "notification type not defined",
    });

  let notificationTypeNewMessage = await db.notificationTypes.findOne({
    where: { notificationTypeName: "New Message", isEnable: 1 },
  });
  if (!notificationTypeNewMessage)
    return res.status(400).send({
      message: "notification type not defined",
    });
  let notificationTypeComment = await db.notificationTypes.findOne({
    where: { notificationTypeName: "Comment", isEnable: 1 },
  });
  if (!notificationTypeComment)
    return res.status(400).send({
      message: "notification type not defined",
    });
  let notificationTypeshare = await db.notificationTypes.findOne({
    where: { notificationTypeName: "Shares", isEnable: 1 },
  });
  if (!notificationTypeshare)
    return res.status(400).send({
      message: "notification type not defined",
    });

  let notificationTypeShare = await db.notificationTypes.findOne({
    where: { notificationTypeName: "Share", isEnable: 1 },
  });
  if (!notificationTypeShare)
    return res.status(400).send({
      message: "notification type not defined",
    });

  if (auth_type.authTypeName == "login") {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      citizenName: req.body.citizenName,
      citizenGender: req.body.citizenGender,
      citizenDOB: req.body.citizenDOB,
      citizenCurrentCity: req.body.citizenCurrentCity,
      citizenHomeTown: req.body.citizenHomeTown,
      citizenOccupation: req.body.citizenOccupation,
      citizenIntroduction: req.body.citizenIntroduction,
      isMarketing: req.body.isMarketing,
      termAgreed: 0,
      isEnable: 1,
      isVerified: 0,
    };

    // if (req.body.password != req.body.confirmpassword) {
    //   res.send({ message: "password does not match" });
    //   return;
    // }
    let userCheck = await db.authentications.findOne({
      where: { valueName: req.body.email },
    });
    if (!userCheck) {
      User.create(user)
        .then(async (data) => {
          const setting1 = {
            citizenProfileId: data.id,
            notificationsTypeId: notificationTypeLike.id,
            isSettingEnable: 0,
            isEnable: 1,
          };
          await db.citizenNotificationSettings
            .create(setting1)
            .then((data) => {})
            .catch((err) => {
              res.status(500).send({
                message: err.message || "settings cant be created",
              });
            });
          const setting2 = {
            citizenProfileId: data.id,
            notificationsTypeId: notificationTypeNewFollower.id,
            isSettingEnable: 0,
            isEnable: 1,
          };
          await db.citizenNotificationSettings
            .create(setting2)
            .then((data) => {})
            .catch((err) => {
              res.status(500).send({
                message: err.message || "settings cant be created",
              });
            });
          const setting3 = {
            citizenProfileId: data.id,
            notificationsTypeId: notificationTypeSentiment.id,
            isSettingEnable: 0,
            isEnable: 1,
          };
          await db.citizenNotificationSettings
            .create(setting3)
            .then((data) => {})
            .catch((err) => {
              res.status(500).send({
                message: err.message || "settings cant be created",
              });
            });
          const setting4 = {
            citizenProfileId: data.id,
            notificationsTypeId: notificationTypeNewMessage.id,
            isSettingEnable: 0,
            isEnable: 1,
          };
          await db.citizenNotificationSettings
            .create(setting4)
            .then((data) => {})
            .catch((err) => {
              res.status(500).send({
                message: err.message || "settings cant be created",
              });
            });
          const setting5 = {
            citizenProfileId: data.id,
            notificationsTypeId: notificationTypeComment.id,
            isSettingEnable: 0,
            isEnable: 1,
          };
          await db.citizenNotificationSettings
            .create(setting5)
            .then((data) => {})
            .catch((err) => {
              res.status(500).send({
                message: err.message || "settings cant be created",
              });
            });
          const setting6 = {
            citizenProfileId: data.id,
            notificationsTypeId: notificationTypeShare.id,
            isSettingEnable: 0,
            isEnable: 1,
          };
          await db.citizenNotificationSettings
            .create(setting6)
            .then((data) => {})
            .catch((err) => {
              res.status(500).send({
                message: err.message || "settings cant be created",
              });
            });
          const setting7 = {
            citizenProfileId: data.id,
            notificationsTypeId: notificationTypeshare.id,
            isSettingEnable: 0,
            isEnable: 1,
          };
          await db.citizenNotificationSettings
            .create(setting7)
            .then((data) => {})
            .catch((err) => {
              res.status(500).send({
                message: err.message || "settings cant be created",
              });
            });

          // const openInvites = {
          //   citizenProfileId: data.id,
          //   inviteEmail: req.body.email,
          //   inviteCode: Math.random().toString(36).substring(7).toUpperCase(),
          //   isEnable: 1,
          // };
          // await db.openInvites
          //   .create(openInvites)
          //   .then((data) => {})
          //   .catch((err) => {
          //     res.status(500).send({
          //       message: err.message || "open invites cant be created",
          //     });
          //   });

          let newPointTitle = await db.pointTitles.findOne({
            where: { nameTitle: "citizen" },
          });
          let PointTitle = newPointTitle.id;

          const earnedpoint = {
            citizenProfileId: data.id,
            pointTitleId: PointTitle,
            pointValue: 100,
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

          auth
            .registercitizen(
              data.id,
              req.body.email,
              req.body.password,
              auth_type.id
            )
            .then(() =>
              res.status(200).send({
                data,
                message:
                  "citizen registered now go to your email and enter gour digit verification code",
              })
            )
            .catch((err) => res.status(503).send(err));
          // res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Error: User can not be created.",
          });
        });
    } else {
      res.status(503).send({
        message: "user already exists",
      });
    }
  } else if (auth_type.authTypeName == "facebook") {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      citizenName: req.body.citizenName,
      citizenGender: req.body.citizenGender,
      citizenDOB: req.body.citizenDOB,
      citizenCurrentCity: req.body.citizenCurrentCity,
      citizenHomeTown: req.body.citizenHomeTown,
      citizenOccupation: req.body.citizenOccupation,
      citizenIntroduction: req.body.citizenIntroduction,
      isMarketing: req.body.isMarketing,
      termAgreed: 0,
      isEnable: 1,
      isVerified: 1,
    };

    User.create(user)
      .then(async (data) => {
        const setting1 = {
          citizenProfileId: data.id,
          notificationsTypeId: notificationTypeLike.id,
          isSettingEnable: 0,
          isEnable: 1,
        };
        await db.citizenNotificationSettings
          .create(setting1)
          .then((data) => {})
          .catch((err) => {
            res.status(500).send({
              message: err.message || "settings cant be created",
            });
          });
        const setting2 = {
          citizenProfileId: data.id,
          notificationsTypeId: notificationTypeNewFollower.id,
          isSettingEnable: 0,
          isEnable: 1,
        };
        await db.citizenNotificationSettings
          .create(setting2)
          .then((data) => {})
          .catch((err) => {
            res.status(500).send({
              message: err.message || "settings cant be created",
            });
          });
        const setting3 = {
          citizenProfileId: data.id,
          notificationsTypeId: notificationTypeSentiment.id,
          isSettingEnable: 0,
          isEnable: 1,
        };
        await db.citizenNotificationSettings
          .create(setting3)
          .then((data) => {})
          .catch((err) => {
            res.status(500).send({
              message: err.message || "settings cant be created",
            });
          });
        const setting4 = {
          citizenProfileId: data.id,
          notificationsTypeId: notificationTypeNewMessage.id,
          isSettingEnable: 0,
          isEnable: 1,
        };
        await db.citizenNotificationSettings
          .create(setting4)
          .then((data) => {})
          .catch((err) => {
            res.status(500).send({
              message: err.message || "settings cant be created",
            });
          });
        const setting5 = {
          citizenProfileId: data.id,
          notificationsTypeId: notificationTypeComment.id,
          isSettingEnable: 0,
          isEnable: 1,
        };
        await db.citizenNotificationSettings
          .create(setting5)
          .then((data) => {})
          .catch((err) => {
            res.status(500).send({
              message: err.message || "settings cant be created",
            });
          });
        const setting6 = {
          citizenProfileId: data.id,
          notificationsTypeId: notificationTypeShare.id,
          isSettingEnable: 0,
          isEnable: 1,
        };
        await db.citizenNotificationSettings
          .create(setting6)
          .then((data) => {})
          .catch((err) => {
            res.status(500).send({
              message: err.message || "settings cant be created",
            });
          });
        const setting7 = {
          citizenProfileId: data.id,
          notificationsTypeId: notificationTypeshare.id,
          isSettingEnable: 0,
          isEnable: 1,
        };
        await db.citizenNotificationSettings
          .create(setting7)
          .then((data) => {})
          .catch((err) => {
            res.status(500).send({
              message: err.message || "settings cant be created",
            });
          });
        let go = new Object();
        go.id = data.id;
        go.termAgreed = data.termAgreed;
        go.isEnable = data.isEnable;
        go.isVerified = data.isVerified;
        go.updatedAt = data.updatedAt;
        go.createdAt = data.createdAt;

        // const openInvites = {
        //   citizenProfileId: data.id,
        //   inviteEmail: req.body.email,
        //   inviteCode: Math.random().toString(36).substring(7).toUpperCase(),
        //   isEnable: 1,
        // };
        // await db.openInvites
        //   .create(openInvites)
        //   .then((data) => {})
        //   .catch((err) => {
        //     res.status(500).send({
        //       message: err.message || "open invites cant be created",
        //     });
        //   });

        let newPointTitle = await db.pointTitles.findOne({
          where: { nameTitle: "citizen" },
        });
        let PointTitle = newPointTitle.id;

        const earnedpoint = {
          citizenProfileId: data.id,
          pointTitleId: PointTitle,
          pointValue: 100,
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

        const auth = {
          citizenProfileId: data.id,
          authTypeId: auth_type.id,
          valueName: req.body.email,
          valueSecret: req.body.password,
          isEnable: 1,
        };
        await db.authentications
          .create(auth)
          .then((data) => {
            res.send({
              data: go,
              message: "faceboook",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || " cant be created",
            });
          });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error: User can not be created.",
        });
      });
  } else if (auth_type.authTypeName == "gmail") {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      citizenName: req.body.citizenName,
      citizenGender: req.body.citizenGender,
      citizenDOB: req.body.citizenDOB,
      citizenCurrentCity: req.body.citizenCurrentCity,
      citizenHomeTown: req.body.citizenHomeTown,
      citizenOccupation: req.body.citizenOccupation,
      citizenIntroduction: req.body.citizenIntroduction,
      isMarketing: req.body.isMarketing,
      termAgreed: 0,
      isEnable: 1,
      isVerified: 1,
    };

    let userCheck = await db.authentications.findOne({
      where: { valueName: req.body.email },
    });
    if (!userCheck) {
      User.create(user)
        .then(async (data) => {
          const setting1 = {
            citizenProfileId: data.id,
            notificationsTypeId: notificationTypeLike.id,
            isSettingEnable: 0,
            isEnable: 1,
          };
          await db.citizenNotificationSettings
            .create(setting1)
            .then((data) => {})
            .catch((err) => {
              res.status(500).send({
                message: err.message || "settings cant be created",
              });
            });
          const setting2 = {
            citizenProfileId: data.id,
            notificationsTypeId: notificationTypeNewFollower.id,
            isSettingEnable: 0,
            isEnable: 1,
          };
          await db.citizenNotificationSettings
            .create(setting2)
            .then((data) => {})
            .catch((err) => {
              res.status(500).send({
                message: err.message || "settings cant be created",
              });
            });
          const setting3 = {
            citizenProfileId: data.id,
            notificationsTypeId: notificationTypeSentiment.id,
            isSettingEnable: 0,
            isEnable: 1,
          };
          await db.citizenNotificationSettings
            .create(setting3)
            .then((data) => {})
            .catch((err) => {
              res.status(500).send({
                message: err.message || "settings cant be created",
              });
            });
          const setting4 = {
            citizenProfileId: data.id,
            notificationsTypeId: notificationTypeNewMessage.id,
            isSettingEnable: 0,
            isEnable: 1,
          };
          await db.citizenNotificationSettings
            .create(setting4)
            .then((data) => {})
            .catch((err) => {
              res.status(500).send({
                message: err.message || "settings cant be created",
              });
            });
          const setting5 = {
            citizenProfileId: data.id,
            notificationsTypeId: notificationTypeComment.id,
            isSettingEnable: 0,
            isEnable: 1,
          };
          await db.citizenNotificationSettings
            .create(setting5)
            .then((data) => {})
            .catch((err) => {
              res.status(500).send({
                message: err.message || "settings cant be created",
              });
            });
          const setting6 = {
            citizenProfileId: data.id,
            notificationsTypeId: notificationTypeShare.id,
            isSettingEnable: 0,
            isEnable: 1,
          };
          await db.citizenNotificationSettings
            .create(setting6)
            .then((data) => {})
            .catch((err) => {
              res.status(500).send({
                message: err.message || "settings cant be created",
              });
            });
          const setting7 = {
            citizenProfileId: data.id,
            notificationsTypeId: notificationTypeshare.id,
            isSettingEnable: 0,
            isEnable: 1,
          };
          await db.citizenNotificationSettings
            .create(setting7)
            .then((data) => {})
            .catch((err) => {
              res.status(500).send({
                message: err.message || "settings cant be created",
              });
            });
          let go = new Object();
          go.id = data.id;
          go.termAgreed = data.termAgreed;
          go.isEnable = data.isEnable;
          go.isVerified = data.isVerified;
          go.updatedAt = data.updatedAt;
          go.createdAt = data.createdAt;
          // const openInvites = {
          //   citizenProfileId: data.id,
          //   inviteEmail: req.body.email,
          //   inviteCode: Math.random().toString(36).substring(7).toUpperCase(),
          //   isEnable: 1,
          // };
          // await db.openInvites
          //   .create(openInvites)
          //   .then((data) => {})
          //   .catch((err) => {
          //     res.status(500).send({
          //       message: err.message || "open invites cant be created",
          //     });
          //   });

          let newPointTitle = await db.pointTitles.findOne({
            where: { nameTitle: "citizen" },
          });
          let PointTitle = newPointTitle.id;

          const earnedpoint = {
            citizenProfileId: data.id,
            pointTitleId: PointTitle,
            pointValue: 100,
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

          const auth = {
            citizenProfileId: data.id,
            authTypeId: auth_type.id,
            valueName: req.body.email,
            valueSecret: req.body.password,
            isEnable: 1,
          };
          await db.authentications
            .create(auth)
            .then((data) => {
              res.send({
                data: go,
                message: "gmail",
              });
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || " cant be created",
              });
            });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Error: User can not be created.",
          });
        });
    } else {
      res.status(503).send({
        message: "user already exists",
      });
    }
  }
};

exports.finallalluser = async (req, res) => {
  User.findAll({
    //^^^^^^^^^^^^^^^^^^^^^^^^^^
    where: {},
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error: User can not be created.",
      });
    });
};

exports.getcitizenbyid = async (req, res) => {
  User.findAll({ where: { id: req.params.id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "citizen doesnt exist",
      });
    });
};

exports.getcitizenbyname = async (req, res) => {
  let result = [];
  await User.findAll({
    where: {
      citizenName: {
        [Op.like]: "%" + req.body.citizenName + "%",
      },
    },
  })
    .then(async (citizenProfile) => {
      if (!citizenProfile) {
        res.status(500).send({
          message: "No citizen by this name",
        });
      } else {
        for (let i = 0; i < citizenProfile.length; i++) {
          await db.followers
            .findAll({ where: { citizenProfileId: citizenProfile[i].id } })
            .then(async (follower) => {
              await db.citizenProfileAssets
                .findAll({ where: { citizenProfileId: citizenProfile[i].id } })
                .then(async (assets) => {
                  result.push({
                    citizenId: citizenProfile[i].id,
                    follower: follower.length,
                    assets: assets,
                    citizenName: citizenProfile[i].citizenName,
                  });
                })
                .catch((err) => {
                  res.status(500).send({
                    message: err.message || "this citizen has no assets ",
                  });
                });
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "no followers by this citizen ",
              });
            });
        }
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "citizen doesnt exist",
      });
    });
  res.send(result);
};

// Update a User by the id in the request
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  if (!req.body.causeId) {
    res.status(400).send({
      message: "kindly select causes",
    });
  }

  //----------------------------------------------
  // let auth_type = await db.authTypes.findOne({
  //   where: { authTypeName: "login" },
  // });
  // if (!auth_type)
  //   return res.status(403).send({
  //     message: "authentication type not defined",
  //   });

  let user = await db.authentications.findOne({
    where: { citizenProfileId: id },
  });
  if (!user)
    return res.status(404).send({
      message: "user is not found",
    });
  //----------------------------------------------

  if (req.body.asset) {
    if (req.body.asset.length != 0) {
      let citizen = await citizenAssets.findOne({
        where: { citizenProfileId: id },
      });
      if (!citizen) {
        const citizenAsset = {
          citizenProfileId: id,
          titleAsset: req.body.asset[0].titleAsset,
          urlAsset: req.body.asset[0].urlAsset,
          assetTypeId: req.body.asset[0].assetTypeId,
          isEnable: 1,
        };
        await citizenAssets
          .create(citizenAsset)
          .then(async (data) => {
            console.log("citizen Asset updated");
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "plz provide citizen assets for the first time id=" + id,
            });
          });
      } else {
        citizenAssets
          .update(req.body.asset[0], {
            where: { citizenProfileId: id },
          })
          .then((num) => {
            if (num == 1) {
              console.log("asset updated");
            } else {
              console.log(`Cannot update  id:${id}. Please check  ID.`);
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "Error updating  id=" + id,
            });
          });
      }
    }
  }

  //updating cause
  if (req.body.causeId.length != 0) {
    let d = [];
    let causeid = [];
    let deedDetail = [];
    let causeDetail = [];
    let disabled = [];

    d.push(req.body.causeId);

    for (let a = 0; a < d[0].length; a++) {
      causeid.push(d[0][a]);
    }

    await comments
      .findAll({ where: { citizenProfileId: id, isEnable: 1 } })
      .then(async (data) => {
        for (let i = 0; i < data.length; i++) {
          deedDetail.push(data[i].causeId);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "this citizen has no earned points ",
        });
      });
    console.log(deedDetail);

    await comments
      .findAll({ where: { citizenProfileId: id, isEnable: 0 } })
      .then(async (data) => {
        for (let i = 0; i < data.length; i++) {
          disabled.push(data[i].causeId);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "this citizen has no earned points ",
        });
      });

    for (let w = 0; w < causeid.length; w++) {
      var n = deedDetail.indexOf(causeid[w]);
      if (n == -1) {
        var m = disabled.indexOf(causeid[w]);
        if (m == -1) {
          const earnedpoint = {
            causeId: causeid[w],
            citizenProfileId: id,

            isEnable: 1,
          };
          await comments
            .create(earnedpoint)
            .then(async (data) => {})
            .catch((err) => {
              res.status(500).send({
                message: err.message || "citizen cause cant be created",
              });
            });
        } else {
          await comments
            .update(
              { isEnable: 1 },
              {
                where: { citizenProfileId: id, causeId: causeid[w] },
              }
            )
            .then(async (num) => {
              if (num == 1) {
                // res.send({
                //   message: " updated successfully .",
                // });
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
        }
      }
    }

    await comments
      .findAll({ where: { citizenProfileId: id, isEnable: 1 } })
      .then(async (data) => {
        for (let i = 0; i < data.length; i++) {
          causeDetail.push(data[i].causeId);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "this citizen has no earned points ",
        });
      });
    // console.log(causeDetail);

    for (let w = 0; w < causeDetail.length; w++) {
      var n = causeid.indexOf(causeDetail[w]);
      if (n == -1) {
        await comments
          .update(
            { isEnable: 0 },
            {
              where: {
                citizenProfileId: id,
                causeId: causeDetail[w],
                isEnable: 1,
              },
            }
          )
          .then(async (num) => {
            if (num == 1) {
              // res.send({
              //   message: " updated successfully .",
              // });
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
      }
    }
  }

  //----------------------------------------------------------------------------------------------------
  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          user: user,
          message: "Citizen updated successfully .",
        });
      } else {
        res.status(500).send({
          message: ` citizen profile not updated with id:${id}. Please check citizen ID.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating citizen with id=" + id,
      });
    });
};

exports.disablecitizen = async (req, res) => {
  const id = req.params.id;

  User.update(
    { isEnable: 0 },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Citizen disable successfully .",
        });
      } else {
        res.send({
          message: `Cannot disable citizen with id:${id}. Please check citizen ID.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating citizen with id=" + id,
      });
    });
};

exports.enablecitizen = async (req, res) => {
  const id = req.params.id;

  User.update(
    { isEnable: 1 },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Citizen enable successfully .",
        });
      } else {
        res.send({
          message: `Cannot enable citizen with id:${id}. Please check citizen ID.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating citizen with id=" + id,
      });
    });
};
// // Delete a User with the specified id in the request
// exports.deleteUser = async (req, res) => {
//   const id = req.params.id;
//   User.destroy({
//     where: { id: id },
//   })
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "User was deleted successfully.",
//         });
//       } else {
//         res.send({
//           message: `Cannot delete User with id=${id}. Please check ID.`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Error deleting User with id=" + id,
//       });
//     });
// };

// // Delete all User from the database.
// exports.deleteAllUser = async (req, res) => {
//   User.destroy({
//     where: {},
//     truncate: false,
//   })
//     .then((num) => {
//       res.send({ message: `${num} User were deleted successfully.` });
//     })
//     .catch((err) => {
//       res.statu(500).send({
//         message: err.message || "Error deleting Users",
//       });
//     });
// };

// // Find all Active User
// exports.findAllActiveUser = async (req, res) => {
//   const status = req.params.status;
//   User.findAll({ where: { user_status: status } })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "No Active User found.",
//       });
//     });
// };
