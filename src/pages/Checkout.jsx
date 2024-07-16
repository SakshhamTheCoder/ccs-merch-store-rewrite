import React, { useEffect, useState } from 'react';
import api from '../helpers/AxiosClient';
import Button from '../components/Button';
import { faGift, faMoneyBill, faRemove } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Checkout = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const [cartAmt, setCartAmt] = useState({});

    const [code, setCode] = useState('');
    const [codeApplied, setCodeApplied] = useState(false);
    const [codeError, setCodeError] = useState(false);

    const fetchCartItems = () => {
        api.get('/cart/view/')
            .then(response => {
                setCartProducts(response.items);
                setCartAmt({
                    total_amount: response.total_amount,
                    discount_percentage: 0,
                    updated_amount: response.total_amount
                });
            });
    };

    const applyDiscount = () => {
        if (code === '') {
            return;
        }
        api.post('/order/apply-discount/', { discount_code: code.toUpperCase() })
            .then(response => {
                setCartAmt({
                    total_amount: response.total_amount,
                    discount_percentage: response.discount_percentage,
                    updated_amount: response.updated_amount
                });
                setCodeError(false);
                setCodeApplied(true);
            }).catch(error => {
                if (error.response.status === 400) {
                    setCodeError(true);
                    setCodeApplied(false);
                }
            });
    };

    const removeDiscount = () => {
        api.post('/order/apply-discount/', { discount_code: 'NO_DISCOUNT' })
            .then(response => {
                setCartAmt({
                    total_amount: response.total_amount,
                    discount_percentage: 0,
                    updated_amount: response.total_amount
                });
                setCode('');
                setCodeError(false);
                setCodeApplied(false);
            });
    };

    useEffect(() => {
        fetchCartItems();
    }, []);
    return (
        <div className='flex flex-col-reverse md:flex-row gap-8 rounded-lg items-center w-full h-full'>
            <div className='flex flex-col rounded-lg p-6 shadow-lg border-2 h-full w-full md:w-1/3 bg-container'>
                <div className='text-3xl font-bold capitalize'>
                    Checkout
                </div>
                <hr className='my-2 border-2 rounded-lg' />
                <div>
                    <label htmlFor='discount' className='text-sm'>Have any Discount Code?</label>
                    <div className='relative'>
                        <input disabled={codeApplied} type='text' name='discount' placeholder='Discount Code' className='border-2 border-gray-200 rounded-lg p-2 w-full' onChange={(e) => setCode(e.target.value.toUpperCase())} value={code} />
                        <Button icon={faRemove} disabled={!codeApplied} onClick={removeDiscount} className='absolute end-2.5 bottom-2.5'></Button>
                    </div>
                    <p className={`${codeApplied ? "block" : "hidden"} text-xs text-green-500`}>Discount code applied!</p>
                    <p className={`${codeError ? "block" : "hidden"} text-xs text-red-500`}>Discount code is invalid!</p>

                    <Button disabled={codeApplied} onClick={applyDiscount} icon={faGift} className='px-4 py-2 mt-4 w-full' text='Apply Discount' />
                </div>
                <div className='mt-auto'>
                    <hr className='border-t-2 my-4 border-gray-200 rounded-lg' />
                    <div>
                        <div className='flex flex-col'>
                            <div className='flex justify-between'>
                                <span>Total Amount:</span>
                                <span className='font-bold'>₹{parseFloat(cartAmt.total_amount).toFixed(2)}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span>Discount:</span>
                                <span className='font-bold'>{cartAmt.discount_percentage}%</span>
                            </div>
                            <div className='flex justify-between'>
                                <span>Subtotal:</span>
                                <span className='font-bold'>₹{parseFloat(cartAmt.updated_amount).toFixed(2)}</span>
                            </div>
                        </div>
                        <Link to='/checkout'>
                            <Button className='px-4 py-2 mt-4 w-full' icon={faMoneyBill} isActive text="Pay Now" />
                        </Link>
                    </div>
                </div>

            </div>
            <div className='rounded-lg p-4 shadow-lg border-2 h-full w-full flex-1 bg-container'>
                <div className='flex flex-col flex-1 gap-4 overflow-auto'>
                    {cartProducts.length > 0 ? cartProducts.map(product => (
                        <div key={product.id} className='rounded-lg border-2 border-gray-200 bg-zinc-100 justify-center'>
                            <div className='flex justify-between items-center border-b-2 rounded-lg bg-white p-4'>
                                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png' alt={product.product.name} className='w-16 h-auto rounded-md' />
                                <p>{product.product.name}</p>
                                <p className='font-bold flex flex-col items-start'>
                                    ₹{parseFloat(product.product.price * product.quantity).toFixed(2)}
                                    <span className='text-xs text-gray-500'>₹{product.product.price} x {product.quantity}</span>
                                </p>
                            </div>
                            <div className='p-2 rounded-b-lg text-xs'>
                                <div>Quantity: <span className='font-bold'>{product.quantity}</span></div>
                                {product.product.is_size_required && (
                                    <div>Size: <span className='font-bold'>{product.size}</span></div>
                                )}
                                {product.product.is_name_required && (
                                    <div>Printing Name: <span className='font-bold'>{product.printing_name}</span></div>
                                )}
                                {product.product.is_image_required && (
                                    <div>Uploaded Image: <a href={product.image_url} target='_blank' rel='noreferrer' className='text-blue-500 font-bold'>Click here</a></div>
                                )}
                            </div>
                        </div>
                    )) :
                        <div className='flex justify-center items-center h-64'>
                            <p>Your cart is empty!</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Checkout;