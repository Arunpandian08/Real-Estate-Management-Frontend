import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './register.css'
import userServices from '../../Services/userServices';
import { Flip, toast } from 'react-toastify';

const Register = ({ onClose, toggleForm, setIsAuthenticated }) => {
    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is Required'),
        email: Yup.string().email('Invalid email Address').required('Email is Required'),
        password: Yup.string().required('Password Required').min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match').required('Confirm password is required')
    })

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await userServices.signUp(values.name, values.email, values.password, values.confirmPassword)
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 200,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Flip,
            });
            console.log('Sign in Successful !', response.data);
            localStorage.setItem('token', response.data.token);
            await userServices.getUser()
            setIsAuthenticated(true)
            onClose()
        } catch (error) {
            toast.error(error.response.data.message || 'Sign Up Failed!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Flip,
            });
            throw error.response.data;
        }
        finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="card-back">
            <h1 className="header">
                Register
                <span onClick={onClose}>X</span>
            </h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <label htmlFor="name">Name:</label>
                        <Field
                            type="text"
                            name="name"
                            style={{ fontSize: '0.8rem', marginBottom: "0rem" }}
                            placeholder="Enter Your Name"
                            required
                        />
                        <ErrorMessage name="name" component="div" className="text-danger" />

                        <label htmlFor="email">Email:</label>
                        <Field
                            type="email"
                            name="email"
                            style={{ fontSize: '0.8rem', marginBottom: "0rem" }}
                            autoComplete="email"
                            placeholder="example@gmail.com"
                            required
                        />
                        <ErrorMessage name="email" component="div" className="text-danger" />

                        <label htmlFor="password">Password:</label>
                        <Field
                            type="password"
                            name="password"
                            style={{ fontSize: '0.8rem', marginBottom: "0rem" }}
                            autoComplete="new-password"
                            placeholder="Enter your password"
                            required
                        />
                        <ErrorMessage name="password" component="div" className="text-danger" />

                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <Field
                            type="password"
                            style={{ fontSize: '0.8rem', marginBottom: "0rem" }}
                            name="confirmPassword"
                            autoComplete="new-password"
                            placeholder="Confirm your password"
                            required
                        />
                        <ErrorMessage name="confirmPassword" component="div" className="text-danger" />

                        <button className="submit-btn" type="submit" disabled={isSubmitting}>
                            Register
                        </button>
                        <p className="toggle-link" onClick={toggleForm}>
                            Already have an account? Sign in
                        </p>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Register