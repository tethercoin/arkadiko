# ArkadikoDAO

## Background
**What problems do you aim to solve? How does it serve the mission of a user owned internet?**

The Stacks (DeFi) ecosystem is quite new and does not have any of the crucial DeFi primitives or liquidity protocols yet. This project aims to solve the problem of liquidity and market-making through a stablecoin. Establishing stablecoin standards on Stacks will grow the ecosystem and encourage stability. It serves the mission of a user owned internet since it allows users to maintain price stability on their assets and earn a yield at the same time, without having to go through rigorous KYC/AML requirements. Additionally, having the ability for STX holders to market make, and put their crypto to work, provides even more opportunities for value creation and passive income.

## Project Overview
**What solution are you providing? Who will it serve?**

Disclaimer: the name of the project and tokens are subject to change.

Arkadiko implements a stablecoin called Arkadiko (DIKO) and a Governance Token called Somos (ARE) that create the foundational primitives for a lending/borrowing platform.

The Arkadiko protocol trustlessly provides stable loans backed by Stacks Tokens (STX), known as Arkadiko (DIKO). In order to mint DIKO, you need to over-collateralise Stacks (STX) tokens into an Arkadiko Stacks Vault. In other words, DIKO is a stablecoin, existing to maintain relative price stability in volatile markets. People repay their loans by returning DIKO plus a little more to cover the fixed interest on the loan (called the stability fee). The protocol enforces the price by selling off a person's STX if its total value falls below 150 percent (liquidation ratio) of how ever much STX the user borrowed. All STX will be sold through auctions to stackers who are registered with the protocol.

No more and no less DIKO exist in the world than loans made in it at that time. Every single DIKO is some piece of someone’s STX, locked up on the Arkadiko protocol until the person who put in their STX pays the DIKO back. When DIKO goes into the system to repay a loan, it just gets burnt and disappears forever. Only the interest (i.e. stability fee) remains for Arkadiko to use to reward ARE holders or cover expenses for the protocol.

When STX are posted as collateral to mint stablecoins, the STX tokens will automatically be used to stack natively on the Stacks protocol (either autonomously or through a delegation pool). The yield earned in bitcoin will be used for three purposes:
1. Reward DIKO stablecoin minters to HODL and use their stablecoins (e.g. they take 80% of the yield)
2. Go into the reserve of the DAO to cover expenses (e.g. the reserve takes 5% of the yield)
3. Distribute earnings among the ARE governance token holders (e.g. the token holders get 15% of the yield)

All numbers and parameters will eventually be voted and decided upon through the DAO (Decentralised Autonomous Organisation), where each ARE token counts towards one vote. The following parameters can be decided upon (this list is not comprehensive and can expand as DAO development progresses):

1. Risk Parameters for STX collateral
  - Liquidation Ratio
  - Collateral to Debt Ratio
  - Maximum Debt
  - Liquidation Penalty
2. Yield distribution of STX Stacking Reward

As an example, in v1 of Arkadiko, users will be able to mint stablecoins through collateralizing STX. The following risk parameters are used for STX:

- Liquidation Ratio: 150
- Collateral to Debt Ratio: 200
- Maximum Debt: $100 million
- Liquidation Penalty: 13%

These parameters are subject to change.

### Stablecoin Risk Parameters

- Maximum Debt:​ A Debt Ceiling is the maximum amount of debt that can be created by a single collateral type. Arkadiko Governance assigns every collateral type a Debt Ceiling, which is used to ensure sufficient diversification of the Arkadiko Protocol collateral portfolio. Today, only one type of collateral is accepted (STX) but this will change as soon as more (SRC20) tokens get accepted by the community. Once a collateral type has reached its Debt Ceiling, it becomes impossible to create more debt unless some existing users pay back all their Vault debt (and thus burns their DIKO).

- Stability​ ​Fee:​ The Stability Fee is an annual percentage yield calculated on top of how much DIKO has been generated against a Reserve's collateral. The fee is paid in STX, and then sent into the Arkadiko Buffer.

- Collateral to Debt Ratio: Indicates how much collateral needs to be posted to create an amount of debt. A collateral to debt of 200 means that two times as much collateral needs to be posted as the amount minted (e.g. $10 stablecoin needs $20 STX collateral).

- Liquidation​ ​Ratio:​ ​A low Liquidation Ratio means Arkadiko Governance expects low price volatility of the collateral; a high Liquidation Ratio means high volatility is expected.

