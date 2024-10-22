import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { contractAddress, abi } from '../util/constants';

const Fund = () => {
  const [buttonText, setButtonText] = useState('Connect MetaMask');
  const [value, setValue] = useState('');

  const connect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setButtonText('Connected');
      } catch (err) {
        if (err.code === 4001) {
          setButtonText('Please connect your MetaMask');
        } else {
          setButtonText('Connecting');
        }
      }
    } else {
      setButtonText('Install MetaMask!');
    }
  };

  const handleClick = async () => {
    console.log(`Funding... ${value}`);
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        const transaction = await contract.fund({
          value: ethers.parseEther(value.toString()),
        });
        const receipt = await transaction.wait();
        console.log(`Transaction successful: ${receipt}`);
      } catch (err) {
        console.log(`Something went wrong: ${err.message}`);
      }
    } else {
      console.log(`Please connect your MetaMask wallet`);
    }
  };

  useEffect(() => {
    connect();
  }, []);

  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col justify-center items-center"
      style={{ backgroundImage: `url('/background.png')` }}
    >
      <div className="relative flex justify-center items-center">
        <img src="/logo.png" alt="Logo" className="mb-6 w-40 h-40 z-10 relative" />
        <div className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-[#FF8C00] to-[#c46f07] opacity-45 animate-spin blur-md"></div>
      </div>

      <form className="bg-white p-4 rounded-lg mt-4 shadow-md">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Amount In Eth"
            value={value} // Bind the input value to state
            onChange={(e) => setValue(e.target.value)} // Update state on input change
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
          />
        </div>
        <div>
          <button
            type="button"
            onClick={handleClick} // Add onClick handler
            className="w-full bg-[#FF8C00] text-white py-2 rounded-md hover:bg-[#c46f07]"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Fund;
