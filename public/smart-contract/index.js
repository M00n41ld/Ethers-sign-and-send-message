const ethers = require('ethers')

const contract = require('./abi.json')
console.log('TEST')
// console.log(contract.abi)
// console.log(JSON.stringify(contract.abi));
CONTRACT_ADDRESS = '0xA4c339a268ee056D4Aa5adF1EBEa18A2f2F97869';
signer = '0x1B12784e8D035a36cA8f31e86B7143b190f37A70';
const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);
console.log(helloWorldContract)