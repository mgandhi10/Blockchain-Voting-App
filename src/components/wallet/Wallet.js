import Web3 from 'web3';
import { useEffect } from "react";
import theVotingContractABI from './abis';

const contractAddress = "0x0888E08ddCeebcf57752d8dd7da6aE3A90F432D5";

const Wallet = ({ saveState, saveAccount, saveConnected }) => {
    useEffect(() => {
        const connectWallet = async () => {
            try {
                if (window.ethereum) {
                    window.ethereum.on("chainChanged", () => window.location.reload());
                    window.ethereum.on("accountsChanged", () => window.location.reload());
                    const web3 = new Web3(window.ethereum);
                    await window.ethereum.request({ method: 'eth_requestAccounts' });

                    const contract = new web3.eth.Contract(
                        theVotingContractABI.abi,
                        contractAddress
                    );
                    const accounts = await web3.eth.getAccounts();
                    saveAccount && saveAccount(accounts);
                    saveConnected && saveConnected(true);
                    saveState && saveState({ web: web3, contract: contract, accounts: accounts });

                } else {
                    alert("Please install MetaMask to interact with this application!");
                }
            } catch (error) {
                console.error("Error connecting to MetaMask", error);
            }
        };

        connectWallet();
    }, []); // Empty dependency array ensures it runs only once

    return (
        <>
            {/* You can add UI elements here to reflect wallet connection status */}
        </>
    )
};

export default Wallet;
