import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { NetworkContext } from '../../NetworkContext';
import HeaderSecondary from '../Header/HeaderSecondary';
import { getTxnByHash } from '../../actions/Transaction';
import Search from '../Search/Search';
import "./Transaction.css";
import Footer from '../Footer/Footer';

const Transaction = () => {
    const { network, key } = useContext(NetworkContext);
    const [txnDetails, setTxnDetails] = useState({});
    const { tx } = useParams();

    useEffect(() => {
        const fetched = new Promise (async (resolve) => {
            const details = await getTxnByHash(key, tx);
            resolve(details);
        });
        fetched.then(details => {
            setTxnDetails(prev => details);
        });
    }, [key]);
    return (
        <>
            <HeaderSecondary />
            <div class="container main-secondary">
                <Search />
                <div class="main-secondary-content">
                    <p className='secondary-item'>transaction hash:&nbsp;&nbsp;&nbsp;{txnDetails.hash}</p>
                    <p className='secondary-item'>
                        block number:&nbsp;&nbsp;&nbsp;
                        <Link to={`/${network}/block/${txnDetails.blockNumber}`} target="_blank" rel="noopener noreferrer">
                            {txnDetails.blockNumber}
                        </Link> 
                    </p>
                    <p className='secondary-item'>from:&nbsp;&nbsp;&nbsp;
                        <Link to={`/${network}/address/${txnDetails.from}`} target="_blank" rel="noopener noreferrer">
                            {txnDetails.from}
                        </Link> 
                    </p>
                    <p className='secondary-item'>to:&nbsp;&nbsp;&nbsp;
                        <Link to={`/${network}/address/${txnDetails.to}`} target="_blank" rel="noopener noreferrer">
                            {txnDetails.to}
                        </Link> 
                    </p>
                    <p className='secondary-item'>value: {txnDetails.value}</p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Transaction;