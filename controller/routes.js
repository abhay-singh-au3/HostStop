const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const routes = {}
const HostModel = require('../models/hostModel')
const UserModel = require('../models/userModel')

process.env.SECRET_KEY = 'secret'

routes.hostSignup = (req, res) => {
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.firstName,
        email: req.body.email,
        password: req.body.password
    }

    HostModel.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash
                HostModel.create(userData)
                    .then(user => {
                        res.json({ status: user.email + ' registered' })
                    }).catch(err => {
                        res.send('error: ', err)
                    })
            })
        } else {
            res.json({ error: "User already exists" })
        }
    }).catch(err => {
        res.send('error: ' + err)
    })
}
routes.userSignup = (req, res) => {
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.firstName,
        email: req.body.email,
        password: req.body.password
    }

    UserModel.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash
                UserModel.create(userData)
                    .then(user => {
                        res.json({ status: user.email + ' registered' })
                    }).catch(err => {
                        res.send('error: ' + err)
                    })
            })
        } else {
            res.json({ error: "User already exists" })
        }
    }).catch(err => {
        res.send('error: ' + err)
    })
}
routes.hostLogin = (req, res) => {
    HostModel.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token)
            } else {
                res.status(400).json({error: "Password is wrong"})
            }
        } else {
            res.status(400).json({error: "User does not exists"})
        }
    })
}
routes.userLogin = (req, res) => { 
    UserModel.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token)
            } else {
                res.status(400).json({error: "Password is wrong"})
            }
        } else {
            res.status(400).json({error: "User does not exists"})
        }
    })
}


module.exports = routes;