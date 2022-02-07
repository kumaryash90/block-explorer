import axios from "axios";

export const getBlockByNumber = async (key, blockNum) => {
    try {
        const hexNum = '0x'+(parseInt(blockNum)).toString(16);
        console.log(hexNum);
        const res = await axios.post(key, {
            jsonrpc: "2.0",
            id: 1,
            method: "eth_getBlockByNumber",
            params: [
              hexNum,
              false
            ]
          });
        const blockDetails = {
            hash: res.data.result.hash,
            blockNumber: blockNum,
            miner: res.data.result.miner,
            timestamp: res.data.result.timestamp,
            txnCount: res.data.result.transactions.length
        }
        //console.log("latest txns: ", latestTxns);
        return blockDetails;
    } catch (error) {
        // console.log("some error in block action, but key is: ", key);
        alert("something went wrong..");
    }
}