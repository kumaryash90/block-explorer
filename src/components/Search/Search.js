import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NetworkContext } from "../../NetworkContext";

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
        <>
            <input type="text" className="search" value={input} onChange={handleInput} onKeyDown={handleKeyDown} />
            <button className="search-btn" onClick={handleSubmit}>Go</button>
        </>
    );
}

export default Search;