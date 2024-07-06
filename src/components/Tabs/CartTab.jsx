import React, { useEffect, useState } from 'react';
import api from '../../helpers/AxiosClient';

const CartTab = () => {
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = () => {
        setCartProducts(
            [
                {
                    "id": 1,
                    "product": {
                        "id": 1,
                        "name": "Hoodie",
                        "description": "Hoodieseeeeeee",
                        "price": "1000.00",
                        "max_quantity": 1,
                        "is_name_required": true,
                        "is_size_required": true,
                        "is_image_required": false,
                        "image1": "/media/product/Hoodie/CCS_Bulb_n3hqUTY.png",
                        "image2": null,
                        "status": "forbidden",
                        "size_chart_image": null
                    },
                    "quantity": 1,
                    "printing_name": "Sakshham Bhagat",
                    "size": "S",
                    "image_url": null
                },
                {
                    "id": 2,
                    "product": {
                        "id": 2,
                        "name": "Tshirt",
                        "description": "Tshirt hai",
                        "price": "925.00",
                        "max_quantity": 2,
                        "is_name_required": true,
                        "is_size_required": true,
                        "is_image_required": false,
                        "image1": "/media/product/Tshirt/CCS_Bulb.png",
                        "image2": null,
                        "status": "forbidden",
                        "size_chart_image": null
                    },
                    "quantity": 1,
                    "printing_name": "Sakshham Bhagat",
                    "size": "L",
                    "image_url": null
                }
            ]
        );
        // api.get('/cart/view/')
        //     .then(response => {
        //         setCartProducts(response); // Assuming response contains the array of cart products directly
        //     }).catch(error => {
        //         console.error(error);
        //     });
    };

    const increaseQuantity = (productId) => {
        const updatedCart = cartProducts.map(product => {
            if (product.id === productId) {
                if (product.quantity < product.product.max_quantity) {
                    return { ...product, quantity: product.quantity + 1 };
                } else {
                    alert(`Maximum quantity (${product.product.max_quantity}) reached for ${product.product.name}`);
                    return product;
                }
            }
            return product;
        });
        updateCart(updatedCart);
    };

    const decreaseQuantity = (productId, currentQuantity) => {
        if (currentQuantity === 1) {
            if (window.confirm(`Are you sure you want to remove ${cartProducts.find(product => product.id === productId)?.product.name} from your cart?`)) {
                api.post('/cart/delete/', { cart_item_id: productId })
                    .then(() => {
                        const updatedCart = cartProducts.filter(product => product.id !== productId);
                        setCartProducts(updatedCart);
                    }).catch(error => {
                        console.error(error);
                        // Handle error
                    });
            }
        } else {
            const updatedCart = cartProducts.map(product => {
                if (product.id === productId) {
                    return { ...product, quantity: product.quantity - 1 };
                }
                return product;
            });
            updateCart(updatedCart);
        }
    };

    const updateCart = (updatedCart) => {
        api.post('/cart/update/', { cart_items: updatedCart })
            .then(() => {
                setCartProducts(updatedCart);
            }).catch(error => {
                console.error(error);
                // Handle error
            });
    };

    return (
        <div className='flex flex-col h-full'>
            <div className='overflow-auto flex-1 flex-col'>
                {cartProducts.map(product => (
                    <div key={product.id} className='my-2 rounded-lg border-2 border-gray-200 bg-zinc-100'>
                        <div className='flex justify-between items-center border-b-2 rounded-lg bg-white px-4'>
                            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png' alt={product.product.name} className='w-16 h-auto rounded-md' />
                            <div>
                                <p className=''>{product.product.name}</p>
                                <p className='font-bold'>₹{product.product.price}</p>
                            </div>
                            <div className='flex justify-center items-center'>
                                <div className='flex items-center'>
                                    {product.product.is_size_required ?
                                        <span>{product.size}</span>
                                        :
                                        <span>?</span>
                                    }
                                </div>
                                <div className='mx-4 h-8 border-l border-gray-600'></div>
                                {/* Quantity control */}
                                <div className='flex flex-col items-center'>
                                    <button className='rounded-lg py-1' onClick={() => increaseQuantity(product.id)}>+</button>
                                    <span>{product.quantity}</span>
                                    <button className='rounded-lg py-1' onClick={() => decreaseQuantity(product.id, product.quantity)}>-</button>
                                </div>
                            </div>
                        </div>
                        {product.product.is_name_required && (
                            <div className='p-2 rounded-b-lg text-xs'>
                                <div>Printing Name: <span className='font-bold'>{product.printing_name}</span></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className='bg-gray-100 p-4 mt-auto'>
                <div className='flex flex-col'>
                    <div className='flex justify-between'>
                        <span>Order Value:</span>
                        <span>xyz</span>
                    </div>
                    <div className='flex justify-between'>
                        <span>Delivery:</span>
                        <span>xyz</span>
                    </div>
                    <div className='flex justify-between'>
                        <span>Discount:</span>
                        <span>xyz</span>
                    </div>
                    <div className='flex justify-between'>
                        <span>Subtotal:</span>
                        <span>xyz</span>
                    </div>
                </div>
                <button className='bg-primary text-white rounded-lg px-4 py-2 mt-4 w-full'>Checkout</button>
            </div>
        </div>
    );
};

export default CartTab;
