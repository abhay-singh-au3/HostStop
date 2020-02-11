import React, { Fragment, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const Profile = () => {
    const [user, setUser] = useState({ firstName: "", lastName: "", email: "", error: {} })

    useEffect(() => {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        setUser({
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email
        })
    }, [])

    return (
        <Fragment>
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">PROFILE</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td>Fist Name</td>
                                <td>{user.firstName}</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{user.lastName}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{user.email}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
}

export default Profile;