import axios from "axios";

export const getTxnByHash = async (key, hash) => {
    try {
        console.log("received key in tx: ", key);
        const res = await axios.post(key, {
            jsonrpc: "2.0",
            id: 1,
            method: "eth_getTransactionByHash",
            params: [
              hash
            ]
          });
        const txnDetails = {
            hash: hash,
            blockNumber: parseInt(res.data.result.blockNumber),
            from: res.data.result.from,
            to: res.data.result.to,
            value: parseInt(res.data.result.value)/(10 ** 18)
        }
        //console.log("latest txns: ", latestTxns);
        return txnDetails;
    } catch (error) {
        console.log("some error in txn action, but key is: ", key);
    }
}