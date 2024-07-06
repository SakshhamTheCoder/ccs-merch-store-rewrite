import React, { useState, useContext } from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ccs_bulb from '../assets/CCS_Bulb.png';
import AuthContext from '../helpers/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const authCtx = useContext(AuthContext);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleLogout = () => {
        setIsDropdownVisible(false);
        authCtx.logout();
    };

    const handleHelp = () => {
        // Add help functionality here
        setIsDropdownVisible(false);

    };

    return (
        <div className='select-none p-8 mb-8 rounded-xl shadow-lg text-white w-full h-16 bg-primary flex items-center justify-between'>
            <div className="flex-1 text-left font-bold text-2xl">
                <Link to="/">
                    Merch Store
                </Link>
            </div>
            <a href="https://ccstiet.com" target='_blank' className='relative w-[5.4rem] h-24 bg-primary rounded-[50%/40%] justify-center items-center mx-auto hidden sm:flex'>
                <img src={ccs_bulb} alt="Logo" className="p-2" />
            </a>
            <div className="relative sm:flex-1 flex justify-end">
                <FontAwesomeIcon icon={faUser} onClick={toggleDropdown} className="cursor-pointer font-bold text-2xl" />
                {isDropdownVisible && (
                    <div className="absolute right-0 top-12 w-48 bg-primary rounded-md shadow-lg z-10">
                        <ul>
                            {
                                authCtx.isLoggedIn && (
                                    <li
                                        className="px-4 py-2 hover:bg-primaryHover hover:rounded-md cursor-pointer"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </li>
                                )
                            }
                            <li
                                className="px-4 py-2 hover:bg-primaryHover hover:rounded-md cursor-pointer"
                                onClick={handleHelp}
                            >
                                Help
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
