import { ethers } from "hardhat";

async function main() {
  const VotingFactory = await ethers.getContractFactory("DAOVoting");
  const voting = await VotingFactory.deploy();

  await voting.deployed();

  console.log("DAOVoting deployed to:", voting.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
