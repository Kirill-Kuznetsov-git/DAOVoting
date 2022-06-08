import { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";
import { DAOVoting, IERC20 } from "../typechain";

describe("DAOVoting", function () {
    let token: IERC20;
    let voting: DAOVoting;
    let voting1: DAOVoting;
    let signer: Signer;
    this.beforeEach(async function () {
        signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, ethers.provider);
        await ethers.provider.send("hardhat_setBalance", [  
            await signer.getAddress(), 
            "0x100000000000000000000000000000000000000"
        ]);

        token = await ethers.getContractAt("IERC20", process.env.TEST_TOKEN_ADDRESS as string);

        const votingFactory = await ethers.getContractFactory("DAOVoting", signer);
        voting = await votingFactory.deploy(await signer.getAddress(), process.env.TEST_TOKEN_ADDRESS as string, 2, 3 * 24 * 60 * 60);

        voting1 = await votingFactory.deploy(await signer.getAddress(), process.env.TEST_TOKEN_ADDRESS as string, 2, 3 * 24 * 60 * 60);

        await voting.deployed();
        await voting1.deployed();
    });

    it("addChairMan function", async function() {
        const accounts = await ethers.getSigners();
        await expect(voting.connect(accounts[1]).addChairMan(accounts[1].address)).to.be.revertedWith("not an owner");
    })

    it("setMinimumQuorum function", async function() {
        const accounts = await ethers.getSigners();
        await expect(voting.setMinimumQuorum(10)).to.be.revertedWith("not a DAO");
    })


    it("setDebatingPeriodDuration function", async function() {
        const accounts = await ethers.getSigners();
        await expect(voting.setDebatingPeriodDuration(10)).to.be.revertedWith("not a DAO");
    })


    it("addProposal function", async function() {
        const accounts = await ethers.getSigners();
        const jsonAbi = [    {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "newDebatingPeriodDuration",
                "type": "uint256"
              }
            ],
            "name": "setDebatingPeriodDuration",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }];
        const iface = new ethers.utils.Interface(jsonAbi);
        const calldata = iface.encodeFunctionData('setDebatingPeriodDuration', [60]);
        const recipient = voting.address;
        await voting.connect(signer).addProposal(calldata, recipient, "Set debating period duration to 60 seconds.");
        await expect(voting.connect(accounts[2]).addProposal(calldata, recipient, "test")).to.be.revertedWith("not a chairman");
        expect((await voting.votings(0)).recipient).to.eq(recipient);
        expect((await voting.votings(0)).callData).to.eq(calldata);
    });


});
