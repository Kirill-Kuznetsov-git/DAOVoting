import {task} from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import {getContract, catchEvent, getSigner} from "./init";

task("finish", "Finish Voting")
    .addParam("id", "Voting ID")
    .setAction(async(taskArgs, hre) => {
        const voting = await getContract(hre);
        const signer = await getSigner(hre);
        const tx = await voting.connect(signer).finishProposal(taskArgs.id);

        const txWait = await (tx).wait();

        await catchEvent(txWait, ["Voting ID", "Result"]);
    })