import React, { useState } from 'react';
import './modal.css';
import Login from '../login/Login';
import Register from '../register/Register';

const Modal = ({ onClose, setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div onClick={onClose} className='modal'>
      <div onClick={e => e.stopPropagation()} className='modal-contents'>
        <div className={`modal-card ${isLogin ? '' : 'flipped'}`}>
          <Login onClose={onClose} toggleForm={toggleForm} setIsAuthenticated={setIsAuthenticated} />
          <Register onClose={onClose} toggleForm={toggleForm} setIsAuthenticated={setIsAuthenticated} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
