const db = require("../models");
var nodemailer = require("nodemailer");
const email_config = require("../config/email.config");
const authtype = db.authTypes;

citizen = db.citizenProfiles;
const auth = db.authentications;

exports.emailverify = async (toEmail, c_id) => {
  const transporter = nodemailer.createTransport({
    host: email_config.host,
    port: email_config.port,
    auth: {
      user: email_config.user,
      pass: email_config.pass,
    },
  });

  var key = Math.floor(1000 + Math.random() * 9000);

  try {
    mailText = `Your signup confirmation code is ${key}`;
    console.log("to email", toEmail);
    let info = await transporter.sendMail({
      from: " wecare@virtuus.world",
      to: toEmail,
      subject: "Verification Email from Virtu",
      text: mailText,
    });
  } catch (e) {
    console.log(e);
  }

  let auth_type = await authtype.findOne({
    where: { authTypeName: "verify" },
  });
  if (!auth_type)
    return res.status(400).send({
      message: "authentication type not defined",
    });
  const user = {
    valueName: toEmail,
    citizenProfileId: c_id,
    authTypeId: auth_type.id,
    valueSecret: key,
    isEnable: 1,
  };
  auth
    .create(user)
    .then((data) => {
      // res.send(data);
      // console.log("saved");
    })
    .catch((err) => {
      return err.message || "Error: User can not be created.";
    });
};

exports.verified = async (req, res) => {
  let auth_type = await db.authTypes.findOne({
    where: { authTypeName: "verify" },
  });
  if (!auth_type)
    return res.status(400).send({
      message: "authentication type not defined",
    });
  let p = await auth.findOne({
    where: { valueName: req.body.email, authTypeId: auth_type.id },
  });
  if (!p)
    return res.status(400).send({
      message: "citizen not registered",
    });

  // console.log(p);

  if (p.valueSecret == req.body.code) {
    let n = await citizen.findOne({
      where: { id: p.citizenProfileId },
    });
    if (!n)
      return res.status(400).send({
        message: "citizen not found",
      });
    n.isVerified = 1;
    n.update(
      // Set Attribute values
      { isVerified: 1 }
    )
      .then(function () {
        console.log("citizen verified successfully!");
      })
      .catch(function (err) {
        console.log("update failed !");
        //handle error here
      });

    p.update(
      // Set Attribute values
      { valueSecret: Math.random().toString(36).substring(7) }
    )
      .then(function () {
        console.log("value secret updated");
      })
      .catch(function (err) {
        console.log("value secret update failed !");
        //handle error here
      });

    return res.status(200).send({
      citizenProfile: n,
      message: "verified",
    });
  } else {
    return res.status(400).send({
      message: "code not matched",
    });
  }
};

exports.question = async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: email_config.host,
    port: email_config.port,
    auth: {
      user: email_config.user,
      pass: email_config.pass,
    },
  });

  try {
    mailText = ` reason is : ${req.body.reason} \n name is : ${req.body.name} \n email is : ${req.body.email} \n message is : ${req.body.message} \n`;

    let info = await transporter.sendMail({
      from: "wecare@virtuus.world",
      to: "wecare@virtuus.world",
      subject: "Question of citizen",
      text: mailText,
    });
  } catch (e) {
    res.send(e);
  }
  res.send({ message: "sent" });
};
