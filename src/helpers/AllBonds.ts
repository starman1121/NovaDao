import { StableBond, LPBond, NetworkID, CustomBond, BondType } from "src/lib/Bond";
import { addresses } from "src/constants";

import { ReactComponent as DaiImg } from "src/assets/tokens/DAI.svg";
import { ReactComponent as HecDaiimg } from "src/assets/tokens/HEC-DAI.svg";
import { ReactComponent as NOVAMimimg } from "src/assets/tokens/NOVA-MIM.svg";
import { ReactComponent as wAVAXImg } from "src/assets/tokens/wAVAX.svg";
import { ReactComponent as UsdcImg } from "src/assets/tokens/USDC.svg";
import { ReactComponent as MimImg } from "src/assets/tokens/MIM.svg";
import { ReactComponent as UsdtImg } from "src/assets/tokens/USDT.svg";
import { ReactComponent as NOVAAvaxImg } from "src/assets/tokens/NOVA-wAVAX.svg";
import { ReactComponent as HecUsdcImg } from "src/assets/tokens/HEC-USDC.svg";

import { abi as BondHecDaiContract } from "src/abi/bonds/HecDaiContract.json";
import { abi as BondNOVAAvaxContract } from "src/abi/bonds/BondNOVAAvaxContract.json";
import { abi as ReserveNOVAAvaxContract } from "src/abi/reserves/ReserveNOVAAvax.json";
import { abi as HecUsdcContract } from "src/abi/bonds/HecUsdcContract.json";

import { abi as DaiBondContract } from "src/abi/bonds/DaiContract.json";
import { abi as UsdtBondContract } from "src/abi/bonds/Usdt.json";
import { abi as MimBondContract } from "src/abi/bonds/MimContract.json";
import { abi as MimBondContract4 } from "src/abi/bonds/MimBondContract_4.json";
import { abi as NOVAMimBondContract4 } from "src/abi/bonds/NOVAMimBondContract_4.json";
import { abi as ReserveHecDaiContract } from "src/abi/reserves/HecDai.json";
import { abi as ReserveHecUsdcContract } from "src/abi/reserves/HecUsdc.json";
import { getBondCalculator } from "src/helpers/BondCalculator";

import { abi as EthBondContract } from "src/abi/bonds/FtmContract.json";

import { abi as ierc20Abi } from "src/abi/IERC20.json";

// TODO(zx): Further modularize by splitting up reserveAssets into vendor token definitions
//   and include that in the definition of a bond
export const mim = new StableBond({
  name: "mim",
  displayName: "MIM",
  bondToken: "MIM",
  bondIconSvg: MimImg,
  bondContractABI: DaiBondContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x2EC271f90D093eDF144C7AbD12BbF00127C9CF45",
      reserveAddress: "0x130966628846bfd36ff31a822705796e8cb8c18d",
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xDea5668E815dAF058e3ecB30F645b04ad26374Cf",
      reserveAddress: "0xB2180448f8945C8Cc8AE9809E67D6bd27d8B2f2C",
    },
  },
});
// export const usdt = new StableBond({
//   name: "usdt",
//   displayName: "USDT",
//   bondToken: "USDT",
//   decimals: 6,
//   bondIconSvg: UsdtImg,
//   bondContractABI: DaiBondContract,
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0x3e185190f044B3c887b65c11657B0d5433560618",
//       reserveAddress: "0xc7198437980c041c805a1edcba50c1ce5db95118"
//     },
//     [NetworkID.Testnet]: {
//       bondAddress: "",
//       reserveAddress: "",
//     },
//   },
// });
export const avax = new CustomBond({
  name: "avax",
  displayName: "wAVAX",
  lpUrl: "",
  bondType: BondType.StableAsset,
  bondToken: "WAVAX",
  bondIconSvg: wAVAXImg,
  bondContractABI: EthBondContract,
  reserveContract: ierc20Abi, // The Standard ierc20Abi since they're normal tokens
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0xff3225FCb849F93A725ad6fF2d1426B7a14C6e91",
      reserveAddress: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xca7b90f8158A4FAA606952c023596EE6d322bcf0",
      reserveAddress: "0xc778417e063141139fce010982780140aa0cd5ab",
    },
  },
  customTreasuryBalanceFunc: async function (this: CustomBond, networkID, provider) {
    const ethBondContract = this.getContractForBond(networkID, provider);
    let ethPrice = await ethBondContract.assetPrice();
    ethPrice = ethPrice / Math.pow(10, 8);
    const token = this.getContractForReserve(networkID, provider);
    let avaxAmount = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);
    avaxAmount = avaxAmount / Math.pow(10, 18);
    return avaxAmount * ethPrice;
  },
});

