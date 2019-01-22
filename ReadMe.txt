geth --datadir ~/.ethereum_private/MOJ/ --nodiscover --networkid 1234 --maxpeers 4 --rpc --rpcapi "db,eth,net,web3,personal,admin,miner,txpool" --rpcport "8545" --rpccorsdomain "*" -verbosity 6 --ipcpath geth-demo.ipc --port 30301 console 2>> 01.log console


