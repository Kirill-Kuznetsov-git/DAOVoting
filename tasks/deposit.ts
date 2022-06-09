import {task} from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import {getContract} from "./init";

task("deposit", "To deposit tokens")
    .addParam("funds", "Number of tokens")
    .setAction(async(taskArgs, hre) => {
        await (await getContract(hre)).deposit(taskArgs.funds);
    })