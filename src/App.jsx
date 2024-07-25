import React, { lazy, Suspense, useEffect, useState } from 'react'
import './index.css'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Loader from './Utilities/Loader/Loader'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = lazy(() => (import('./Pages/Dashboard/Home')))
const AddProperties = lazy(() => (import('./Pages/AddProperties/AddProperties')))
const EditProperties = lazy(() => (import('./Pages/EditProperties/EditProperties')))


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      {isLoading ? <Loader /> :
        <>
          <Router>
            <Suspense fallback={<Loader />}>
              <Navbar
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              <ToastContainer />
              <main className='app'>
                <Routes>
                  <Route path='/' element={<Home isAuthenticated={isAuthenticated} searchTerm={searchTerm} />} />
                  <Route path='/add-properties' element={<AddProperties />} />
                  <Route path='/edit-properties/:id' element={<EditProperties />} />
                </Routes>
              </main>
            </Suspense>
          </Router>
          <Footer />
        </>
      }
    </>
  )
}

export default App