const db = require("../models");
const bcrypt = require("bcrypt");
var nodemailer = require("nodemailer");
const email_config = require("../config/email.config");
const emailverification = require("./emailverification.controller");
const auth = db.authentications;
const citizen = db.citizenProfiles;
const authtype = db.authTypes;

exports.registercitizen = (id, email, password, authtypeid) => {
  return new Promise(async function (resolve, reject) {
    const newcitizen = {
      citizenProfileId: id,
      authTypeId: authtypeid,
      valueName: email,
      valueSecret: password,
      isEnable: 1,
    };

    const salt = await bcrypt.genSaltSync(10);
    newcitizen.valueSecret = await bcrypt.hashSync(
      newcitizen.valueSecret,
      salt
    );

    auth
      .findOne({ where: { valueName: email } })
      .then((data) => {
        if (!data) {
          auth
            .create(newcitizen)
            .then((data) => {
              resolve({
                data,
                message: "User registered successfully",
              });

              emailverification.emailverify(email, id);
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          reject({ message: "user already exist" });
        }
      })
      .catch((err) => {
        reject({
          message: err.message || "user email and password are incorrect",
        });
      });
  });
};

// Login
exports.LoginVerify = async (req, res) => {
  if (!req.body.email) {
    res.status(400).send({
      message: "email cant be empty",
    });
    return;
  }
  if (!req.body.password) {
    res.status(400).send({
      message: "password cant be empty",
    });
    return;
  }

  let auth_type = await db.authTypes.findOne({
    where: { authTypeName: req.body.authType, isEnable: 1 },
  });
  if (!auth_type)
    return res.status(403).send({
      message: "authentication type not defined",
    });

  if (auth_type.authTypeName == "login") {
    let user = await auth.findOne({
      where: { valueName: req.body.email, authTypeId: auth_type.id },
    });
    if (!user)
      return res.status(404).send({
        message: "user is not found",
      });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.valueSecret
    );
    if (!validPassword)
      return res.status(401).send({
        message: "invalid password",
      });

    let verify_check = await citizen.findOne({
      where: { id: user.citizenProfileId },
    });

    if (verify_check.isVerified == 0) {
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
        console.log("sending again");
        let info = await transporter.sendMail({
          from: " wecare@virtuus.world",
          to: req.body.email,
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

      let p = await auth.findOne({
        where: { valueName: req.body.email, authTypeId: auth_type.id },
      });
      if (!p)
        return res.status(400).send({
          message: "citizen not registered",
        });

      p.update(
        // Set Attribute values
        { valueSecret: key }
      )
        .then(function () {
          console.log("citizen key updated!");
        })
        .catch(function (err) {
          console.log("update failed !");
          //handle error here
        });

      return res.status(405).send({
        message: "user is not verified",
      });
    }

    let termAgreed = await citizen.findOne({
      where: { id: user.citizenProfileId },
    });
    if (termAgreed.termAgreed == 0)
      return res.status(406).send({
        message: "user has not agreed to terms and conditions",
        citizenId: termAgreed.id,
      });

    // res.send(user);
    res.status(200).send({
      user,
      message: "you are logged in",
    });
  } else if (auth_type.authTypeName == "facebook") {
    let user = await auth.findOne({
      where: { valueSecret: req.body.password, authTypeId: auth_type.id },
    });
    if (!user)
      return res.status(404).send({
        message: "user is not found",
      });

    let termAgreed = await citizen.findOne({
      where: { id: user.citizenProfileId },
    });
    if (termAgreed.termAgreed == 0)
      return res.status(406).send({
        message: "user has not agreed to terms and conditions",
        citizenId: termAgreed.id,
      });

    // res.send(user);
    res.status(200).send({
      user,
      message: "you are logged in",
    });
  } else if (auth_type.authTypeName == "gmail") {
    let user = await auth.findOne({
      where: { valueName: req.body.email, authTypeId: auth_type.id },
    });
    if (!user)
      return res.status(404).send({
        message: "user is not found",
      });

    if (req.body.password != user.valueSecret)
      return res.status(401).send({
        message: "invalid password",
      });

    let termAgreed = await citizen.findOne({
      where: { id: user.citizenProfileId },
    });
    if (termAgreed.termAgreed == 0)
      return res.status(406).send({
        message: "user has not agreed to terms and conditions",
        citizenId: termAgreed.id,
      });

    // res.send(user);
    res.status(200).send({
      user,
      message: "you are logged in",
    });
  }
};

exports.resetPassword = async (req, res) => {
  let pass = req.body.newPassword;

  let auth_type = await db.authTypes.findOne({
    where: { authTypeName: "login" },
  });
  if (!auth_type)
    return res.status(403).send({
      message: "authentication type not defined",
    });

  let p = await auth.findOne({
    where: { valueName: req.body.email, authTypeId: auth_type.id },
  });

  if (!p)
    return res.status(404).send({
      message: "citizen not registered",
    });

  const validPassword = await bcrypt.compare(
    req.body.oldpassword,
    p.valueSecret
  );
  if (!validPassword)
    return res.status(401).send({
      message: "invalid password",
    });

  const salt = await bcrypt.genSaltSync(10);
  pass = await bcrypt.hashSync(pass, salt);

  p.update(
    // Set Attribute values
    { valueSecret: pass }
  )
    .then(function () {
      return res.status(200).send({
        message: "password changed ",
      });
    })
    .catch(function (err) {
      return res.status(400).send({
        message: "update failed",
      });
    });
};

exports.forgetPass = async (req, res) => {
  let auth_type = await db.authTypes.findOne({
    where: { authTypeName: "login" },
  });
  if (!auth_type)
    return res.status(403).send({
      message: "authentication type not defined",
    });

  let p = await auth.findOne({
    where: { valueName: req.body.email, authTypeId: auth_type.id },
  });

  if (!p)
    return res.status(404).send({
      message: "citizen not registered",
    });

  let citizenId = p.citizenProfileId;

  // let check = await citizen.findOne({
  //   where: { id: p.citizenProfileId },
  // });

  // if (check.isVerified == 0)
  //   return res.status(401).send({
  //     message: "you have not verified from the first time",
  //   });

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

    let info = await transporter.sendMail({
      from: " wecare@virtuus.world",
      to: req.body.email,
      subject: "Verification Email from Virtu",
      text: mailText,
    });
  } catch (e) {
    console.log(e);
  }

  // let auth_type = await authtype.findOne({
  //   where: { authTypeName: "verify" },
  // });
  // if (!auth_type)
  //   return res.status(400).send({
  //     message: "authentication type not defined",
  //   });

  auth_type = await db.authTypes.findOne({
    where: { authTypeName: "forgetPass" },
  });
  if (!auth_type)
    return res.status(403).send({
      message: "authentication type not defined",
    });

  p = await auth.findOne({
    where: { valueName: req.body.email, authTypeId: auth_type.id },
  });
  // console.log(citizenId);

  if (!p) {
    const newcitizen = {
      citizenProfileId: citizenId,
      authTypeId: auth_type.id,
      valueName: req.body.email,
      valueSecret: key,
      isEnable: 1,
    };

    auth
      .create(newcitizen)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: err.message || " not created",
        });
      });
  } else {
    p.update(
      // Set Attribute values
      { valueSecret: key }
    )
      .then(function () {
        return res.status(200).send({
          message: "new key sent ",
        });
      })
      .catch(function (err) {
        return res.status(400).send({
          message: "update failed",
        });
      });
  }
};

