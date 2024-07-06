import { useState } from 'react';
import { faCartShopping, faBagShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import CartTab from './Tabs/CartTab';
import Button from './Button';
import AccountTab from './Tabs/AccountTab';

const HomeTabs = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { id: 0, title: 'Cart', icon: faCartShopping, component: <CartTab /> },
        { id: 1, title: 'Orders', icon: faBagShopping, component: <CartTab /> },
        { id: 2, title: 'Account', icon: faUser, component: <AccountTab /> },
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-start items-center gap-2 py-4">
                {tabs.map((tab, index) => (
                    <Button
                        key={index}
                        icon={tab.icon}
                        text={tab.title}
                        isActive={activeTab === index}
                        onClick={() => setActiveTab(index)}
                    />
                ))}
            </div>
            <div className="flex-1 overflow-auto">
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={`h-full transition-opacity duration-300 ${activeTab === index ? 'opacity-100' : 'opacity-0 hidden'}`}
                    >
                        {tab.component}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeTabs;
