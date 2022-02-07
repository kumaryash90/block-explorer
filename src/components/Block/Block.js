import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlockByNumber } from '../../actions/Block';
import { NetworkContext } from '../../NetworkContext';
import Footer from '../Footer/Footer';
import HeaderSecondary from '../Header/HeaderSecondary';
import Search from '../Search/Search';
import "./Block.css"

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
            <div class="container main-secondary">
                <Search />
                <div class="main-secondary-content">
                    <p className='secondary-item'>block number:&nbsp;&nbsp;&nbsp;{blockDetails.blockNumber}</p>
                    <p className='secondary-item'>block hash:&nbsp;&nbsp;&nbsp;{blockDetails.hash}</p>
                    <p className='secondary-item'>mined by:&nbsp;&nbsp;&nbsp;
                        <Link to={`/${network}/address/${blockDetails.miner}`} target="_blank" rel="noopener noreferrer">{blockDetails.miner}</Link>
                    </p>
                    <p className='secondary-item'>timestamp:&nbsp;&nbsp;&nbsp;{blockDetails.timestamp}</p>
                    <p className='secondary-item'>total transactions:&nbsp;&nbsp;&nbsp;{blockDetails.txnCount}</p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Block;