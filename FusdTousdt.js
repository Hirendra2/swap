var ethers = require("ethers");
var url = "https://fufi.finance/rpc";
require("dotenv").config();
const fs = require("fs");
const axios = require("axios");
var Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || url);
const abi = fs.readFileSync("./abis/abi_Fusd.json", "utf-8");
const abi1 = fs.readFileSync("./abis/approve.json", "utf-8");

const TronWeb = require("tronweb");
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");
const RPC = "https://api.trongrid.io";

const approves = async (req, res, next) => {
  var myAddress = req.body.myAddress;
  var privateKey = req.body.privateKey;
  var amount = req.body.amount;
  var entryadd = process.env.SWAP_CONTRACT_ADDRESS;

  console.log(`web3 version: ${web3.version}`);
  var count = web3.eth.getTransactionCount(myAddress);
  console.log(`num transactions so far: ${count}`);

  const abiArray = JSON.parse(abi1);
  var contract = new web3.eth.Contract(
    abiArray,
    process.env.TOKEN_CONTRACT_ADDRESS,
    { from: myAddress }
  );

  var chainID = await web3.eth.net.getId();
  console.log(`ChainID: ${chainID}\n------------------------`);
  var amounts = web3.utils.toWei(amount, "ether");

  var gasPrices = await getCurrentGasPrices();
  var gasPriceGwei = gasPrices.low;
  console.log("gasPriceGwei", gasPriceGwei);
  var gasLimit = 800000;
  console.log("gasLimit", gasLimit);

  var rawTransaction = {
    from: myAddress,
    gasPrice: web3.utils.toHex(gasPriceGwei * 1e9),
    gasLimit: web3.utils.toHex(gasLimit),
    to: process.env.TOKEN_CONTRACT_ADDRESS,
    value: "0x0",
    data: contract.methods.approve(entryadd, amounts).encodeABI(),
    chainId: chainID,
  };
  console.log(
    `Raw of Transaction: \n${JSON.stringify(
      rawTransaction,
      null,
      "\t"
    )}\n------------------------`
  );

  const signPromise = web3.eth.accounts.signTransaction(
    rawTransaction,
    privateKey
  );

  signPromise
    .then((signedTx) => {
      const sentTx = web3.eth.sendSignedTransaction(
        signedTx.raw || signedTx.rawTransaction
      );
      sentTx.on("receipt", (receipt) => {
        console.log("https://fufiscan.com/tx/" + receipt.transactionHash);

        res.status(201).send({ status: true, msg: receipt.transactionHash });
      });
      sentTx.on("error", (err) => {
        console.log(err);
        res.status(404).send({ status: false, msg: "Failed" });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const FusdToUsdts = async (req, res, next) => {
  var myAddress = req.body.myAddress;
  var privateKey = req.body.privateKey;
  var amount = req.body.amount;
  var lock = 2;

  str = privateKey.substring(2);
  const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, str);
  const Trxaddress = tronWeb.address.fromPrivateKey(str);
  console.log(Trxaddress);

  const abiArray = JSON.parse(abi);
  var contract = new web3.eth.Contract(
    abiArray,
    process.env.SWAP_CONTRACT_ADDRESS,
    { from: myAddress }
  );

  var chainID = await web3.eth.net.getId();
  console.log(`ChainID: ${chainID}\n------------------------`);
  var amount = amount - 1;
  var amounts = web3.utils.toWei(amount.toString(), "ether");

  var gasPriceGwei = 10;
  console.log("gasPriceGwei", gasPriceGwei);
  var gasLimit = 800000;
  console.log("gasLimit", gasLimit);

  var rawTransaction = {
    from: myAddress,
    gasPrice: web3.utils.toHex(gasPriceGwei * 1e9),
    gasLimit: web3.utils.toHex(gasLimit),
    to: process.env.SWAP_CONTRACT_ADDRESS,
    value: "0x0",
    data: contract.methods
      .FusdToUsdts(myAddress, Trxaddress, amounts, lock)
      .encodeABI(),
    chainId: chainID,
  };
  console.log(
    `Raw of Transaction: \n${JSON.stringify(
      rawTransaction,
      null,
      "\t"
    )}\n------------------------`
  );

  const signPromise = web3.eth.accounts.signTransaction(
    rawTransaction,
    privateKey
  );

  signPromise
    .then((signedTx) => {
      const sentTx = web3.eth.sendSignedTransaction(
        signedTx.raw || signedTx.rawTransaction
      );
      sentTx.on("receipt", (receipt) => {
        console.log("https://fufiscan.com/tx/" + receipt.transactionHash);

        res.status(201).send({ status: true, msg: receipt.transactionHash });
      });
      sentTx.on("error", (err) => {
        console.log(err);
        res.status(404).send({ status: false, msg: "Failed" });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const claimUsdt = async (req, res, next) => {
  var myAddress = req.body.myAddress;
  var privateKey = req.body.privateKey;
  var amount = req.body.amount;

  const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
  str = privateKey.substring(2);
  console.log("ggggggggggggggggg",str)
  const trxaddress = tronWeb.address.fromPrivateKey(str);
  console.log(trxaddress);
  let ACCOUNT = "TZH8Z2zrr9q1sNtkrDKspfjRz33N3KETK2";
  owner = await contract.methods.balanceOf(ACCOUNT).call();
  console.log("balance1452", owner.toString());
  if (amount >= owner) {
    const abiArray = JSON.parse(abi);
    var contract = new web3.eth.Contract(
      abiArray,
      process.env.SWAP_CONTRACT_ADDRESS,
      { from: myAddress }
    );
    var amount = web3.utils.fromWei(amount, "ether");
    var chainID = await web3.eth.net.getId();
    console.log(`ChainID: ${chainID}\n------------------------`);
    var gasPriceGwei = 10;
    console.log("gasPriceGwei", gasPriceGwei);
    var gasLimit = 800000;
    console.log("gasLimit", gasLimit);

    var rawTransaction = {
      from: myAddress,
      gasPrice: web3.utils.toHex(gasPriceGwei * 1e9),
      gasLimit: web3.utils.toHex(gasLimit),
      to: process.env.SWAP_CONTRACT_ADDRESS,
      value: "0x0",
      data: contract.methods.claimusdt(trxaddress).encodeABI(),
      chainId: chainID,
    };
    console.log(
      `Raw of Transaction: \n${JSON.stringify(
        rawTransaction,
        null,
        "\t"
      )}\n------------------------`
    );

    const signPromise = web3.eth.accounts.signTransaction(
      rawTransaction,
      privateKey
    );

    signPromise
      .then((signedTx) => {
        const sentTx = web3.eth.sendSignedTransaction(
          signedTx.raw || signedTx.rawTransaction
        );
        sentTx.on("receipt", async (receipt) => {
          console.log("https://fufiscan.com/tx/" + receipt.transactionHash);
          const transfarTRC20Balance = async (trxaddress, amount) => {
            return new Promise(async (resolve, reject) => {
              const CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
              let privateKeys =
                "d651722a2bec01c514d4852cf5c2e050d40d8ffc367cb43d9fce63dac6d180ea";
              const tronWeb = new TronWeb(
                fullNode,
                solidityNode,
                eventServer,
                privateKeys
              );
              let am = tronWeb.toSun(amount);
              amount = Math.trunc(am);
              async function main() {
                const { abi } = await tronWeb.trx.getContract(CONTRACT);
                const contract = tronWeb.contract(abi.entrys, CONTRACT);
                const res = await contract.methods
                  .transfer(trxaddress, parseFloat(amount))
                  .send();
                return res;
              }
              main()
                .then(async (res) => {
                  console.log("############", res);
                  return resolve("ssss")
                })
                .catch((err) => {
                  console.log("error:", err);
                  return reject("Failed");
                });
            });
          };
          transfarTRC20Balance(trxaddress, amount);
        });
        sentTx.on("error", (err) => {
          console.log(err);
          res.status(404).send({ status: false, msg: "Failed" });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const getUsdtamt = async (req, res, next) => {
  var myAddress = req.body.myAddress;
  const abiArray = JSON.parse(abi);
  var contract = new web3.eth.Contract(
    abiArray,
    process.env.SWAP_CONTRACT_ADDRESS
  );
  var getUsdtamts = await contract.methods.UserUsdt(myAddress).call();
  console.log(getUsdtamts);
  res.status(200).send({ status: true, data: getUsdtamts });
};

const Usdtbalance = async (req, res, next) => {
  var privateKey = req.body.privateKey;
  const CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
  privateKey = privateKey.substring(2);

  const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
  const { abi } = await tronWeb.trx.getContract(CONTRACT);
  const contract = tronWeb.contract(abi.entrys, CONTRACT);
  const ACCOUNT = tronWeb.address.fromPrivateKey(privateKey);
  console.log("hhhhhhhhhhh", ACCOUNT);
  balance = await contract.methods.balanceOf(ACCOUNT).call();
  console.log("balance1452", balance.toString());
  res.status(200).send({ status: true, data: balance.toString() });
};

const sendusdt = async (req, res, next) => {
  var privateKey = req.body.privateKey;
  var Receive = req.body.Receive;
  var amount = req.body.amount;

  privateKey = privateKey.substring(2);
  return new Promise(async (resolve, reject) => {
    const CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
    const tronWeb = new TronWeb(
      fullNode,
      solidityNode,
      eventServer,
      privateKey
    );

    let am = tronWeb.toSun(amount);
    amount = Math.trunc(am);
    amount = amount-1000000; 
    async function main() {
      const { abi } = await tronWeb.trx.getContract(CONTRACT);
      const contract = tronWeb.contract(abi.entrys, CONTRACT);
       const ACCOUNT = tronWeb.address.fromPrivateKey(privateKey);
      const balance = await contract.methods.balanceOf(ACCOUNT).call();
      console.log("balance1452", balance.toString());
      const resp = await contract.methods
        .transfer(Receive, parseFloat(amount))
        .send();
      // return resp;
      res.status(201).send({ status: true });
    }
    main()
      .then(async (res) => {
        console.log("############", res);

        return resolve("Failed");
      })
      .catch((err) => {
        console.log("error:", err);
        return reject("Failed");
      });
  });
};

async function getCurrentGasPrices() {
  let response = await axios.get(
    "https://ethgasstation.info/json/ethgasAPI.json"
  );
  let prices = {
    low: response.data.safeLow / 10,
    medium: response.data.average / 10,
    high: response.data.fast / 10,
  };
  return prices;
}

module.exports = {
  FusdToUsdts,
  claimUsdt,
  getUsdtamt,
  Usdtbalance,
  approves,
  sendusdt
};
