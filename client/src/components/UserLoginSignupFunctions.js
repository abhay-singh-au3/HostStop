import axios from 'axios';

export const userSignup = newUser => {
    return axios
    .post('/userSignup', {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password
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
}

export const userLogin = user => {
    return axios
    .post('/userLogin', {
        email: user.email,
        password: user.password
    })
    .then(res => {
        if(res.status === 200) {
            return res
        } else {
            const error = new Error(res.error);
            throw error
        }
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
        if(res.status === 200) {
            return res
        } else {
            const error = new Error(res.error);
            throw error
        }
    })
    .catch(err => {
        console.log(err)
    })
}
