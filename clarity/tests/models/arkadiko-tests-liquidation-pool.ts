import {
  Account,
  Chain,
  Clarinet,
  Tx,
  types,
} from "https://deno.land/x/clarinet@v0.31.0/index.ts";

import * as Utils from './arkadiko-tests-utils.ts';

// ---------------------------------------------------------
// Liquidation pool
// ---------------------------------------------------------

class LiquidationPool {
  chain: Chain;
  deployer: Account;

  constructor(chain: Chain, deployer: Account) {
    this.chain = chain;
    this.deployer = deployer;
  }

  getTokensOf(account: string) {
    return this.chain.callReadOnlyFn("arkadiko-liquidation-pool-v1-1", "get-tokens-of", [
      types.principal(account),
    ], this.deployer.address);
  }
  
  getSharesAt(account: string, block: number) {
    return this.chain.callReadOnlyFn("arkadiko-liquidation-pool-v1-1", "get-shares-at", [
      types.principal(account),
      types.uint(block)
    ], this.deployer.address);
  }

  maxWithdrawableUsda() {
    return this.chain.callReadOnlyFn("arkadiko-liquidation-pool-v1-1", "max-withdrawable-usda", [
    ], this.deployer.address);
  }

  stake(user: Account, amount: number) {
    let block = this.chain.mineBlock([
      Tx.contractCall("arkadiko-liquidation-pool-v1-1", "stake", [
        types.uint(amount * 1000000)
      ], user.address)
    ]);
    return block.receipts[0].result;
  }

  unstake(user: Account, amount: number) {
    let block = this.chain.mineBlock([
      Tx.contractCall("arkadiko-liquidation-pool-v1-1", "unstake", [
        types.uint(amount * 1000000),
      ], user.address)
    ]);
    return block.receipts[0].result;
  }

  withdraw(user: Account, amount: number) {
    let block = this.chain.mineBlock([
      Tx.contractCall("arkadiko-liquidation-pool-v1-1", "withdraw", [
        types.uint(amount * 1000000),
      ], user.address)
    ]);
    return block.receipts[0].result;
  }

  toggleEmergencyShutdown() {
    let block = this.chain.mineBlock([
      Tx.contractCall("arkadiko-liquidation-pool-v1-1", "toggle-shutdown", [
      ], this.deployer.address)
    ]);
    return block.receipts[0].result;
  }
}
export { LiquidationPool };


// ---------------------------------------------------------
// Liquidation rewards
// ---------------------------------------------------------

class LiquidationRewards {
  chain: Chain;
  deployer: Account;

  constructor(chain: Chain, deployer: Account) {
    this.chain = chain;
    this.deployer = deployer;
  }

  getTotalRewardIds() {
    return this.chain.callReadOnlyFn("arkadiko-liquidation-rewards-v1-2", "get-total-reward-ids", [
    ], this.deployer.address);
  }

  getRewardData(rewardId: number) {
    return this.chain.callReadOnlyFn("arkadiko-liquidation-rewards-v1-2", "get-reward-data", [
      types.uint(rewardId),
    ], this.deployer.address);
  }

  getRewardsOf(user: string, rewardId: number) {
    return this.chain.callReadOnlyFn("arkadiko-liquidation-rewards-v1-2", "get-rewards-of", [
      types.principal(user),
      types.uint(rewardId),
      types.principal(Utils.qualifiedName('arkadiko-liquidation-pool-v1-1')),
    ], this.deployer.address);
  }

  getUserRewardInfo(user: string, rewardId: number) {
    return this.chain.callReadOnlyFn("arkadiko-liquidation-rewards-v1-2", "get-user-reward-info", [
      types.uint(rewardId),
      types.principal(user),
      types.principal(Utils.qualifiedName('arkadiko-liquidation-pool-v1-1')),
    ], this.deployer.address);
  }

  getRewardsClaimed(user: string, rewardId: number) {
    return this.chain.callReadOnlyFn("arkadiko-liquidation-rewards-v1-2", "get-reward-claimed", [
      types.uint(rewardId),
      types.principal(user),
    ], this.deployer.address);
  }
  
  addReward(shareBlock: number, unlockBlock:number, token: string, totalAmount: number, isStx: boolean = false) {
    let block = this.chain.mineBlock([
      Tx.contractCall("arkadiko-liquidation-rewards-v1-2", "add-reward-locked", [
        types.uint(shareBlock),
        types.uint(unlockBlock),
        types.bool(isStx),
        types.principal(Utils.qualifiedName(token)),
        types.uint(totalAmount * 1000000)
      ], this.deployer.address)
    ]);
    return block.receipts[0].result;
  }

