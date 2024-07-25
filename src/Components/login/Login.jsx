import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './login.css';
import userServices from '../../Services/userServices';
import { Flip, toast } from 'react-toastify';

const Login = ({ onClose, toggleForm, setIsAuthenticated }) => {
  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email Required'),
    password: Yup.string().required('Password Required')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await userServices.signIn(values.email, values.password)
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
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true)
      await userServices.getUser()
      onClose();
    } catch (error) {
      toast.error(error.response.data.message || 'Sign in Failed!', {
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
    <div>
      <div className="card-front">
        <h1 className="header">
          Sign in
          <span onClick={onClose}>X</span>
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                name="email"
                autoComplete="email"
                placeholder="example@gmail.com"
                style={{ fontSize: '0.8rem' }}
                required
              />
              <ErrorMessage name="email" component="div" className="text-danger" />

              <label htmlFor="password">Password:</label>
              <Field
                style={{ fontSize: '0.8rem' }}
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Enter a valid password"
                required
              />
              <ErrorMessage name="password" component="div" className="text-danger" />

              <button className="submit-btn" type="submit" disabled={isSubmitting}>
                Sign in
              </button>
              <p className="toggle-link" onClick={toggleForm}>
                Don't have an account? Register
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Login