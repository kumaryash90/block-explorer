import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NetworkContext } from "../../NetworkContext";
import NavItems from "../Navbar/NavItems";
import "./Header.css";

const HeaderPrimary = () => {
    const { network, key } = useContext(NetworkContext);
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate(`/${network}`);
        window.location.reload(true);
    }

    return (
        <header className="header">
            <div className="container">
                <div className="navbar">
                    <div className="logo">
                        <h2 onClick={handleLogoClick}>Block Explorer</h2>
                    </div>
                    <div className="nav">
                        <NavItems />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderPrimary;