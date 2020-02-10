import axios from 'axios';

export const userSignup = newUser => {
    return axios
    .post('/userSignup', {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password
    })
    .then(res => {
        console.log("Registered")
    })
}

export const hostSignup = newUser => {
    return axios
    .post('/hostSignup', {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password
    })
    .then(res => {
        console.log("Registered")
    })
}

export const userLogin = user => {
    return axios
    .post('/userLogin', {
        email: user.email,
        password: user.password
    })
    .then(res => {
        localStorage.setItem('usertoken', res.data)
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}

export const hostLogin = user => {
    return axios
    .post('/hostLogin', {
        email: user.email,
        password: user.password
    })
    .then(res => {
        localStorage.setItem('usertoken', res.data)
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}
