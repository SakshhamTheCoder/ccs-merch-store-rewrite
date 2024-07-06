import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../helpers/AxiosClient';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Button } from '../components';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Product = () => {
    const [product, setProduct] = useState({});
    const productId = useParams().id;

    const [disabled, setDisabled] = useState(false);
    const [buttonText, setButtonText] = useState('Add to cart');

    const [name, setName] = useState('');
    const [size, setSize] = useState('');
    const [image, setImage] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const AddToCart = () => {
        console.log(name, size, image);
        if (product.status !== 'allowed') {
            setDisabled(true);
            return;
        }
        if (product.is_name_required && (name === '' || name === null)) {
            alert('Name is required');
            return;
        }
        if (product.is_size_required && (size === '' || size === null)) {
            alert('Size is required');
            return;
        }
        if (product.is_image_required && (image === '' || image === null)) {
            alert('Image is required');
            return;
        }
        api.post('/cart/add/', {
            product_id: productId,
            printing_name: name,
            size: size,
            image_url: image,
            quantity: quantity
        }).then(response => {
            console.log(response);
            alert('Product added to cart');
            setButtonText('Already in cart');
        }).catch(error => {
            if (error.response.status === 400) {
                alert('Product already in cart or quantity limit exceeded');
            }
        }).finally(() => {
            setDisabled(true);
        });

    };

    useEffect(() => {
        api.get(`/product/${productId}`)
            .then(response => {
                setProduct(response);
                if (response.status !== 'allowed') {
                    if (response.status === 'incart') {
                        setDisabled(true);
                        setButtonText('Already in cart');
                    }
                    else {
                        setDisabled(true);
                        setButtonText('Out of stock');
                    }
                }
                console.log(response);
            }).catch(error => {
                console.error(error);
            });
    }, [productId]);

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (value > 0 && value <= product.max_quantity) {
            setQuantity(value);
        }
    };

    const increaseQuantity = () => {
        if (quantity < product.max_quantity) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className='flex flex-col sm:flex-row gap-8 rounded-lg items-center w-full sm:overflow-hidden h-full'>
            <div className='flex flex-col rounded-lg p-8 shadow-lg border-2 h-full w-full sm:w-1/3 bg-container justify-center items-center md:p-16'>
                <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true} showStatus={false} showArrows={true}>
                    <div>
                        <img src='https://media.merch.ccstiet.com/product/ID_Card/CCS_MEM-01.png' alt='Product' />
                    </div>
                    <div>
                        <img src='https://media.merch.ccstiet.com/product/ID_Card/CCS_MEM-01.png' alt='Product' />
                    </div>
                    <div>
                        <img src='https://media.merch.ccstiet.com/product/ID_Card/CCS_MEM-01.png' alt='Product' />
                    </div>
                </Carousel>
            </div>
            <div className='rounded-lg p-4 shadow-lg border-2 h-full flex-1 bg-container w-full sm:overflow-auto'>
                <div className='flex flex-col p-2 gap-8 h-full'>
                    <div>
                        <div className='text-3xl font-bold capitalize flex justify-between items-center'>
                            {product.name}
                            <div className='text-xl font-bold'>₹{product.price}</div>
                        </div>
                        <div className='text-l flex justify-between sm:items-center flex-col sm:flex-row'>
                            {product.description}
                            <div>Max Quantity: {product.max_quantity}</div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        {
                            product.is_name_required && (
                                <div className='flex flex-col'>
                                    <label htmlFor='name' className='text-l'>Printing Name:</label>
                                    <input type='text' id='name' className='rounded-lg border-2 p-2' onChange={(e) => setName(e.target.value)} />
                                </div>
                            )
                        }
                        {
                            product.is_size_required && (
                                <div className='flex flex-col'>
                                    <label htmlFor='size' className='text-l'>Size:
                                        {
                                            product.size_chart_image != null && (
                                                <a href={product.size_chart_image} target='_blank' rel='noreferrer' className='ml-2 text-blue-700 text-xs'>
                                                    Size Chart
                                                </a>
                                            )
                                        }
                                    </label>

                                    <select id='size' className='rounded-lg border-2 p-2' value={size} onChange={(e) => setSize(e.target.value)}>
                                        <option>Select Size</option>
                                        <option value='S'>Small</option>
                                        <option value='M'>Medium</option>
                                        <option value='L'>Large</option>
                                        <option value='XL'>Extra Large</option>
                                    </select>
                                </div>
                            )
                        }
                        {
                            product.is_image_required && (
                                <div className='flex flex-col'>
                                    <label htmlFor='image' className='text-l'>Upload Image:</label>
                                    <input type='file' id='image' className='rounded-lg border-2 p-2' onChange={(e) => setImage(e.target.files[0])} />
                                </div>
                            )
                        }
                    </div>
                    <div className='mt-auto flex items-center gap-4'>
                        <div className='flex items-center gap-2'>
                            <button onClick={decreaseQuantity} className='rounded-lg border-2 p-2'>-</button>
                            <input type='number' value={quantity} onChange={handleQuantityChange} className='rounded-lg border-2 p-2 w-16 text-center' min='1' max={product.max_quantity} />
                            <button onClick={increaseQuantity} className='rounded-lg border-2 p-2'>+</button>
                        </div>
                        <Button disabled={disabled} text={buttonText} icon={faCartPlus} isActive className='w-full items-center flex justify-center py-2' onClick={AddToCart} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
