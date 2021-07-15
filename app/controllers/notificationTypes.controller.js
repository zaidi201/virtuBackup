const db = require("../models");
const comments = db.notificationTypes;
// const Shop = db.shops;
const Op = db.Sequelize.Op;
// const jwt = require("jsonwebtoken");
// const tokenData = require("../config/auth.config");

//const accessTokenSecret = tokenData.secret;
// Create and Save a new User
exports.createnotificationtype = async (req, res) => {
  // Create comment
  const earnedpoint = {
    notification_group_id: req.body.notification_group_id,
    notificationTypeName: req.body.notificationTypeName,
    isEnable: 1,
  };
  comments
    .create(earnedpoint)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "notification type created created",
      });
    });
};
exports.findallnotificationttype = async (req, res) => {
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
        message: err.message || "no types was found",
      });
    });
};

exports.findbynotificationgroupid = async (req, res) => {
  comments
    .findAll({
      where: { notification_group_id: req.params.id },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no notification type found",
      });
    });
};

exports.findnotificationtypebyname = async (req, res) => {
  comments
    .findAll({ where: { notificationTypeName: req.params.name } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "no record found by this name ",
      });
    });
};

exports.updateNotificationType = async (req, res) => {
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

exports.disableNotificationType = async (req, res) => {
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

exports.enableNotificationType = async (req, res) => {
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
