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

const App = () => {
    // const authCtx = useContext(AuthContext);
    // if (!authCtx.isAuthChecked) {
    //     return <Loader />;
    // }
    return (
        <div className="flex flex-col h-screen p-8 text-primary">
            <Router>
                <Navbar />
                <Routes>
                    {/* <Route path="/login" element={!authCtx.isLoggedIn ? <Login /> : <Navigate to="/" />} /> */}
                    {/* <Route path="/product/:id" element={authCtx.isLoggedIn ? <Product /> : <Navigate to="/login" />} /> */}
                    {/* <Route path="/order" element={authCtx.isLoggedIn ? <Order /> : <Navigate to="/login" />} /> */}
                    {/* <Route path="/" element={authCtx.isLoggedIn ? <Home user={authCtx.user} /> : <Navigate to="/login" />} /> */}
                    <Route path="/" element={<Home />} />
                    {/* <Route path="*" element={<Navigate to="/login" />} /> */}
                    {/* <Route path="/authVerify" element={<AuthVerify />} /> */}
                </Routes>
            </Router>
        </div>
    );
};

export default App;