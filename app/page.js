"use client";

import { Provider } from 'react-redux';
import store from './redux/store';
import Sidebar from './components/Sidebar';
import MenuTree from './components/MenuTree';
import MenuForm from './components/MenuForm';
import { useState } from 'react';

export default function Home() {
  const [selectedMenuItem, setSelectedMenuItem] = useState({
    name: '',
    description: '',
    price: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleMenuItemClick = (itemData) => {
    // Set the selected item data to the state
    setSelectedMenuItem(itemData);
  };
  return (
    <Provider store={store}>
      <div className="flex main-cntn">
        {/* Left: Sidebar */}
        <Sidebar />
        
        {/* Right: Main Content */}
        <main className="flex-1 flex gap-8 p-8 bg-white">
          {/* Left: Menu Hierarchy (taking 50% of remaining width) */}
          <div className="w-1/2">
            <MenuTree onMenuItemClick={handleMenuItemClick} isSuccess = {isSuccess}/>
          </div>

          {/* Right: Menu Form (vertically centered, taking 50% of remaining width) */}
          <div className="w-1/2 flex items-center justify-center">
            <MenuForm menuItem={selectedMenuItem} isSuccess={setIsSuccess}/>
          </div>
        </main>
      </div>
    </Provider>
  );
}
