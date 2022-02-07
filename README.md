# Block Explorer
Live at https://blockexplorer.netlify.app/mainnet

use ```npm start``` to run locally

### Components
- Networks can be switched between Mainnet and Rinkeby
- Home page: displays 5 latest transactions and blocks
- Address, Transaction, and Block pages: display 4-5 attributes
- Search bar: can search with any address, transaction hash, or block number (but not block hash)
- Can directly type in URL to an address or block or tx

### What's not implemented
- haven't displayed all the properties of txns, blocks, and addresses
- auto refresh is not there
- "About" link is empty
- occassionally breaks down when RPC call fails (or maybe state doesn't change in React).. will check this
- one curious case is: miner addresses are 0x0000..000 when viewing blocks on rinkeby network..


### Home page

<img width="1142" alt="Screenshot 2022-02-07 at 6 11 19 PM" src="https://user-images.githubusercontent.com/72552910/152790207-75e8adbc-9a5a-4856-aeac-e9b37a564921.png">
