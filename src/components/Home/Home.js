import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { NetworkContext } from '../../NetworkContext';
import HeaderPrimary from '../Header/HeaderPrimary';
import Search from '../Search/Search';
import { getLatestTxns, getLatestBlocks } from '../../actions/Home';
import "./Home.css";
import Footer from '../Footer/Footer';

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
            <div className="container main-home">
                <Search />
                <div className="main-home-txns">
                    <h3>latest txns: </h3>
                    {latestTxns.map(txn => {
                        return <p className='txns-para'>
                                Transaction Hash:&nbsp;
                                <Link to={`/${network}/tx/${txn.hash}`} target="_blank" rel="noopener noreferrer">
                                    {txn.hash.substr(0,30)}...
                                </Link>
                                &nbsp;&nbsp;
                                <span>
                                    Value: {txn.value}&nbsp;eth
                                </span>
                                </p>
                    })}
                </div>

                <div className='main-home-blocks'>
                    <h3>latest blocks: </h3>
                    {latestBlocks.map(block => {
                        return  <p className='blocks-para'>
                                    <span>
                                    Block Number:&nbsp;
                                        <Link to={`/${network}/block/${block.number}`} target="_blank" rel="noopener noreferrer">
                                            {block.number}&nbsp;
                                        </Link>
                                         &nbsp;&nbsp;&nbsp;
                                    </span>
                                    <span>
                                        Mined By:&nbsp;
                                        <Link to={`/${network}/address/${block.miner}`} target="_blank" rel="noopener noreferrer">
                                            {block.miner.substr(0, 12)}...&nbsp;
                                        </Link>
                                        &nbsp;&nbsp;&nbsp;
                                    </span> 
                                    <span>
                                        Txn Count:&nbsp; {block.txnCount}
                                    </span>
                                </p>
                    })}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;