  claimRewards(user: Account, rewardId: number, token: string) {
    let block = this.chain.mineBlock([
      Tx.contractCall("arkadiko-liquidation-rewards-v1-2", "claim-rewards-of", [
        types.uint(rewardId),
        types.principal(Utils.qualifiedName(token)),
        types.principal(Utils.qualifiedName('arkadiko-liquidation-pool-v1-1')),
      ], user.address)
    ]);
    return block.receipts[0].result;
  }

  toggleEmergencyShutdown() {
    let block = this.chain.mineBlock([
      Tx.contractCall("arkadiko-liquidation-rewards-v1-2", "toggle-shutdown", [
      ], this.deployer.address)
    ]);
    return block.receipts[0].result;
  }

  updateRewardToken(token: string, whitelisted: boolean) {
    let block = this.chain.mineBlock([
      Tx.contractCall("arkadiko-liquidation-rewards-v1-2", "update-reward-tokens", [
        types.principal(Utils.qualifiedName(token)),
        types.bool(whitelisted)
      ], this.deployer.address)
    ]);
    return block.receipts[0].result;
  }
}
export { LiquidationRewards };


// ---------------------------------------------------------
// Liquidation rewards Diko
// ---------------------------------------------------------

class LiquidationRewardsDiko {
  chain: Chain;
  deployer: Account;

  constructor(chain: Chain, deployer: Account) {
    this.chain = chain;
    this.deployer = deployer;
  }

  getEndEpochBlock() {
    return this.chain.callReadOnlyFn("arkadiko-liquidation-rewards-diko-v1-1", "get-end-epoch-block", [
    ], this.deployer.address);
  }

  getEpochRate() {
    return this.chain.callReadOnlyFn("arkadiko-liquidation-rewards-diko-v1-1", "get-epoch-rate", [
    ], this.deployer.address);
  }

  getBlocksPerEpoch() {
    return this.chain.callReadOnlyFn("arkadiko-liquidation-rewards-diko-v1-1", "get-blocks-per-epoch", [
    ], this.deployer.address);
  }

  getEpochInfo() {
    return this.chain.callReadOnlyFn("arkadiko-liquidation-rewards-diko-v1-1", "get-epoch-info", [
    ], this.deployer.address);
  }

  addRewards() {
    let block = this.chain.mineBlock([
      Tx.contractCall("arkadiko-liquidation-rewards-diko-v1-1", "add-rewards", [
        types.principal(Utils.qualifiedName('arkadiko-liquidation-rewards-v1-2')),
      ], this.deployer.address)
    ]);
    return block.receipts[0].result;
  }

  updateEpoch(rate: number, length: number, endBlock: number) {
    let block = this.chain.mineBlock([
      Tx.contractCall("arkadiko-liquidation-rewards-diko-v1-1", "update-epoch-data", [
        types.uint(rate * 1000000),
        types.uint(length),
        types.uint(endBlock),
      ], this.deployer.address)
    ]);
    return block.receipts[0].result;
  }

  toggleEmergencyShutdown() {
    let block = this.chain.mineBlock([
      Tx.contractCall("arkadiko-liquidation-rewards-diko-v1-1", "toggle-shutdown", [
      ], this.deployer.address)
    ]);
    return block.receipts[0].result;
  }

}
export { LiquidationRewardsDiko };


// ---------------------------------------------------------
// Liquidation UI
// ---------------------------------------------------------

class LiquidationUI {
  chain: Chain;
  deployer: Account;

  constructor(chain: Chain, deployer: Account) {
    this.chain = chain;
    this.deployer = deployer;
  }

  getUserTracking(user: string) {
    return this.chain.callReadOnlyFn("arkadiko-liquidation-rewards-ui-v2-2", "get-user-tracking", [
      types.principal(user)
    ], this.deployer.address);
  }

  claimDikoRewards(user: string, rewardIds: any) {
    let block = this.chain.mineBlock([
      Tx.contractCall("arkadiko-liquidation-rewards-ui-v2-2", "claim-50-diko-rewards-of", [
        types.list(rewardIds),
      ], user)
    ]);
    return block.receipts[0].result;
  }

  claimStxRewards(user: string, rewardIds: any) {
    let block = this.chain.mineBlock([
      Tx.contractCall("arkadiko-liquidation-rewards-ui-v2-2", "claim-50-stx-rewards-of", [
        types.list(rewardIds),
      ], user)
    ]);
    return block.receipts[0].result;
  }

}
export { LiquidationUI };

