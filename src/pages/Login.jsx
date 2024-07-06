import React, { useState, useContext } from 'react';
import AuthContext from '../helpers/AuthContext';
import { Button } from '../components';
import { Link, useNavigate } from 'react-router-dom';



const Login = () => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    return (
        <div className='flex gap-8 rounded-lg items-center w-full overflow-hidden h-full'>
            <div className='flex flex-col rounded-lg p-8 shadow-lg border-2 h-full w-full bg-container justify-center items-center md:p-16'>
                <div className='text-4xl font-bold text-center'>
                    Welcome to
                    <br />
                    CCS Merchandise Store
                </div>
                <hr className='my-6 border-2 rounded-lg w-1/2' />
                <Button className="py-2" isActive text="Sign in with CCS" onClick={() => window.location.replace("https://auth.ccstiet.com/auth/google/?clientId=6674641394172361ee893797&callback=http://localhost:3000/authVerify")}>

                </Button>
            </div>
        </div>
    );
};
export default Login;
