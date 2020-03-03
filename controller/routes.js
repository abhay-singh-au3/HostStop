const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const routes = {};
const HostModel = require("../models/hostModel");
const UserModel = require("../models/userModel");

process.env.SECRET_KEY = "secret";

const cloudidary = require("cloudinary").v2;
cloudidary.config({
  cloud_name: "dkj9dhslg",
  api_key: "823333546584975",
  api_secret: "oFCGWaNXG01YT1NxNRbaU6A9sPk"
});

routes.hostSignup = (req, res) => {
  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };

  HostModel.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          HostModel.create(userData)
            .then(user => {
              res.json({ status: user.email + " registered" });
            })
            .catch(err => {
              res.send("error: ", err);
            });
        });
      } else {
        res.json({ error: "User already exists" });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
};
routes.userSignup = (req, res) => {
  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };

  UserModel.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          UserModel.create(userData)
            .then(user => {
              res.json({ status: user.email + " registered" });
            })
            .catch(err => {
              res.send("error: " + err);
            });
        });
      } else {
        res.json({ error: "User already exists" });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
};
routes.hostLogin = (req, res) => {
  HostModel.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
          expiresIn: 1440
        });
        res.cookie("token", token, { httpOnly: true }).sendStatus(200);
      } else {
        res.status(200).json({ error: "Password is wrong" });
      }
    } else {
      res.status(200).json({ error: "User does not exists" });
    }
  });
};
routes.userLogin = (req, res) => {
  UserModel.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
          expiresIn: 1440
        });
        res
          .cookie("token", token, { httpOnly: true, path: "/" })
          .sendStatus(200);
      } else {
        res.status(200).json({ error: "Password is wrong" });
      }
    } else {
      res.status(200).json({ error: "User does not exists" });
    }
  });
};
routes.logout = (req, res) => {
  console.log("inside logout");
  res.clearCookie("token");
  return res.status(200).redirect("/");
};

routes.uploadPlace = (req, res) => {
  const imageArr = req.files.file;
  const urls = [];
  for (let img of imageArr) {
    cloudidary.uploader.upload(img.tempFilePath, (err, result) => {
      if (err) throw err;
      urls.push(result.url);
    });
  }
  res.send(urls);
  // console.log('body', req.files.file)
  // console.log('body-photo', req.body.header)
  // res.json({status: "File uploaded!"})
};
routes.editProfile = (req, res) => {
  if (req.body.type === "user") {
    bcrypt.hash(req.body.user.password, 10, (err, hash) => {
      UserModel.update(
        {
          password: hash
        },
        { where: { email: req.email } }
      );
    });
    UserModel.update(
      {
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName
      },
      { where: { email: req.email } }
    ).then(result => {
      console.log(result);
      res.send(result);
    });
  } else {
    bcrypt.hash(req.body.user.password, 10, (err, hash) => {
      HostModel.update(
        {
          password: hash
        },
        { where: { email: req.email } }
      );
    });
    HostModel.update(
      {
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName
      },
      { where: { email: req.email } }
    ).then(result => {
      console.log(result);
      res.send(result);
    });
  }
};

module.exports = routes;
