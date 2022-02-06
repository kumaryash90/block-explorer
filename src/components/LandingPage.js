import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';

import { NetworkContext } from '../NetworkContext';
import Block from './Block/Block';
import Transaction from './Transaction/Transaction';
import Address from './Address/Address';
import Home from './Home/Home';

const LandingPage = () => {
    const [network, setNetwork] = useState("mainnet");
    const [key, setKey] = useState(`${process.env.REACT_APP_ALCHEMY_MAINNET}`);
    const [stateUpdated, setStateUpdated] = useState(false);
    const { net } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        new Promise(async (resolve) => {
            if(net) {
            if(net === 'mainnet') {
                console.log("here");
                setNetwork(prev => net);
                resolve(setKey(prev => `${process.env.REACT_APP_ALCHEMY_MAINNET}`));
            } else if(net === 'rinkeby') {
                console.log("here rinkeby");
                setNetwork(prev => net);
                resolve(setKey(prev => `${process.env.REACT_APP_ALCHEMY_RINKEBY}`));
            } else {
                throw new Error("error");
            }
        } else {
            navigate('/mainnet');
            window.location.reload(true);
        }
    }).then(result => setStateUpdated(true));
    }, [key]);
    
    return (
        <>
            { stateUpdated && <NetworkContext.Provider value={{ network, key, setNetwork, setKey }}>
                <Routes>
                    <Route path='/' exact element={<Home />} />
                    <Route path='/block/:block' exact element={<Block />} />
                    <Route path='/tx/:tx' exact element={<Transaction />} />
                    <Route path='/address/:address' exact element={<Address />} />
                </Routes>
            </NetworkContext.Provider> }
        </>
    );
}

export default LandingPage;