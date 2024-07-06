import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../helpers/AxiosClient';
import { HomeTabs } from '../components';



const Home = ({ user }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get('/product/all')
            .then(response => {
                setProducts(response); // Assuming response.data contains the array of products
            }).catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className='flex flex-col sm:flex-row gap-8 rounded-lg items-center w-full sm:overflow-hidden h-full'>
            <div className='flex sm:flex-col rounded-lg p-6 shadow-lg border-2 h-full w-full sm:w-1/3 bg-container'>
                <div className='text-3xl font-bold capitalize'>
                    Hello,
                    <br />
                    {/* {user.name.split(' ')[0].toLowerCase()}! */}
                    Name
                </div>
                <hr className='my-2 border-2 rounded-lg ' />
                <HomeTabs />
            </div>
            <div className='rounded-lg p-4 shadow-lg border-2 h-full flex-1 bg-container sm:overflow-auto'>
                <div className='grid sm:grid-cols-3 gap-4 p-2 grid-cols-2'>
                    {products.map(product => (
                        <Link to={`/product/${product.id}`} key={product.id} className='rounded-md p-4 border-2 bg-white flex flex-col hover:scale-105 transition-all'>
                            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png' alt={product.name} className='w-full h-auto' />
                            <div className='text-xl mt-3'>{product.name}</div>
                            <div className='font-bold'>₹{product.price}/-</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
