const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const routes = {};
const HostModel = require("../models/hostModel");
const UserModel = require("../models/userModel");
const HostExpModel = require("../models/hostExperienceModel");
const HostPlaceModel = require("../models/hostPlaceModel");
const db = require("../models/config");
const nodemailer = require("nodemailer");
const Sequelize = db.Sequelize;

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
  const image = req.files.file;

  const placeData = {
    hostemail: req.email,
    header: req.body.header,
    description: req.body.desc,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    persons: req.body.persons,
    price: req.body.price
  };
  HostPlaceModel.create(placeData)
    .then(place => {
      console.log("place registered in " + place.hostemail);
      // res.status(200).json({ message: "Registered" })
    })
    .catch(err => {
      console.log("error: " + err);
    });

  if (image.length !== undefined) {
    for (let img of image) {
      cloudidary.uploader.upload(img.tempFilePath, (err, result) => {
        if (err) throw err;
        HostPlaceModel.update(
          {
            images: Sequelize.fn(
              "array_append",
              Sequelize.col("images"),
              result.url
            )
          },
          { where: { hostemail: req.email } }
        );
      });
    }
  } else {
    cloudidary.uploader.upload(image.tempFilePath, (err, result) => {
      if (err) throw err;
      HostPlaceModel.update(
        {
          images: Sequelize.fn(
            "array_append",
            Sequelize.col("images"),
            result.url
          )
        },
        { where: { hostemail: req.email } }
      );
    });
  }

  res.status(200).json({ message: "Registered" });
};

routes.uploadExp = (req, res) => {
  const placeData = {
    hostemail: req.email,
    header: req.body.header,
    description: req.body.desc,
    category: req.body.category,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    date: req.body.date,
    price: req.body.price
  };
  HostExpModel.create(placeData)
    .then(place => {
      console.log("experience registered in " + place.hostemail);
    })
    .catch(err => {
      console.log("error: " + err);
    });

  const image = req.files.file;
  if (image.length !== undefined) {
    for (let img of image) {
      cloudidary.uploader.upload(img.tempFilePath, (err, result) => {
        if (err) throw err;
        HostExpModel.update(
          {
            images: Sequelize.fn(
              "array_append",
              Sequelize.col("images"),
              result.url
            )
          },
          { where: { hostemail: req.email } }
        );
      });
    }
  } else {
    cloudidary.uploader.upload(image.tempFilePath, (err, result) => {
      if (err) throw err;
      HostExpModel.update(
        {
          images: Sequelize.fn(
            "array_append",
            Sequelize.col("images"),
            result.url
          )
        },
        { where: { hostemail: req.email } }
      );
    });
  }

  res.status(200).json({ message: "Registered" });
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
routes.searchPlaces = (req, res) => {
  HostPlaceModel.findAll({
    where: { city: req.params.searchDetail.toLowerCase() }
  }).then(response => {
    console.log(response);
    res.json(response);
  });
};

routes.viewHostedPlace = (req, res) => {
  HostPlaceModel.findAll({
    where: { hostemail: req.email }
  })
    .then(docs => {
      if (docs.length > 0) {
        res.status(200).json(docs);
      } else {
        res.status(200).json({ message: "No hosted places yet." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

routes.viewHostedExp = (req, res) => {
  HostExpModel.findAll({
    where: { hostemail: req.email }
  })
    .then(docs => {
      if (docs.length > 0) {
        res.status(200).json(docs);
      } else {
        res.status(200).json({ message: "No hosted experiences yet." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};
routes.bookPlace = (req, res) => {
  const order = {
    total: req.body.total,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    city: req.body.city,
    zip: req.body.zip,
    userEmail: req.email
  };
  bookedPlacesModel
    .create(order)
    .then(place => {
      console.log("added order in bookedPlaces model " + place.useremail);
      bookingMail(order);
    })
    .catch(err => {
      console.log("error: " + err);
    });
  const bookingMail = data => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hoststop.attainu@gmail.com",
        pass: "hoststop1711"
      }
    });
    let mailOptions = {
      from: "hoststop.attainu@gmail.com",
      to: data.userEmail,
      subject: "Host stop booking",
      text: `Your booking has been confirmed from ${data.checkIn} to ${data.checkOut} at ${data.city},pincode-${data.zip}.Total amount payable is ${data.total}`
    };
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log("booking not confirmed");
      }
      res.send("booking confirmed please check your Email");
    });
  };
};

routes.bookExperience = (req, res) => {
  const order = {
    total: req.body.total,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    city: req.body.city,
    zip: req.body.zip,
    userEmail: req.email
  };
  bookedExperienceModel
    .create(order)
    .then(experience => {
      console.log(
        "added order in bookedExperience model " + experience.useremail
      );
      bookingMail(order);
    })
    .catch(err => {
      console.log("error: " + err);
    });
  const bookingMail = data => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hoststop.attainu@gmail.com",
        pass: "hoststop1711"
      }
    });
    let mailOptions = {
      from: "hoststop.attainu@gmail.com",
      to: data.userEmail,
      subject: "Host stop booking",
      text: `Your experience has been confirmed from at ${data.city},pincode-${data.zip}.Total amount payable is ${data.total}`
    };
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log("booking not confirmed");
      }
      res.send("booking confirmed please check your Email");
    });
  };
};

module.exports = routes;
