const db = require("../models");
const Cause = db.causes;
// const Shop = db.shops;
const Op = db.Sequelize.Op;
// const jwt = require("jsonwebtoken");
// const tokenData = require("../config/auth.config");

//const accessTokenSecret = tokenData.secret;
// Create and Save a new User
exports.createcause = async (req, res) => {
  // Validate request

  if (!req.body.causeName) {
    res.status(400).send({
      message: "cause name is not defined",
    });
    return;
  }
  // Create User
  const cause = {
    causeTypeId: req.body.causeTypeId,
    causeName: req.body.causeName,
    causeDetail: req.body.causeDetail,
    causeIconUrl: req.body.causeIconUrl,
    causeColor: req.body.causeColor,
    isEnable: 1,
  };
  Cause.create(cause)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "cause cant be created",
      });
    });
};

exports.finallallcauses = async (req, res) => {
  await Cause.findAll({
    //^^^^^^^^^^^^^^^^^^^^^^^^^^
    where: {},
  })
    .then(async (d) => {
      res.send(d);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no cause was found",
      });
    });
};

// exports.finallallcauses = async (req, res) => {
//   let generalCauses = [];
//   let causeType = await db.causeType.findOne({
//     where: { causeTypeName: "main" },
//   });

//   let causeType2 = await db.causeType.findOne({
//     where: { causeTypeName: "general" },
//   });
//   // console.log(causeType2.id);

//   await Cause.findAll({
//     //^^^^^^^^^^^^^^^^^^^^^^^^^^
//     where: {},
//   })
//     .then(async (d) => {
//       let a = new Object();
//       for (let i = 0; i < d.length; i++) {
//         if (d[i].causeTypeId == causeType.id) {
//           generalCauses.push({
//             cause: d[i],
//             causeTypeName: causeType.causeTypeName,
//           });
//         } else {
//           generalCauses.push({
//             cause: d[i],
//             causeTypeName: causeType2.causeTypeName,
//           });
//         }
//       }
//       res.send(generalCauses);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "no cause was found",
//       });
//     });
// };

exports.findcausebyname = async (req, res) => {
  const name = req.params.name;
  Cause.findAll({ where: { causeName: name } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "cause name doesnt exist",
      });
    });
};

exports.updateCause = async (req, res) => {
  const id = req.params.id;

  Cause.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "cause updated successfully .",
        });
      } else {
        res.send({
          message: `Cannot update cause with id:${id}. Please check cause ID.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating cause with id=" + id,
      });
    });
};

exports.disablecause = async (req, res) => {
  const id = req.params.id;

  Cause.update(
    { isEnable: 0 },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "cause disable successfully .",
        });
      } else {
        res.send({
          message: `Cannot disable cause with id:${id}. Please check citizen ID.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating cause with id=" + id,
      });
    });
};

exports.enableCause = async (req, res) => {
  const id = req.params.id;

  Cause.update(
    { isEnable: 1 },
    {
      where: { id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "cause enable successfully .",
        });
      } else {
        res.send({
          message: `Cannot enable cause with id:${id}. Please check citizen ID.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating cause with id=" + id,
      });
    });
};