- Liquidation Penalty:​ The Liquidation Penalty is a fee added to a Vault's total outstanding generated DIKO when a Liquidation occurs. The Liquidation Penalty is used to encourage DIKO owners to keep appropriate collateral levels.

The DAO will eventually be supported by a foundation, where the foundation will initiate a governance token sale for those interested. The amount of ARE governance tokens has yet to be decided, and can be subject to low inflation that is fixed in the protocol. The token supply & distribution will be laid out in the coming months. Ultimately, Arkadiko wants to position itself as a community-led growth and development vehicle.

### Somos: Arkadiko Governance

The ARE governance token is used to manage and vote on proposals put forward by the community.

- Add a​ ​new​ ​collateral asset ​type with a unique set of Risk Parameters.
- Change the Risk Parameters of one or more existing collateral asset types
- Set the percentage threshold to distribute BTC earnings
- Trigger Emergency Shutdown

## Scope
**What are the components or technical specs of the project? What will the final deliverable look like? How will you measure success?**

A high-level architecture currently looks as follows:
![Architecture](https://github.com/philipdesmedt/arkadiko-dao/blob/master/docs/architecture-high-level.png?raw=true)

Components & Technical Specs
- A set of around 15 Clarity smart contracts will be built. Some are already built but need to be iterated upon. Those that are already built need to be more secure with smart contract asserts, post conditions, and some need to become more flexible + battle tested. E.g. in the initial version, it was not possible for a user to have multiple vaults. In a recent effort, I made it possible for users to have multiple vaults.
- A react UI will be built on the Stacks.js library hooking into the smart contracts. The initial UI will consist of three big sections:
  - Creating Vaults, Minting & Burning
  - Auctioning of Liquidated Vaults
  - Voting and other DAO functions
- Landing Page + Documentation
  - Documentation will be written as a Gitbook page
  - A set of great DeFi landing pages will be used as inspiration, e.g. https://yearn.finance/ and https://uniswap.org/. The landing page should be very succinct and simple, and acts as the product itself, with a clear call to action to connect your wallet.
- I will work with a designer who can improve UI & UX
- Until a production-ready Oracle is available, I will have to build out a mechanism that reliably updates the price feed oracle through a simple cron job

A functional v0.1 can be tested at https://github.com/philipdesmedt/arkadiko-dao. It requires running mocknet. A demo video can be seen here: TODO

### Success Metrics

Success at this stage is measured by transparency of our process. The code and documentation are all open source. Furthermore, at the end of each sprint we hold a review for stakeholders - including an open invitation to community members. The reviews will present the work finished in the sprint and present an opportunity to discuss problems encountered and insights for future development. We will post invitations to our reviews on Discord and via direct messages to partners in the Foundation.

Review meetings would likely start in the May - June timeframe as input & feedback becomes more valuable.

The final deliverable will be based on the following user stories. As described above, the final artifact will be a set of smart contracts with a front-end that has great UI/UX.

### User Stories

1. As a user, I can authenticate with the protocol through the Stacks Wallet Browser Extension or similar

#### Acceptance Criteria
After successfully authenticating with the Stacks Wallet browser extension, a stateful account exists that authenticates with Clarity smart contracts.

2. As a user, I can create a vault that mints stablecoin and takes STX as collateral

#### Acceptance Criteria
the Clarity Contract must do the following, atomically:
- Add the user's address to the map of vaults
- Transfer STX to the STX reserve pool to stack in the Stacks protocol
- Mint the amount of DIKO according to the collateral to debt ratio

After a successful response, the newly created vault is visible in the UI.

3. As a user, I can update my vault to post additional STX collateral to avoid liquidation

#### Acceptance Criteria
the Clarity Contract must do the following, atomically:
- Transfer (`stx-transfer`) extra collateral in their vault
- the vault is updated with the new stx-collateral amount and collateral to debt ratios are updated accordingly

4. As a user, I can destroy a vault to burn the stablecoins, and return me the STX collateral minus the stability fee

#### Acceptance Criteria
the Clarity Contract must do the following, atomically:
- Burn the DIKO tokens in the vault
- Transfer the STX tokens back to the user's principal address
- Remove the vault from the map of vaults

5. As a user, I can burn a partial stablecoin position

#### Acceptance Criteria
the Clarity Contract must do the following, atomically:
- Burn part of the DIKO tokens in the vault
- Recalculate collateral to debt

6. As a user, I can register to become a stacker and help liquidate risky positions

#### Acceptance Criteria
the Clarity Contract must do the following, atomically:
- Add user's principal address to the registry (map) of stackers

Currently, there are no special prerequisites to become an Arkadiko Stacker. This might change (e.g. a minimum account balance somewhere). Having your address registered as an Arkadiko Stacker allows you to flag risky vaults and buy auctions.

7. As a user, I can transfer DIKO

#### Acceptance Criteria
the Clarity Contract must do the following, atomically:
- Transfer DIKO to the new user's principal

8. As a stacker, I can look up the collateral to debt ratio of vaults and identify risky ones

#### Acceptance Criteria
the Clarity Contract must do the following, atomically:
- Call the read-only collateral to debt function and return the ratio

The collateral to debt function accepts a vault ID as input and returns its collateral to debt ratio. This is a public function accessible for everyone, but most useful for stackers who want to identify auction possibilities.

9. As a stacker, I can alert the liquidator (engine) for risky vaults

#### Acceptance Criteria
the Clarity Contract must do the following, atomically:
- The liquidator receiving the call will check the vault
- If the identified vault is near or over liquidation (parameter TBD), it will call the STX Reserve liquidate function
- The STX reserve liquidate function does the following:
  - Transfer the STX collateral to a liquidation pool ready for auctioning
  - Burn the DIKO
  - Remove the vault (i.e. remove the vault ID from the map)

10. As a user, I can vote on risk parameters with a governance token

#### Acceptance Criteria
the Clarity Contract must do the following, atomically:
- It registers a vote associated to each governance token in a map

11. As a user, I can submit a proposal if I hold at least 1% of the governance token supply

#### Acceptance Criteria
the Clarity Contract must do the following, atomically:
- Register the proposal in the registry
- Flag the proposal as open to vote

12. As a user, I can vote on proposals (FOR or AGAINST)

#### Acceptance Criteria
the Clarity Contract must do the following, atomically:
- It registers the user's vote(s) proportional the amount of governance tokens they voted with 

13. As a user, I am eligible for stacked bitcoin yield relative to the amount of governance tokens I hold

#### Acceptance Criteria
the Clarity Contract must do the following, atomically:
- After posting STX collateral, the smart contract will put STX in the reserve pool
- Where possible, the STX will be stacked on the Stacks protocol
- The rewards in bitcoin will be paid every cycle, or periodically decided upon by the protocol governance

14. As a stacker, I can buy up liquidated STX tokens in an auction

#### Acceptance Criteria
the Clarity Contract must do the following, atomically:
- When a vault gets liquidated, the STX collateral is transferred to a STX liquidation reserve address
- A simple bidding mechanism allows Stackers to buy up STX collateral at a discount, first come first serve 

15. As a guest, I can browse the main page and documentation

Up until now, we have always talked about a few personas (user, stacker, automated liquidator), but not about an initial guest user yet. The guest can browse the web page and read documentation freely without authenticating with the Stacks Wallet browser extension.


## Budget & Milestones
**What grant amount are you seeking? How long will the project take in hours? If more than 20, please break down the project into milestones, with a clear output (e.g., low-fi mockup, MVP with two features) and include the estimated work hours for each milestone.**

This project will take hundreds of hours (probably more like thousands though). I am seeking a grant amount of $50,000 which would cover part of my time & expenses made in the next months. The project can be broken down into 3 big parts (Smart Contracts + UI). The parts are the following:

1. Creating Vaults, Minting, Transferring & Burning (smart contract + UI)
2. Auctioning of Liquidated Vaults
3. Voting and other DAO functions


| User Story     | Days         | Cost         |
| :------------- | :----------: | -----------: |
| As a user, I can authenticate with the protocol through the Stacks Wallet Browser Extension or similar | 1   | And Again    |
| As a user, I can create a vault that mints stablecoin and takes STX as collateral   | Put Pipes In | Like this    |
| As a user, I can update my vault to post additional STX collateral to avoid liquidation   | Put Pipes In | Like this    |
| As a user, I can destroy a vault to burn the stablecoins, and return me the STX collateral minus the stability fee   | Put Pipes In | Like this    |
| As a user, I can burn a partial stablecoin position   | Put Pipes In | Like this    |
| As a user, I can register to become a stacker and help liquidate risky positions   | Put Pipes In | Like this    |
| As a user, I can transfer DIKO   | Put Pipes In | Like this    |
| As a stacker, I can look up the collateral to debt ratio of vaults and identify risky ones   | Put Pipes In | Like this    |
| As a stacker, I can alert the liquidator (engine) for risky vaults  | Put Pipes In | Like this    |
| As a user, I can vote on risk parameters with a governance token  | Put Pipes In | Like this    |
| As a user, I can submit a proposal if I hold at least 1% of the governance token supply   | Put Pipes In | Like this    |
| As a user, I can vote on proposals (FOR or AGAINST)   | Put Pipes In | Like this    |
| As a user, I am eligible for stacked bitcoin yield relative to the amount of governance tokens I hold   | Put Pipes In | Like this    |
| As a stacker, I can buy up liquidated STX tokens in an auction   | Put Pipes In | Like this    |
| As a guest, I can browse the main page | 5 days  | And Again    |

## Team

Currently I am working on this alone. In the last 7 years, I have successfully built and sold a SaaS company (~$3.5mio ARR) as the founding CTO. I built a team of ~20 devs and set up security efforts, served as lead architect, helped design the product lifecycle, raised money, led technical due diligence during the acquisition, liaised with customers and shareholders etc. I've seen most aspects of the business, which makes me qualified to build & launch the first version of Arkadiko, including initial go-to-market and follow-up.

When the first version is ready to launch on mainnet and most risks (see below) are resolved, it is likely that a Swiss foundation will be set up to lead Arkadiko in the beginning years.

## Usage

- Trading Liquidity & Market-Making
- Enables stacking with a tradeable derivative (e.g. allows trading a productive asset that yields btc while the STX are locked up)
- Lending & Borrowing liquidity milestone to build out Arkadiko Lending & Borrowing Platform which will support a multitude of assets (and SRC20 tokens)
- Any application that wants to make use of stable prices & liquidity (e.g. games)

## Risks

- I am the sole developer on this right now. Having said that, I have built high performing teams in the past and have people close to me with (technical or operational) knowledge of cryptocurrency & DeFi. They are willing to join, but I prefer building the foundations of Arkadiko first to de-risk and make it easier to delegate certain tasks and future work.
- This is a big effort. I am a successful developer, CTO and entrepreneur, but the amount of work and complexity cannot be underestimated. Due to professional reasons, I cannot go full-time on this until July/August, but I will be then.
- The Stacks Ecosystem as a whole is young. I am missing certain primitives that would block Arkadiko from launching on mainnet:
  - An SRC20 token standard
  - Decentralised Oracle support (e.g. Chainlink)
  - Stacks Wallet Chrome Extension which is still alpha
  - Probably need another stablecoin (e.g. USDT, USDC, PAX) on Stacks to peg against at some point
- The Discord community is still small (but active) so getting questions answered & debugging can take slightly longer
- One `tx-sender` address can only stack once at the moment, as far as I'm aware. This would make stacking inefficient. I believe this will be fixed mid to long term on the Stacks stacking protocol, and a SIP is already open AFAIK (on https://github.com/stacksgov/sips/issues).

Apart from the above, there is a set of more generic risks (e.g. protocol risk wrt security, economic risks if you decide to buy the governance token, regulatory risk that needs to be resolved etc).

## Future Work (Outside Initial Grant Scope)

- Once the stablecoin and DAO are live on mainnet, the next step would be to turn this into a real DeFi hub by building out a liquidity borrowing/lending protocol (i.e. similar to Aave or Compound on ETH). I do think if/when the stablecoin and DAO generate traction, this next step would be easier due to extra resources & having derisked above items
- Collateralize multiple types of cryptocurrency (e.g. wrapped bitcoin or even a 2-of-2 multisig bitcoin that does not need to leave the base bitcoin layer)

## Community and Supporting Materials
**Do you have previous projects, code commits, or experiences that are relevant to this application? What community feedback or input have you received? How do you plan to share your plan to the community over time and as the final deliverable?**

I initially submitted a very early version of Arkadiko to the Stacks 2.0 Mainnet Clarity Smart Contract Challenge where it was chosen as one of the winners. I have received positive feedback from the community on the project, which is also one of the drivers & motivators to make this real on mainnet.

During the development of a testnet-ready version, I will provide updates every 3 weeks, with canary builds that can be tested by the community. Furthermore, it would be amazing if the grant would allow access to a group of dedicated testers who want to make a difference by testing early versions, and through office hours with tech & business experts on certain subjects.

All source code developed under this grant (and the Arkadiko protocol as an extension) is open-sourced under the GPLv3 license