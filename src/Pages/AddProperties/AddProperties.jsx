import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import './AddProperties.css'
import propertyServices from '../../Services/propertyServices'
import { useNavigate } from 'react-router-dom'
import { Flip, toast } from 'react-toastify'

const AddProperties = () => {
    const navigate = useNavigate()
    const initialValues = {
        property_type: '',
        location: '',
        price: '',
        description: ''
    }

    const validationSchema = Yup.object({
        property_type: Yup.string().required('Type of Property is Required'),
        location: Yup.string().required('Location Required'),
        price: Yup.number().required('Price Required').positive('Price must be positive'),
        description: Yup.string().required('Description Required')
    })

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await propertyServices.addProperties({ data: values })
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
            resetForm()
            navigate('/')
            return response.data
        } catch (error) {
            toast.error(error.response.data.message || 'Failed Adding property!', {
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
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <section>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className='p-5 animate__animated animate__fadeIn'>
                        <div className="mb-3">
                            <label htmlFor="property_type" className="form-label">Type of Property</label>
                            <Field
                                type="text"
                                name="property_type"
                                className="form-control"
                                id="propertyType"
                                placeholder="Enter the property type ex., Land, House"
                            />
                            <ErrorMessage name="property_type" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label">Location</label>
                            <Field
                                type="text"
                                name="location"
                                className="form-control"
                                id="location"
                                placeholder="Location of the property"
                            />
                            <ErrorMessage name="location" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price[ ₹ ]</label>
                            <Field
                                type="number"
                                name="price"
                                className="form-control"
                                id="price"
                                placeholder="Price Value of the property"
                            />
                            <ErrorMessage name="price" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <Field
                                as="textarea"
                                name="description"
                                className="form-control"
                                id="description"
                                rows="3"
                            />
                            <ErrorMessage name="description" component="div" className="text-danger" />
                        </div>
                        <div className="button">
                            <button className="btn btn-warning" type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </section>
    )
}

export default AddProperties;
