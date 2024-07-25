import React, { useState } from 'react';
import './Navbar.css';
import brandIcon from '../../assets/NavbarIcon/brandLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../modal/Modal';
import userServices from '../../Services/userServices'; // Import user services
import { Slide, toast } from 'react-toastify';

const Navbar = ({ isAuthenticated, setIsAuthenticated, searchTerm, setSearchTerm }) => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);

    // Handle logout
    const handleLogout = async () => {
        try {
            await userServices.logout();
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            navigate('/')
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleAddPropertiesClick = (event) => {
        if (!isAuthenticated) {
            event.preventDefault();
            toast.warn('Please Sign in to add Properties', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide,
            });
            setOpen(true)
        }
    }

    return (
        <nav className="navbar sticky-top navbar-expand-lg">
            <div className="container-fluid nav-content">
                <a className="navbar-brand" href="/"><img src={brandIcon} alt="logo" />House Builders</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={handleAddPropertiesClick} to='/add-properties' >Add Properties</Link>
                        </li>
                    </ul>
                    <form className="nav-link d-flex" role="search">
                        <input className="form-control me-5 mb-0"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </form>
                    <div className='nav-btn'>
                        {isAuthenticated ? (
                            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                        ) : (
                            <button className="btn btn-success" onClick={() => setOpen(true)}>Sign in</button>
                        )}
                        {open && <Modal onClose={() => setOpen(false)} setIsAuthenticated={setIsAuthenticated} />}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
