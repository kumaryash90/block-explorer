import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NetworkContext } from "../../NetworkContext";
import './NavItems.css';

const NavItems = () => {
    const { network, key, setNetwork, setKey } = useContext(NetworkContext);
    const navigate = useNavigate();

    const handleLinkClick = (route) => {
        navigate(route);
        window.location.reload(true);
    }

    return (
        <>
            <ul className="nav-items">
                <li>
                    <Link to={`/${network}`} onClick={() => handleLinkClick(`/${network}`)} className="links">Home</Link>
                </li>
                <li>
                    <Link to={`/${network}`} className="links">About</Link>
                </li>
                <li>
                    <div className="dropdown">
                        <a href="" className="links dropdown-btn">Network</a>
                        <div className="dropdown-list">
                            <Link to={`/mainnet`} onClick={() => handleLinkClick(`/mainnet`)} className="links-hidden">Mainnet</Link>
                            <Link to={`/rinkeby`} onClick={() => handleLinkClick(`/rinkeby`)} className="links-hidden">Rinkeby</Link>
                        </div>
                    </div>
                </li>
            </ul>
        </>
    );
}

export default NavItems;