exports.resetPassAfterForget = async (req, res) => {
  let pass = req.body.newPassword;
  let code = req.body.code;

  let auth_type = await db.authTypes.findOne({
    where: { authTypeName: "forgetPass" },
  });
  if (!auth_type)
    return res.status(403).send({
      message: "authentication type not defined",
    });

  let p = await auth.findOne({
    where: { valueName: req.body.email, authTypeId: auth_type.id },
  });

  if (!p)
    return res.status(404).send({
      message: "citizen not found",
    });

  if (p.valueSecret != code)
    return res.status(401).send({
      message: "citizen not matched",
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

  const salt = await bcrypt.genSaltSync(10);
  pass = await bcrypt.hashSync(pass, salt);

  auth_type = await db.authTypes.findOne({
    where: { authTypeName: "login" },
  });
  if (!auth_type)
    return res.status(403).send({
      message: "authentication type not defined",
    });

  p = await auth.findOne({
    where: { valueName: req.body.email, authTypeId: auth_type.id },
  });

  if (!p)
    return res.status(404).send({
      message: "citizen not found",
    });

  p.update(
    // Set Attribute values
    { valueSecret: pass }
  )
    .then(function () {
      return res.status(200).send({
        message: "password changed ",
      });
    })
    .catch(function (err) {
      return res.status(400).send({
        message: "update failed",
      });
    });
};

exports.createChat = async (req, res) => {
  // Create comment

  let auth_type = await db.authTypes.findOne({
    where: { authTypeName: "quickBlox" },
  });
  if (!auth_type)
    return res.status(403).send({
      message: "authentication type not defined",
    });

  let p = await auth.findOne({
    where: {
      citizenProfileId: req.body.citizenProfileId,
      authTypeId: auth_type.id,
    },
  });

  if (!p) {
    const earnedpoint = {
      citizenProfileId: req.body.citizenProfileId,
      authTypeId: auth_type.id,
      valueName: "chat",
      valueSecret: req.body.valueSecret,

      isEnable: 1,
    };
    db.authentications
      .create(earnedpoint)
      .then((data) => {
        return res.status(200).send({
          message: "added successfully",
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "created",
        });
      });
  } else {
    return res.status(200).send({
      message: "added successfully",
    });
  }
};
