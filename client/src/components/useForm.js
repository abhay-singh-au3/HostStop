import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
    const [user, setUser] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPass: "" })
    const [errors, setErrors] = useState({  })
    const [valid, setValid] = useState(false)

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        setErrors(validate(user))
        setValid(true)
    }

    useEffect(() => {
        if(Object.keys(errors).length === 0 && valid) {
            callback()
        }
    }, [errors])

    return {
        handleChange,
        handleSubmit,
        user,
        errors
    }
}

export default useForm;