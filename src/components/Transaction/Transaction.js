import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { NetworkContext } from '../../NetworkContext';
import HeaderSecondary from '../Header/HeaderSecondary';
import { getTxnByHash } from '../../actions/Transaction';

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
            <p>this is transaction: {txnDetails.hash}</p>
            <p>Block number: {txnDetails.blockNumber}</p>
            <p>from: {txnDetails.from}</p>
            <p>to: {txnDetails.to}</p>
            <p>value: {txnDetails.value}</p>
        </>
    );
}

export default Transaction;