import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { NetworkContext } from '../../NetworkContext';
import HeaderPrimary from '../Header/HeaderPrimary';
import Search from '../Search/Search';
import { getLatestTxns, getLatestBlocks } from '../../actions/Home';

const Home = () => {
    const { network, key } = useContext(NetworkContext);
    const [latestTxns, setLatestTxns] = useState([]);
    const [latestBlocks, setLatestBlocks] = useState([]);

    useEffect(() => {
        console.log(key);
        const fetched = new Promise (async (resolve) => {
            const txns = await getLatestTxns(key, 5);
            const blocks = await getLatestBlocks(key, 5);
            resolve({ txns, blocks });
        });
        fetched.then(({ txns, blocks }) => {
            setLatestTxns(prev => [...txns]);
            setLatestBlocks(prev => [...blocks]);
        });
    }, [key, network]);

    return (
        <>
            <HeaderPrimary />
            <Search />
            <div>
                <h3>latest txns: </h3>
                {latestTxns.map(txn => {
                    return <p>
                            <Link to={`/${network}/tx/${txn}`} target="_blank" rel="noopener noreferrer">
                                {txn}
                            </Link></p>
                })}
            </div>

            <div>
                <h3>latest blocks: </h3>
                {latestBlocks.map(block => {
                    return  <p>
                                <Link to={`/${network}/block/${block.number}`} target="_blank" rel="noopener noreferrer">
                                    {block.number}---{block.miner}---{block.txnCount}
                                </Link>
                            </p>
                })}
            </div>
        </>
    );
}

export default Home;