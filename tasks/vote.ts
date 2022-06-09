import {task} from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import {getContract, getToken} from "./init";

task("vote", "Vote in voting")
    .addParam("id", "Voting ID")
    .addParam("value", "Voting value: true or false")
    .setAction(async(taskArgs, hre) => {
        let res: boolean = taskArgs.value == true;
        const voting = await getContract(hre);
        const token = await getToken(hre);
        token.approve(voting.address, await voting.getBalance());
        await voting.vote(taskArgs.id, res);
    })