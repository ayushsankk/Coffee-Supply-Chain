var HDWalletProvider = require("truffle-hdwallet-provider");
var MNEMONIC = "ocean mango outside blush track job consider trophy cute logic ignore table";
var ENDPOINT = "https://mainnet.infura.io/v3/6d61c81aa5c84b30b0af85f58531c1cf";
var NonceTrackerSubprovider = require("web3-provider-engine/subproviders/nonce-tracker")

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      network_id: 4,
      provider: function () {
        var wallet = new HDWalletProvider(MNEMONIC, ENDPOINT);
        var nonceTracker = new NonceTrackerSubprovider();
        wallet.engine._providers.unshift(nonceTracker);
        nonceTracker.setEngine(wallet.engine);
        return wallet;
      }
    }
  },
  compilers: {
    solc: {
      version: "^0.4.25"
    }
  }
};