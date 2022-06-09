import {task} from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import {getContract, getToken, getSigner} from "./init";

task("deposit", "To deposit tokens")
    .addParam("funds", "Number of tokens")
    .setAction(async(taskArgs, hre) => {
        const signer = await getSigner(hre);
        const voting = await getContract(hre);
        const token = await getToken(hre);
        await token.connect(signer).approve(voting.address, taskArgs.funds);
        await voting.deposit(taskArgs.funds);
    })