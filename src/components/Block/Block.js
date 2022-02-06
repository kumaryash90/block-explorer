import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlockByNumber } from '../../actions/Block';
import { NetworkContext } from '../../NetworkContext';
import HeaderSecondary from '../Header/HeaderSecondary';

const Block = () => {
    const { network, key } = useContext(NetworkContext);
    const [blockDetails, setBlockDetails] = useState({});
    const { block } = useParams();

    useEffect(() => {
        const fetched = new Promise (async (resolve) => {
            const details = await getBlockByNumber(key, block);
            resolve(details);
        });
        fetched.then(details => {
            setBlockDetails(details);
        });
    }, [key]);
    
    return (
        <>
            <HeaderSecondary />
            <div class="container">
                <p>this is block: {blockDetails.blockNumber}</p>
                <p>Block hash: {blockDetails.hash}</p>
                <p>mined by: {blockDetails.miner}</p>
                <p>timestamp: {blockDetails.timestamp}</p>
                <p>total transactions: {blockDetails.txnCount}</p>
            </div>
        </>
    );
}

export default Block;