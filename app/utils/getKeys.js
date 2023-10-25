const ethers = require('ethers');
module.exports.getKey = (req, res,pri) => {
     
    const wallet = ethers.Wallet.createRandom();
    const pr = wallet.privateKey;
    const publicKey = wallet.signingKey.publicKey;
    if (pri) {
        return { publicKey };
    }
    else {
        return { publicKey, pr };
    }
}

