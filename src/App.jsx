import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthContext from './helpers/AuthContext';
import {
    Home,
    Login,
    Product,
    Order,
    AuthVerify
} from './pages';
import { Loader, Navbar } from './components';
import Checkout from './pages/Checkout';

const App = () => {
    const authCtx = useContext(AuthContext);
    if (!authCtx.isAuthChecked) {
        return (<div className='min-h-screen flex items-center justify-center'>
            <Loader />;
        </div>);
    }
    return (
        <div className="flex flex-col min-h-screen md:h-screen p-4 md:p-8 text-primary">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/login" element={!authCtx.isLoggedIn ? <Login /> : <Navigate to="/" />} />
                    <Route path="/product/:id" element={authCtx.isLoggedIn ? <Product /> : <Navigate to="/login" />} />
                    <Route path="/checkout" element={authCtx.isLoggedIn ? <Checkout /> : <Navigate to="/login" />} />
                    <Route path="/" element={authCtx.isLoggedIn ? <Home user={authCtx.user} /> : <Navigate to="/login" />} />
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                    <Route path="/authVerify" element={<AuthVerify />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;