import { ethers } from "hardhat";

async function main() {
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, ethers.provider);
  const VotingFactory = await ethers.getContractFactory("DAOVoting");
  const voting = await VotingFactory.deploy(signer.address, process.env.TEST_TOKEN_ADDRESS as string, 2, 3 * 24 * 60 * 60);

  await voting.deployed();

  console.log("DAOVoting deployed to:", voting.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
