import React from 'react'
import colorPenIcon from '../../assets/FooterSection/footer-icon.png'
import './Footer.css'

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <p className="legal">
                Copyright &copy; {currentYear} All rights reserved | This template is made with ReactJS &nbsp;by&nbsp;&nbsp; <img width='20px' height='20px' src={colorPenIcon} alt="" /> &nbsp; Arunpandian
            </p>
        </footer>
    )
}

export default Footer