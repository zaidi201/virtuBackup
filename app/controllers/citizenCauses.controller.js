const db = require("../models");
const comments = db.citizenCauses;
// const Shop = db.shops;
const Op = db.Sequelize.Op;
// const jwt = require("jsonwebtoken");
// const tokenData = require("../config/auth.config");

//const accessTokenSecret = tokenData.secret;
// Create and Save a new User
exports.createcitizencauses = async (req, res) => {
  // Create comment
  const earnedpoint = {
    causeId: req.body.causeId,
    citizenProfileId: req.body.citizenProfileId,

    isEnable: 1,
  };
  comments
    .create(earnedpoint)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "citizen cause cant be created",
      });
    });
};
exports.findallcitizencauses = async (req, res) => {
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
        message: err.message || "no causes was found",
      });
    });
};

exports.findcitizencausesbycitizenid = async (req, res) => {
  comments
    .findAll({ where: { citizenProfileId: req.params.id, isEnable: 1 } })
    .then((data) => {
      if (data.length != 0) res.send(data);
      else {
        res.status(500).send({
          message: "this citizen has no causes ",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "this citizen has no earned points ",
      });
    });
};

exports.findcitizencausesbycauseid = async (req, res) => {
  comments
    .findAll({ where: { causeId: req.params.id, isEnable: 1 } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no citizen causes for this cause id ",
      });
    });
};

exports.updatecitizencause = async (req, res) => {
  const id = req.params.id;
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
    }
  }
  res.send({
    message: " task done .",
  });

  // for (let w = 0; w < causeid.length; w++) {
  //   comments
  //     .update(req.body, {
  //       where: { id: id },
  //     })
  //     .then((num) => {
  //       if (num == 1) {
  //         res.send({
  //           message: " updated successfully .",
  //         });
  //       } else {
  //         res.status(500).send({
  //           message: "Error updating  id=" + id,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       res.status(500).send({
  //         message: err.message || "Error updating  id=" + id,
  //       });
  //     });
  // }

  // comments
  //   .update(req.body, {
  //     where: { id: id },
  //   })
  //   .then((num) => {
  //     if (num == 1) {
  //       res.send({
  //         message: " updated successfully .",
  //       });
  //     } else {
  //       res.status(500).send({
  //         message: "Error updating  id=" + id,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "Error updating  id=" + id,
  //     });
  //   });
  // res.status(200).send({
  //   message: "ok",
  // });
};

exports.disablecitizencause = async (req, res) => {
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

exports.enableCitizenCause = async (req, res) => {
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
