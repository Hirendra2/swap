const TronWeb = require("tronweb");
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");
const RPC = "https://api.trongrid.io";

const addressInHexFormat = "4448eC1b893fdcB652E435E16dE5f9f7561d0af5";
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, addressInHexFormat);

const addressInBase58 = tronWeb.address.fromHex(addressInHexFormat);
console.log("H",addressInBase58);
const addressInHex = tronWeb.address.toHex("TGCGJqHgaRwuXKYvTS7RKUKrtq5hsqncWK");
console.log("S",addressInHex)