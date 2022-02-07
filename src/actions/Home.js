import axios from "axios"

export const getLatestTxns = async (key, count) => {
    try {
        const txns = [];
        const res = await axios.post(key, {
            jsonrpc: "2.0",
            id: 1,
            method: "eth_getBlockByNumber",
            params: [
              "latest", // block 46147
              true  // retrieve the full transaction object in transactions array
            ]
          });
        const allTxns = res.data.result.transactions;
        const latestTxns = allTxns.slice(allTxns.length - count);
        latestTxns.forEach(txn => {
            txns.push({
                hash: txn.hash,
                value: parseInt(txn.value)/(10 ** 18)
            });
        });
        return txns;
    } catch (error) {
        // console.log("some error, but key is: ", key);
        alert("something went wrong..");
    }
}

export const getLatestBlocks = async (key, count) => {
    try {
        let blockNum = null;
        const latestBlocks = [];
        for(let i = 0; i < count; i++) {
            const res = await axios.post(key, {
                jsonrpc: "2.0",
                id: 1,
                method: "eth_getBlockByNumber",
                params: [
                  blockNum || 'latest', // block 46147
                  false  // retrieve the full transaction object in transactions array
                ]
              });
            console.log(res.data.result.miner);
            latestBlocks.push({
                number: parseInt(res.data.result.number),
                miner: res.data.result.miner,
                txnCount: res.data.result.transactions.length
            });
            blockNum = '0x' + (res.data.result.number - 1).toString(16);
            console.log("blocknum: ", blockNum);
        }
        return latestBlocks;
    } catch (error) {
        // console.log("some error, but key is: ", key);
        alert("something went wrong..");
    }
}