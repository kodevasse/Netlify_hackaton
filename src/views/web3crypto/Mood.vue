<script setup>
import { ref } from "vue";
import { ethers } from "ethers";
import { tester, looper } from "../../store/crypto.js";
const mood = ref();

window.ethereum.enable();
var provider = new ethers.providers.Web3Provider(
  web3.currentProvider,
  "ropsten"
);
var MoodContractAddress = "0xae2cde4e094ceb39292b895c7f9354b10cbf85fc";
var MoodContractABI = [
  {
    inputs: [],
    name: "getMood",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_mood",
        type: "string",
      },
    ],
    name: "setMood",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
var MoodContract;
var signer;
provider.listAccounts().then(function (accounts) {
  signer = provider.getSigner(accounts[0]);
  MoodContract = new ethers.Contract(
    MoodContractAddress,
    MoodContractABI,
    signer
  );
});
const getMood = async () => {
  var getMoodPromise = MoodContract.getMood();
  mood.value = await getMoodPromise;
  console.log(mood.value, "the mood");
};

const setMood = async () => {
  var setMoodPromise = MoodContract.setMood(mood.value);
  await setMoodPromise;
  console.log(mood.value);
};
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-2xl font-bold">dApp for ditt humør</h1>
    <p>Her kan du sette eller lese dagens humør</p>
    <div class="flex flex-col items-center justify-center gap-y-2">
      <label for="mood">Dagens humør:</label>
      <input
        v-model="mood"
        class="input input-accent w-full text-pink-400"
        type="text"
        id="mood"
      />

      <div>
        <button class="btn btn-warning" @click="setMood">set Mood</button>
      </div>
      <div>
        <button class="btn btn-accent" @click="getMood">get Mood</button>
      </div>
      <div>
        <button class="btn btn-accent" @click="looper">looper</button>
      </div>
    </div>
  </div>
</template>
