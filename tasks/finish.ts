import {task} from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import {getContract, catchEvent} from "./init";

task("finish", "Finish Voting")
    .addParam("id", "Voting ID")
    .setAction(async(taskArgs, hre) => {
        let res: boolean = taskArgs.value == true;
        const tx = await (await getContract(hre)).finishProposal(taskArgs.id);

        const txWait = await (tx).wait();

        await catchEvent(txWait, ["Voting ID", "Result"]);
    })