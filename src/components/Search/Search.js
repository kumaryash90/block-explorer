import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NetworkContext } from "../../NetworkContext";
import "./Search.css";

const Search = () => {
    const { network, key } = useContext(NetworkContext);
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const submit = () => {
        if(input.length === 66) {
            navigate(`/${network}/tx/${input}`, { replace: true });
            window.location.reload(true);
        } else if(input.length === 42) {
            navigate(`/${network}/address/${input}`, { replace: true });
            window.location.reload(true);
        } else if(parseInt(input)) {
            navigate(`/${network}/block/${input}`, { replace: true });
            window.location.reload(true);
        } else {
            alert("invalid input");
        }
        console.log(input);
        setInput("");
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            submit();
        }
    }

    const handleSubmit = (e) => {
        submit();
    }

    const handleInput = (e) => {
        setInput(e.target.value);
    }

    return (
        <div className="search-div">
            <input type="text" 
                    className="search-bar" 
                    value={input} 
                    onChange={handleInput} 
                    onKeyDown={handleKeyDown} 
                    placeholder="Search by Address / Txn Hash / Block" />
            <button className="search-btn" onClick={handleSubmit}>Go</button>
        </div>
    );
}

export default Search;