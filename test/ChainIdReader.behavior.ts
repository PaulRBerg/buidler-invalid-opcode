import { BigNumber } from "@ethersproject/bignumber";
import { expect } from "chai";

export function shouldBehaveLikeGreeter(): void {
  it("passes", async function () {
    const foo = 10;
    expect(foo).to.equal(10);
  });

  it("fails on ganache", async function () {
    const chainId: BigNumber = await this.chainIdReader.getChainId();
    console.log({ chainId: chainId.toString() });
  });
}
