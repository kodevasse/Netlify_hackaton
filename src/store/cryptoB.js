import { ethers } from "ethers";
import { ref } from "vue";
import contractABI from "../artifacts/contracts/WavePortal.sol/WavePortal.json";
const contractAddress = "0x11c448B14131d3cAeD675a189261724a44cBe385";

export const useCryptoStore = () => {
  const account = ref(null);
  const loading = ref(false);
  const accountCount = ref(null);
  const accountBalance = ref(null);
  const accountBlock = ref(null);

  //   async function getBalance() {
  //     setLoader(true);
  //     try {
  //       const { ethereum } = window;
  //       if (ethereum) {
  //         const provider = new ethers.providers.Web3Provider(ethereum);
  //         const signer = provider.getSigner();
  //         const wavePortalContract = new ethers.Contract(
  //           contractAddress,
  //           contractABI.abi,
  //           signer
  //         );
  //         const count = await wavePortalContract.getBalance();
  //         const amt = ethers.utils.formatEther(count);
  //         console.log("count", amt);
  //         setLoader(false);
  //       }
  //     } catch (e) {
  //       setLoader(false);
  //     }
  //   }
  async function getBalance() {
    setLoader(true);
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI.abi,
          signer
        );

        // const count = await wavePortalContract.getBalance();
        // const amt = ethers.utils.formatEther(count);
        // console.log("count", amt);
        setLoader(false);
      }
    } catch (e) {
      setLoader(false);
    }
  }
  async function getBalanceInfo() {
    setLoader(true);
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const data = await provider.getTransactionCount(account.value);

        accountCount.value = data;
        let currentBlock = await provider.getBlockNumber();

        accountBlock.value = currentBlock;

        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  }
  async function connectWallet() {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Must connect to MetaMask!");
        return;
      }
      const myAccounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected: ", myAccounts[0]);
      account.value = myAccounts[0];
      await getBalance();
      await getBalanceInfo();
    } catch (error) {
      console.log(error);
    }
  }
  //   async function connectWalletStart() {
  //     try {
  //       const { ethereum } = window;
  //       if (!ethereum) {
  //         alert("Must connect to MetaMask!");
  //         return;
  //       }
  //       const myAccounts = await ethereum.request({
  //         method: "eth_requestAccounts",
  //       });

  //       console.log("Connected: ", myAccounts[0]);
  //       account.value = myAccounts[0];
  //       await getBalance();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  function setLoader(value) {
    console.log("setloader");
    loading.value = value;
  }

  return {
    setLoader,
    loading,
    connectWallet,
    account,
    accountCount,
    accountBlock,
  };
};