export const NOVA_mim = new LPBond({
  name: "NOVA_mim_lp",
  displayName: "NOVA-MIM LP",
  bondToken: "MIM",
  bondIconSvg: NOVAMimimg,
  bondContractABI: BondHecDaiContract,
  reserveContract: ReserveHecDaiContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x5CDb0E291765d11c696Abc3fA7a7d379E7D95Fc0",
      reserveAddress: "0xd19de791656F8e677D4C6ec167213C622A79f42d",
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xcF449dA417cC36009a1C6FbA78918c31594B9377",
      reserveAddress: "0x8D5a22Fb6A1840da602E56D1a260E56770e0bCE2",
    },
  },
  lpUrl:
    "https://traderjoexyz.com/#/pool/0xf5197C628915ff90FD565520094C15189229392b/0x130966628846BFd36ff31a822705796e8cb8C18D",
});

// export const NOVA_wavax = new CustomBond({
//   name: "NOVA_wavax_lp",
//   displayName: "NOVA-wAVAX LP",
//   bondToken: "WAVAX",
//   bondIconSvg: NOVAAvaxImg,
//   bondContractABI: BondNOVAAvaxContract,
//   reserveContract: ReserveNOVAAvaxContract,
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0x6045dd16eE5CBE4a0D09FD28AbBc68DCD71f2bf6",
//       reserveAddress: "0x29828626CA711B0E13de1031aaE1F5423100E642",
//     },
//     [NetworkID.Testnet]: {
//       // NOTE (unbanksy): using ohm-dai rinkeby contracts
//       bondAddress: "",
//       reserveAddress: "",
//     },
//   },
//   bondType: BondType.LP,
//   lpUrl:
//     "https://traderjoexyz.com/#/pool/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/0x70b33ebC5544C12691d055b49762D0F8365d99Fe",
//   customTreasuryBalanceFunc: async function (this: CustomBond, networkID, provider) {
//       const ethBondContract = this.getContractForBond(networkID, provider);
//       let ethPrice = await ethBondContract.assetPrice();
//       ethPrice = Number(ethPrice.toString()) / Math.pow(10, 8);
//       const token = this.getContractForReserve(networkID, provider);
//       const tokenAddress = this.getAddressForReserve(networkID);
//       const bondCalculator = getBondCalculator(networkID, provider);
//       const tokenAmount = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);
//       const valuation = await bondCalculator.valuation(tokenAddress || "", tokenAmount);
//       const markdown = await bondCalculator.markdown(tokenAddress || "");
//       let tokenUSD =
//         (Number(valuation.toString()) / Math.pow(10, 9)) * (Number(markdown.toString()) / Math.pow(10, 18));
//       return tokenUSD * Number(ethPrice.toString());
//     },
// });

// export const mim4 = new StableBond({
//   name: "mim4",
//   displayName: "MIM",
//   bondToken: "MIM",
//   bondIconSvg: MimImg,
//   isFour: true,
//   isTotal: true,
//   bondContractABI: MimBondContract4,
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0xb5e4a9002b060d29D6752297e4ffd335bab34ba3",
//       reserveAddress: "0x130966628846bfd36ff31a822705796e8cb8c18d",
//     },
//     [NetworkID.Testnet]: {
//       bondAddress: "0xDea5668E815dAF058e3ecB30F645b04ad26374Cf",
//       reserveAddress: "0xB2180448f8945C8Cc8AE9809E67D6bd27d8B2f2C",
//     },
//   },
// });

// export const NOVA_mim_4 = new LPBond({
//   name: "NOVA_mim_lp4",
//   displayName: "NOVA-MIM LP",
//   bondToken: "MIM",
//   bondIconSvg: NOVAMimimg,
//   isFour: true,
//   isTotal: true,
//   bondContractABI: NOVAMimBondContract4,
//   reserveContract: ReserveHecDaiContract,
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0x04B0dB0bD9BaB2E5854ff5Cca0A30D0C56459B9b",
//       reserveAddress: "0xA03a99CD3d553fE9EbBcCecAbcB8c47100482F72",
//     },
//     [NetworkID.Testnet]: {
//       bondAddress: "0xcF449dA417cC36009a1C6FbA78918c31594B9377",
//       reserveAddress: "0x8D5a22Fb6A1840da602E56D1a260E56770e0bCE2",
//     },
//   },
//   lpUrl:
//     "https://traderjoexyz.com/#/pool/0x70b33ebC5544C12691d055b49762D0F8365d99Fe/0x130966628846BFd36ff31a822705796e8cb8C18D",
// });

// HOW TO ADD A NEW BOND:
// Is it a stableCoin bond? use `new StableBond`
// Is it an LP Bond? use `new LPBond`
// Add new bonds to this array!!
// export const allBonds = [NOVA_mim, mim, usdt, avax, NOVA_wavax, mim4, NOVA_mim_4];
export const allBonds = [NOVA_mim, mim, avax];
export const allBondsMap = allBonds.reduce((prevVal, bond) => {
  return { ...prevVal, [bond.name]: bond };
}, {});

// Debug Log
// console.log(allBondsMap);
export default allBonds;
