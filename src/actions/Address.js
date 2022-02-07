import axios from "axios";

export const getAddressDetails = async (key, address) => {
    try {
        const balanceRes = await axios.post(key, {
            jsonrpc: "2.0",
            id: 1,
            method: "eth_getBalance",
            params: [
              address,
              "latest"
            ]
          });
          const codeRes = await axios.post(key, {
            jsonrpc: "2.0",
            id: 1,
            method: "eth_getCode",
            params: [
              address,
              "latest"
            ]
          });
          const txnRes = await axios.post(key, {
            jsonrpc: "2.0",
            id: 1,
            method: "eth_getTransactionCount",
            params: [
              address,
              "latest"
            ]
          });
        const addressDetails = {
            address: address,
            type: codeRes.data.result.length > 2 ? "Contract" : "EOA",
            balance: parseInt(balanceRes.data.result)/(10 ** 18),
            txnCount: parseInt(txnRes.data.result)
        }
        //console.log("latest txns: ", latestTxns);
        return addressDetails;
    } catch (error) {
        console.log("some error in address action, but key is: ", key);
    }
}