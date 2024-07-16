import { useEffect, useState } from 'react';
import api from '../../helpers/AxiosClient';

export const OrdersTab = () => {
    const [orderedItems, setOrderedItems] = useState([]);
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        api.get('/order/all/')
            .then(response => {
                setOrderedItems(response);
            }).catch(error => {
            });
    };
    return (
        <div className='flex flex-col h-full gap-4 justify-between'>
            <div className='flex overflow-auto flex-col flex-1 basis-0'>
                {orderedItems.length > 0 ? orderedItems.map((order, index) => (
                    <div key={index} className='flex flex-col gap-2 p-4 border border-gray-200 rounded-md'>
                        <div className='flex justify-between'>
                            <div className='font-bold'>Order ID: {order.id}</div>
                            <div>{order.date}</div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            {order.items.map((item, index) => (
                                <div key={index} className='flex justify-between'>
                                    <div>{item.product.name}</div>
                                    <div>Quantity: {item.quantity}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
                    : <div className='flex justify-center items-center h-full'>
                        <p>No previous orders to show!</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default OrdersTab;
