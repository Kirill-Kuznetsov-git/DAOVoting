import "@nomiclabs/hardhat-waffle";
import {HardhatRuntimeEnvironment} from "hardhat/types";


export async function getContract(hre: HardhatRuntimeEnvironment) {
    let CONTRACT_ADDRESS: string
    if (`${process.env.NETWORK}` == 'LOCALHOST'){
        CONTRACT_ADDRESS = `${process.env.CONTRACT_ADDRESS_LOCALHOST}`;
    } else {
        CONTRACT_ADDRESS = `${process.env.CONTRACT_ADDRESS_GOERLI}`;
    }
    const accounts = await hre.ethers.getSigners();
    const signer = accounts[0];
    const Factory = await hre.ethers.getContractFactory("DAOVoting", signer);
    return new hre.ethers.Contract(
        CONTRACT_ADDRESS,
        Factory.interface,
        signer
    )
}

export async function getToken(hre: HardhatRuntimeEnvironment) {
    return await hre.ethers.getContractAt("InterfaceERC20", process.env.TEST_TOKEN_ADDRESS as string);
}

export async function catchEvent(txWait: any, args: string[]) {
    let n: number = 0;
    while (txWait.events[n].args == undefined) {
        n++;
    }
    for (let i = 0; i < args.length; i++){
        console.log(args[i] + ": " + txWait.events[n].args[i])
    }
}