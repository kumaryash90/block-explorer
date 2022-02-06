import React, { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
//import { NetworkContext } from './NetworkContext';

const App = () => {
    
    return (
        <BrowserRouter>
            <Routes>
                {/* <NetworkContext.Provider value={{ networkValue: [network, setNetwork], keysValue: [key, setKey] }}> */}
                    <Route path='/' exact element={<LandingPage />} />
                    <Route path='/:net/*' exact element={<LandingPage />} />
                {/* </NetworkContext.Provider> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;