import {task} from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import {get_contract as get_contract} from "./init";
import { boolean } from "hardhat/internal/core/params/argumentTypes";

task("vote", "Vote in voting")
    .addParam("id", "Voting ID")
    .addParam("value", "Voting value: true or false")
    .setAction(async(taskArgs, hre) => {
        let res: boolean = taskArgs.value == true;
        await (await get_contract(hre)).vote(taskArgs.id, res);
    })