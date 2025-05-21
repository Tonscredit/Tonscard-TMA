// 文件路径：/src/lib/ton/getBal.ts

import { Address, beginCell } from "@ton/core";
import { ToncoreAdapter } from "@tonx/adapter";
import type { Cell, Slice } from "@ton/core";

const client = new ToncoreAdapter({
  network: "mainnet",
  apiKey: process.env.NEXT_PUBLIC_TONX_API,
});      
const client_1 = new ToncoreAdapter({
  network: "mainnet",
  apiKey: process.env.NEXT_PUBLIC_TONX_API_1,
});  
const client_2 = new ToncoreAdapter({
  network: "mainnet",
  apiKey: process.env.NEXT_PUBLIC_TONX_API_2,
});   
const client_3 = new ToncoreAdapter({
  network: "mainnet",
  apiKey: process.env.NEXT_PUBLIC_TONX_API_3,
});    
const client_4 = new ToncoreAdapter({
  network: "mainnet",
  apiKey: process.env.NEXT_PUBLIC_TONX_API_4,
});                                            
async function getJettonWalletAddress(
  c:any,
  ownerAddress: string,
  jettonMasterAddress: string
): Promise<string> {
    try{
        const ownerAddressCell: Cell = beginCell()
            .storeAddress(Address.parse(ownerAddress))
            .endCell();
        const response = await c.callGetMethod(
            Address.parse(jettonMasterAddress),
            "get_wallet_address",
            [{ type: "slice", cell: ownerAddressCell }]
        );
        const jettonWalletAddress = response.stack.readAddress().toString();
        return jettonWalletAddress;
    }catch(e)
    {
        return ""
    }
}
async function getJettonBalance(  c:any,jettonWalletAddress: string): Promise<bigint> {
    try{
        const response = await c.callGetMethod(
            Address.parse(jettonWalletAddress),
            "get_wallet_data",
            []
        );
        const balance: bigint = response.stack.readBigNumber();
        return balance;
    }catch(e)
    {
        return BigInt(0)
    }

}

export async function getBal(address: string){
  const tonBalance: bigint = await client.getBalance(Address.parse(address));
  const usdtJettonMaster = "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs";
  const dogsJettonMaster = "EQCvxJy4eG8hyHBFsZ7eePxrRsUQSFE_jpptRAYBmcG_DOGS";
  const usdtJettonWallet = await getJettonWalletAddress(client_1,address, usdtJettonMaster);
  const dogsJettonWallet = await getJettonWalletAddress(client_2,address, dogsJettonMaster);
  const usdtBalance: bigint = (await getJettonBalance(client_3,usdtJettonWallet))??BigInt(0);
  const dogsBalance: bigint = (await getJettonBalance(client_4,dogsJettonWallet))??BigInt(0);
  return {
    tonBalance,
    usdtBalance,
    dogsBalance,
  };
}
