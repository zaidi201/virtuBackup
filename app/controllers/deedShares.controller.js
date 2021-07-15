const db = require("../models");
const comments = db.deedShares;
// const Shop = db.shops;
const Op = db.Sequelize.Op;
// const jwt = require("jsonwebtoken");
// const tokenData = require("../config/auth.config");

//const accessTokenSecret = tokenData.secret;
// Create and Save a new User
exports.createdeedshare = async (req, res) => {
  // Create comment
  const earnedpoint = {
    deedId: req.body.deedId,
    toCitizenProfileId: req.body.toCitizenProfileId,
    citizenProfileId: req.body.citizenProfileId,
    isEnable: 1,
  };
  await comments
    .create(earnedpoint)
    .then(async (data) => {
      let citizenPoints = await db.earnedPoints.findOne({
        where: { citizenProfileId: req.body.citizenProfileId },
      });

      let newPoints = citizenPoints.pointValue + 10;

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
            where: { citizenProfileId: req.body.citizenProfileId },
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
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "deed shares cant be created",
      });
    });
};
exports.findalldeedshares = async (req, res) => {
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
        message: err.message || "no deed shares was found",
      });
    });
};

exports.finddeedsharesoftocitizen = async (req, res) => {
  comments
    .findAll({ where: { toCitizenProfileId: req.params.id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no shares to this citizen ",
      });
    });
};

exports.finddeedsharesbycitizen = async (req, res) => {
  comments
    .findAll({ where: { citizenProfileId: req.params.id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no shares by this citizen ",
      });
    });
};

exports.updateDeedShare = async (req, res) => {
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

exports.disableDeedShare = async (req, res) => {
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

exports.enableDeedShares = async (req, res) => {
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
