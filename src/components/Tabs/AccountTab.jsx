import React, { useContext } from 'react';
import AuthContext from '../../helpers/AuthContext';

const AccountTab = () => {
    const auth = useContext(AuthContext);


    return (
        <div className='flex flex-col justify-between items-center h-full p-12'>
            <img src={auth.user.profilePic} alt="" className='rounded-full' />
            <div className='flex flex-col text-left'>
                <p>
                    <span className='font-bold'>Name: </span>
                    {auth.user.name}
                </p>
                <p>
                    <span className='font-bold'>Email: </span>
                    {auth.user.email}
                </p>
                <p>
                    <span className='font-bold'>Phone: </span>
                    {auth.user.phone_no}
                </p>
            </div>
        </div>
    );
};

export default AccountTab;