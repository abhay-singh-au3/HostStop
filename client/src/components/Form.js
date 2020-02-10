import React from 'react';
import useForm from './useForm';
import validate from './validateSignup'
import { hostSignup } from './UserLoginSignupFunctions';
import { userSignup } from './UserLoginSignupFunctions';

const Form = (props) => {
    const { handleChange, handleSubmit, user, errors } = useForm(success, validate)
    function success() {
        const { firstName, lastName, email, password } = user
        const newUser = {
            firstName,
            lastName,
            email,
            password
        }
        if (props.type === "Become a Host") {
            hostSignup(newUser)
        } else {
            userSignup(newUser)
        }
    }

    return (
        <React.Fragment>
            <form noValidate onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="col-md-6">
                        <label htmlFor="firstName">Firstname</label>
                        <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            onChange={handleChange}
                            value={user.firstName}
                        />
                        {errors.firstName && <p className="error lead">{errors.firstName}</p>}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="lastName">Firstname</label>
                        <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            onChange={handleChange}
                            value={user.lastName}
                        />
                        {errors.lastName && <p className="error lead">{errors.lastName}</p>}
                    </div>
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={handleChange}
                        value={user.email}
                    />
                    {errors.email && <p className="error lead">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={handleChange}
                        value={user.password}
                    />
                    {errors.password && <p className="error lead">{errors.password}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPass">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="confirmPass"
                        onChange={handleChange}
                        value={user.confirmPass}
                    />
                    {errors.confirmPass && <p className="error lead">{errors.confirmPass}</p>}
                </div>
                <button className="btn btn-danger" type="submit">Submit</button>
            </form>
        </React.Fragment>
    );
}

export default Form;