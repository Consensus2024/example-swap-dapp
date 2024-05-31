import { useEffect, useState } from "react";
import axios from "axios";
import swapIcon from "./assets/swap.svg";
import InputBox from "./components/InputBox";
import ThemeToggle from "./components/ThemeToggle";
import TxTable from "./components/TxTable";
import useNetworkInfo from "./hooks/useNetworkInfo";
import useTransactions from "./hooks/useTransactions";
// import { createSwap } from "./services/tx";
// import { Tx } from "./types";
//import * as PayShare from '../PayShare/index.js'


const NETWORK_FEE = 1;
const SERVICE_FEE_PERCENTAGE = 0.2;

function App() {
  const [amount, setAmount] = useState(1);
  const [fromToken, setFromToken] = useState("USDC (Ethereum Sepolia)");
  const [toToken, setToToken] = useState("USDC (Stellar Testnet)");
  const [txFee, setTxFee] = useState(0);
  const [swapped, setSwapped] = useState(true);
  const [toAddress, setToAddress] = useState("");
  const [charitySelected, setCharitySelected] = useState(false);
  const [selectedCharity, setSelectedCharity] = useState("");
  const [charities, setCharities] = useState([]);
  const { transactions, handleCreateTransaction } = useTransactions();
  const networkInfo = useNetworkInfo();
  //const { chain, address, roundUp } = PayShare;// custom NPM module 
  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const response = await axios.get("http://localhost:3001/charities");
        setCharities(response.data);
      } catch (error) {
        console.error("Error fetching charities:", error);
      }
    };

    fetchCharities();
  }, []);

  useEffect(() => {
    if (networkInfo.status === "live") {
      const id =
        toToken === "USDC (Ethereum Sepolia)" ? "USDC.ETH" : "USDC.STELLAR";
      const token = networkInfo.tokens.find((token) => token["id"] === id);
      const fee = token ? token["txFee"] : 0;
      setTxFee(fee);
    }
  }, [networkInfo, toToken]);

  const toggleCharity = () => {
    setCharitySelected(!charitySelected);
  };

  const selectCharity = (charity) => {
    setSelectedCharity(charity);
  };

  const swap = () => {
    setSwapped(!swapped);
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

 const handleRoundUp = async () => {
    const params = {
      chain: setFromToken,
      address: selectedCharity
    };
    const response = await axios.post("http://localhost:3001/swap", params);
   // now you would return the response to the caller like so :
    return response;
  
};
  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="min-h-screen min-w-96 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="absolute right-2 top-2">
            <ThemeToggle />
          </div>

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={async (e) => {
                  e.preventDefault();
                 
                      await handleRoundUp(
                        
                      ) 
                    &&
                    await handleCreateTransaction(
                      fromToken,
                      amount,
                      toToken,
                      toAddress,
                      
                    )
                 }
                
                }
              >
                <div>
                  <InputBox
                    label="You Send"
                    amount={amount}
                    selectCurrency={fromToken}
                    onAmountChange={(amount) => setAmount(amount)}
                  />
                </div>

                <div className="relative leading-none">
                  <div className="border-2 ml-auto -top-4 justify-self-end absolute right-0 border-grey-100 rounded-full bg-white text-white px-2 py-2 leading-none dark:bg-gray-700 dark:border-gray-800">
                    <button
                      type="button"
                      className={`${
                        swapped ? "" : "rotate-180"
                      } transition-all`}
                      onClick={swap}
                    >
                      <img
                        src={swapIcon}
                        className="dark:invert"
                        height="14"
                        width="14"
                      />
                    </button>
                  </div>
                </div>
                <div>
                  <InputBox
                    label="You Receive"
                    amount={amount * 0.999 - txFee}
                    selectCurrency={toToken}
                    amountDisable
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Receiving Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder={
                      toToken == "USDC (Stellar Testnet)"
                        ? "Stellar Address"
                        : "Ethereum Address"
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={(e) => setToAddress(e.target.value)}
                  />
                </div>
                <div className="flex justify-between mb-2">
                  <div className="text-neutral-400 text-sm">Fee Details</div>
                  <div className="text-neutral-400 text-sm">
                    Network: {txFee.toFixed(2)} | Service:
                    {charitySelected
                      ? Math.ceil(amount * SERVICE_FEE_PERCENTAGE).toFixed(2)
                      : (amount * SERVICE_FEE_PERCENTAGE).toFixed(2)}{" "}
                    | Total: {(txFee + amount).toFixed(2)}
                  </div>
                </div>
                <div className="flex items-center">
                  <label htmlFor="charity">
                    <input
                      type="checkbox"
                      id="charity"
                      name="charity"
                      value="charity"
                      checked={charitySelected}
                      onChange={toggleCharity}
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Round up fees and donate them to charity?
                    </span>
                  </label>

                  {charitySelected && (
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={selectedCharity}
                      onChange={(e) => selectCharity(e.target.value)}
                    >
                      <option value="">Select a charity</option>
                      {charities.map((charity) => (
                        <option key={charity.address} value={charity.name}>
                          {charity.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-slate-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {toToken == "USDC (Stellar Testnet)"
                    ? "Connect Ethereum Wallet"
                    : "Connect Stellar Wallet"}
                </button>
              </form>
            </div>
          </div>

          <div className="transactions-list mt-8">
            <TxTable transactions={transactions} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

