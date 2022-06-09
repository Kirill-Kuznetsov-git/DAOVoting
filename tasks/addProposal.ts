import {task} from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import {getContract, catchEvent} from "./init";

task("addProposal", "Add new proposal")
    .addParam("title", "Title of function")
    .addParam("address", "Address of contract")
    .addParam("description", "Description")
    .setAction(async(taskArgs, hre) => {
        const voting = await getContract(hre);
        const tx = await voting.addProposal(taskArgs.title, taskArgs.address, taskArgs.description);

        const txWait = await (tx).wait();

        await catchEvent(txWait, ["Voting ID", "Description"]);
    })