import React, { useState } from 'react';

const Policies = () => {
    const [activePolicy, setActivePolicy] = useState(0);
    const policies = [
        {
            title: 'About Us',
            content: <p>This website is used for purchasing official merchandise from the store of Creative Computing Society and is open to all the students of TIET.
                <br /> <br /> Website operated and managed by <b><u>Akarsh Srivastava</u> - General Secretary, Creative Computing Society, Thapar Institute of Engineering and Technology, Patiala, Punjab, India - 147004</b></p>
        },
        {
            title: 'Contact Details',
            content: <p>Creative Computing Society, Thapar Institute of Engineering and Technology, Patiala, Punjab, India - 147004 <br />
                For any queries, contact us at <a href="mailto:ccs@thapar.edu" className="text-blue-500 font-bold">ccs@thapar.edu</a></p>
        },
        {
            title: 'Terms and Conditions',
            content: 'Shipping Policy content here'
        },
        {
            title: 'Return and Cancellation Policy',
            content: <p><b>No Cancellation Policy:</b><br />
                Once an order has been placed and confirmed on our website, it cannot be canceled. We process and begin fulfilling orders immediately to ensure timely delivery. Please ensure that all order details, including product selection and shipping information, are correct before finalizing your purchase.
                <br /> <br />
                <b>No Refund Policy:</b><br />
                We do not offer refunds for any products purchased from CCS Merch Store. This policy is in place because each item is custom-made to order and we strive to maintain the highest standards of quality for all our products.
            </p>
        },
        {
            title: 'Privacy Policy',
            content: <p>
                <b>Information We Collect:</b><br />
                <u>When you make a purchase, login, or contact us, we may collect the following personal information:</u> <br />
                <ul>
                    <li>• Your name</li>
                    <li>• Your email address</li>
                    <li>• Your phone number</li>
                    <li>• Your position</li>
                </ul>
                <br /> <br />
                <b>How We Use Your Information:</b><br />
                <u>To process and fulfill your orders:</u> <br />
                This includes shipping your products, sending order confirmation and tracking details, and managing returns or exchanges. <br /><br />
                <u>To communicate with you:</u> <br />
                We may use your email address or phone number to send you updates about your order, respond to inquiries, and provide customer support.
            </p>
        },
    ];
    return (
        <div className='flex flex-col md:flex-row gap-8 rounded-lg items-center w-full h-full'>
            <div className='flex flex-col rounded-lg p-6 shadow-lg border-2 h-full w-full md:w-1/3 bg-container'>
                <div className='text-3xl font-bold'>
                    Policies and About
                </div>
                <hr className='my-4 border-2 rounded-lg' />
                <div className='flex flex-col gap-2'>
                    {policies.map((policy, index) => (
                        <div
                            key={index}
                            className={`border-2 border-gray-200  p-2 rounded-md cursor-pointer ${activePolicy === index ? 'bg-primary text-white' : 'bg-zinc-100 text-primary hover:bg-primaryHover/5 hover:text-primary'}`}
                            onClick={() => setActivePolicy(index)}
                        >
                            {policy.title}
                        </div>
                    ))}
                </div>
            </div>
            <div id="prodCont" className='rounded-lg p-4 shadow-lg border-2 flex-1 bg-container overflow-auto h-full'>
                <div className='h-full'>
                    <div className='p-2'>
                        <h1 className='text-2xl font-bold'>{policies[activePolicy].title}</h1>
                    </div>
                    <div className='p-2'>
                        {policies[activePolicy].content}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Policies;