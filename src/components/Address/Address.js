import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAddressDetails } from '../../actions/Address';
import { NetworkContext } from '../../NetworkContext';
import HeaderSecondary from '../Header/HeaderSecondary';
import Search from '../Search/Search';
import "./Address.css"

const Address = () => {
    const { network, setNetwork, key, setKey } = useContext(NetworkContext);
    const [addressDetails, setAddressDetails] = useState({});
    const { address } = useParams();

    useEffect(() => {
        const fetched = new Promise (async (resolve) => {
            const details = await getAddressDetails(key, address);
            resolve(details);
        });
        fetched.then(details => {
            setAddressDetails(details);
        });
    }, [key]);
    return (
        <>
            <HeaderSecondary />
            <div class="container main-secondary">
                <Search />
                <div class="main-secondary-content">
                    <p>type: {addressDetails.type}</p>
                    <p>balance: {addressDetails.balance}</p>
                    <p>transaction count: {addressDetails.txnCount}</p>
                </div>
            </div>
        </>
    );
}

export default Address;