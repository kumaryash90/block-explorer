import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAddressDetails } from '../../actions/Address';
import { NetworkContext } from '../../NetworkContext';
import Footer from '../Footer/Footer';
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
                    <p className='secondary-item'>account address:&nbsp;&nbsp;&nbsp;{addressDetails.address}</p>
                    <p className='secondary-item'>account type:&nbsp;&nbsp;&nbsp;{addressDetails.type}</p>
                    <p className='secondary-item'>balance:&nbsp;&nbsp;&nbsp;{addressDetails.balance}&nbsp;eth</p>
                    <p className='secondary-item'>transaction count:&nbsp;&nbsp;&nbsp;{addressDetails.txnCount}</p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Address;