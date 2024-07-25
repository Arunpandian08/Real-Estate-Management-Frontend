import React, { useEffect, useState } from 'react'
import './Home.css'
import { formatPrice } from '../../Utilities/utils'
import { useNavigate } from 'react-router-dom'
import propertyServices from '../../Services/propertyServices'
import userServices from '../../Services/userServices'

const Home = ({ isAuthenticated, searchTerm }) => {
    const [properties, setProperties] = useState([])
    const [filteredProperties, setFilteredProperties] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [userName, setUserName] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getProperties()
    }, [])

    useEffect(() => {
        if (isAuthenticated) {
            getUserName()
        }
    }, [isAuthenticated])

    const getUserName = async () => {
        try {
            const user = await userServices.getUser()
            setUserName(user.data.user.name)
        } catch (error) {
            console.error('Failed to fetch user name', error);
        }
    }

    const getProperties = async () => {
        setIsLoading(true)
        try {
            const response = await propertyServices.getAllProperties()
            setProperties(response.data.properties)
        } catch (error) {
            console.error('Failed to fetch properties', error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        // Filter properties based on search term
        if (searchTerm === '') {
            setFilteredProperties(properties)
        } else {
            setFilteredProperties(properties.filter(property =>
                property.property_type.toLowerCase().includes(searchTerm.toLowerCase())
            ))
        }
    }, [searchTerm, properties])

    const handleDelete = async (id) => {
        try {
            const response = await propertyServices.deleteProperty(id)
            console.log('deleted successful', response.data)
            getProperties()
        } catch (error) {
            console.error('Failed to delete', error);
        }
    }

    return (
        <section>
            <div className="title text-center">
                <h4>Hello! {isAuthenticated ? userName : 'Guest'}</h4>
                <h4>All Type of Properties</h4>
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4 m-2">
                {filteredProperties?.map((item, index) => {
                    return (
                        <div className="col animate__animated animate__fadeIn" key={index}>
                            <div className="card h-100 text-center">
                                <div className="card-body">
                                    <h5 className="card-title">{item.property_type}</h5>
                                    <p className="card-text"><i className="fa-solid fa-location-crosshairs"></i> &nbsp; {item.location}</p>
                                    <p className="card-text">₹ {formatPrice(item.price)}</p>
                                    <p className="card-text">{item.description}</p>
                                </div>
                                <div className="card-footer">
                                    {isAuthenticated ? <div className="edit-post" onClick={() => navigate(`/edit-properties/${item._id}`)}>
                                        <span className="edit-tooltip">Edit Post</span>
                                        <span className="edit-icon"><i className="fa-solid fa-pen-clip"></i></span>
                                    </div> : <div>{''}</div>}
                                    <div className='availability'>
                                        {item?.status === 'Sold' ? (
                                            <span className="badge text-bg-success">Sold</span>
                                        ) : (
                                            <span className="badge text-bg-warning">Available</span>
                                        )}
                                    </div>
                                    {isAuthenticated ? <div className='delete-post' onClick={() => handleDelete(item._id)}>
                                        <span className="delete-tooltip">Delete</span>
                                        <span className="delete-icon"><i className="fa-solid fa-trash"></i></span>
                                    </div> : <div>{''}</div>}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Home