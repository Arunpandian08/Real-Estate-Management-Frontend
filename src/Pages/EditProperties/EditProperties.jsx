import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import './EditProperties.css'
import propertyServices from '../../Services/propertyServices'
import { Flip, toast } from 'react-toastify'

const EditProperties = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [initialValues, setInitialValues] = useState({
        property_type: '',
        location: '',
        price: '',
        status: '',
        description: ''
    })
    const fetchProperty = async () => {
        try {
            const response = await propertyServices.getAllProperties()
            const property = response.data.properties.find(prop => prop._id === id)
            if (property) {
                setInitialValues({
                    property_type: property.property_type,
                    location: property.location,
                    price: property.price,
                    status: property.status,
                    description: property.description
                })
            }
        } catch (error) {
            console.error('Error fetching property', error);
        }
    }

    useEffect(() => {
        fetchProperty()
    }, [id])

    const validationSchema = Yup.object({
        property_type: Yup.string().required('Type of Property is Required'),
        location: Yup.string().required('Location Required'),
        price: Yup.number().required('Price must Required').positive('Price must be positive'),
        status: Yup.string().required('Status Required'),
        description: Yup.string().required('Description Required')
    })

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await propertyServices.updateProperty({ id, data: values })
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
            console.log('property Updated:', response.data)
            navigate('/')
        } catch (error) {
            toast.error(error.response.data.message || 'Update Failed!', {
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
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <section>
            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
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
                                id="property_type"
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
                        <div className="form-check form-check-inline">
                            <Field
                                className="form-check-input"
                                type="radio"
                                name="status"
                                id="available"
                                value="Available"
                            />
                            &nbsp; <label className="form-check-label" htmlFor="available">Available</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <Field
                                className="form-check-input"
                                type="radio"
                                name="status"
                                id="sold"
                                value="Sold"
                            />
                            &nbsp;<label className="form-check-label" htmlFor="sold">Sold</label>
                        </div>
                        <ErrorMessage name="status" component="div" className="text-danger" />
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <Field
                                as="textarea"
                                className="form-control"
                                id="description"
                                name="description"
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

export default EditProperties
