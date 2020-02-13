export default function validate(user) {
    let errors = {}

    if (user.firstName.trim().length < 1) {
        errors.firstName = "Firstname cannnot be empty"
    } else if (user.firstName.length > 25) {
        errors.firstName = "Should be less than 25 chars"
    }
    if (user.lastName.trim().length < 1) {
        errors.lastName = "Lastname cannnot be empty"
    } else if (user.lastName.length > 25) {
        errors.lastName = "Should be less than 25 chars"
    }
    if (user.email.trim().length < 1) {
        errors.email = "Email Cannot be empty"
    } else if (!/\S+@\S+/.test(user.email)) {
        errors.email = "Email address is invalid"
    }
    if (user.password.trim().length < 1) {
        errors.password = "Password is required"
    }
    if (user.password !== user.confirmPass) {
        errors.confirmPass = "Passwrod should match"
    }


    return errors
}