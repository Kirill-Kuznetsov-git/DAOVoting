import {task} from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import {getContract, getToken, getSigner} from "./init";

task("vote", "Vote in voting")
    .addParam("id", "Voting ID")
    .addParam("value", "Voting value: true or false")
    .setAction(async(taskArgs, hre) => {
        let res: boolean = taskArgs.value == true;
        const signer = await getSigner(hre);
        const voting = await getContract(hre);
        const token = await getToken(hre);
        await voting.connect(signer).vote(taskArgs.id, res);
    })