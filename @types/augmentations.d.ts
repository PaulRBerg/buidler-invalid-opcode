import { ChainIdReader } from "../typechain/ChainIdReader";

export interface TypechainConfig {
  outDir?: string;
  target?: "ethers-v4" | "ethers-v5" | "truffle-v4" | "truffle-v5" | "web3-v1";
}

declare module "@nomiclabs/buidler/types" {
  interface BuidlerConfig {
    typechain?: TypechainConfig;
  }

  interface ProjectPaths {
    coverage: string;
    coverageJson: string;
    typechain: string;
  }
}
declare module "mocha" {
  export interface Context {
    chainIdReader: ChainIdReader;
  }
}
