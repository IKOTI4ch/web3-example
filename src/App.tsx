import React, {useCallback} from 'react';
import Web3 from "web3";
import Web3Modal from 'web3modal'
import WalletConnectProvider from "@walletconnect/web3-provider";

function App () {
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider, // required
            options: {
                infuraId: '9aa3d95b3bc440fa88ea12eaa4456161', // required
            },
        },

    };

    const web3Modal = new Web3Modal({
        network: 'mainnet', // optional
        cacheProvider: true, // optional
        providerOptions, // required
    });

    const onConnectWallet = useCallback(async () => {
        try {
            const provider = await web3Modal.connect();
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <div>
            <button onClick={onConnectWallet}>Click</button>
        </div>
    );
};

export default App;
