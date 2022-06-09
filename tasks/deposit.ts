import {task} from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import {get_contract as get_contract} from "./init";

task("deposit", "To deposit tokens")
    .addParam("funds", "Number of tokens")
    .setAction(async(taskArgs, hre) => {
        await (await get_contract(hre)).deposit(taskArgs.funds);
    })