const theVotingContract = artifacts.require("theVotingContract");


module.exports = function (deployer) {
    deployer.deploy(theVotingContract).then(() => { console.log('Contract deployed at address:', theVotingContract.address); });
};
