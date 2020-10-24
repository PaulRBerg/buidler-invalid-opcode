import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";
dotenvConfig({ path: resolve(__dirname, "./.env") });

import { BuidlerConfig, usePlugin } from "@nomiclabs/buidler/config";
import { NetworkConfig, Networks } from "@nomiclabs/buidler/types";

import "./tasks/accounts";
import "./tasks/clean";
import "./tasks/typechain";

usePlugin("@nomiclabs/buidler-ganache");
usePlugin("@nomiclabs/buidler-waffle");
usePlugin("solidity-coverage");

/* Ensure that we have all the environment variables we need. */
let mnemonic: string;
if (!process.env.MNEMONIC) {
  throw new Error("Please set your MNEMONIC in a .env file");
} else {
  mnemonic = process.env.MNEMONIC;
}

/* The @nomiclabs/buidler-ganache is missing type extensions. */
export type ExtendedNetworkConfig = NetworkConfig & {
  _chainId?: number;
  default_balance_ether?: number,
  gasLimit?: number;
  mnemonic?: string;
  network_id?: number;
  url?: string;
};

export interface ExtendedNetworks extends Networks {
  [networkName: string]: ExtendedNetworkConfig;
}

export interface ExtendedBuidlerConfig extends BuidlerConfig {
  networks?: ExtendedNetworks;
}

const config: ExtendedBuidlerConfig = {
  defaultNetwork: "buidlerevm",
  mocha: {
    /* Without this property set, the "setTimeout" from the Greeter.js file wouldn't work. */
    delay: true,
  },
  networks: {
    buidlerevm: {
      chainId: 31337,
    },
    coverage: {
      url: "http://127.0.0.1:8555",
    },
    ganache: {
      default_balance_ether: 1000000,
      gasLimit: 50000000,
      mnemonic,
      network_id: 1,
      url: "http://127.0.0.1:8545",
    },
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    coverage: "./coverage",
    coverageJson: "./coverage.json",
    sources: "./contracts",
    tests: "./test",
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
    version: "0.7.4",
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
};

export default config;
