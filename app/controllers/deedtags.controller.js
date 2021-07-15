const db = require("../models");
const comments = db.deedTags;
// const Shop = db.shops;
const Op = db.Sequelize.Op;
// const jwt = require("jsonwebtoken");
// const tokenData = require("../config/auth.config");

//const accessTokenSecret = tokenData.secret;
// Create and Save a new User
exports.createdeedtags = async (req, res) => {
  // Create comment
  const earnedpoint = {
    deedId: req.body.deedId,
    tag: req.body.tag,

    isEnable: 1,
  };
  comments
    .create(earnedpoint)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "deed tag cant be created",
      });
    });
};
exports.findalldeedtags = async (req, res) => {
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
        message: err.message || "no deed tags was found",
      });
    });
};

exports.finddeedtagsbydeedid = async (req, res) => {
  comments
    .findAll({ where: { deedId: req.params.id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "this deed has no tags ",
      });
    });
};

exports.searchByName = async (req, res) => {
  await comments
    .findAll({
      attributes: ["tag"],
      group: ["tag"],
      where: {
        tag: {
          [Op.like]: "%" + req.body.tag + "%",
        },
      },
    })
    .then(async (tagData) => {
      var arr = [];
      // res.send({ searchTagData: data, totalPost: data.length });
      // console.log(tagData);

      for (let i = 0; i < tagData.length; i++) {
        await comments
          .findAll({ where: { tag: tagData[i].tag } })
          .then((data) => {
            // console.log(data);
            var result = new Object();
            result.searchTagData = tagData[i].tag;
            result.totalPost = data.length;
            let deedId = [];
            for (let j = 0; j < data.length; j++) {
              deedId.push(data[j].deedId);
            }
            result.deedId = deedId;
            arr.push(result);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "this deed has no tags ",
            });
          });
      }
      res.send(arr);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "this deed has no tags ",
      });
    });
};

exports.updateDeedTag = async (req, res) => {
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

exports.disableDeedTag = async (req, res) => {
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

exports.enableDeedTag = async (req, res) => {
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
