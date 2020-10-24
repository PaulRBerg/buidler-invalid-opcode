import { Signer } from "@ethersproject/abstract-signer";
import { ethers, waffle } from "@nomiclabs/buidler";

import ChainIdReaderArtifact from "../artifacts/ChainIdReader.json";

import { ChainIdReader } from "../typechain/ChainIdReader";
import { shouldBehaveLikeGreeter } from "./ChainIdReader.behavior";

const { deployContract } = waffle;

setTimeout(async function () {
  const signers: Signer[] = await ethers.getSigners();
  const admin: Signer = signers[0];

  describe("Greeter", function () {
    beforeEach(async function () {
      this.chainIdReader = (await deployContract(admin, ChainIdReaderArtifact, [])) as ChainIdReader;
    });

    shouldBehaveLikeGreeter();
  });

  run();
}, 1000);
