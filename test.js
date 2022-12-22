const TronWeb = require("tronweb");
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");
const RPC = "https://api.trongrid.io";

const private = "0xA58BC93D7Aa3CA0922b194833931347bC5E97C0F";
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, private);

const addressInBase58 = tronWeb.address.fromHex(private);
console.log("H",addressInBase58);
const addressInHex = tronWeb.address.toHex("0xA58BC93D7Aa3CA0922b194833931347bC5E97C0F");
console.log("S",addressInHex)

