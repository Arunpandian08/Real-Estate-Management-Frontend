import React from 'react'
import './Loader.css'

const Loader = () => {
    return (
        <div className='spinner'>
            <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Loader