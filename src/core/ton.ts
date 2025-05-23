// 文件路径：/src/lib/ton/getBal.ts

import { Address, beginCell } from "@ton/core";
import { ToncoreAdapter } from "@tonx/adapter";
import type { Cell, Slice } from "@ton/core";
import { SendTransactionRequest } from "@tonconnect/ui-react";
import TonWeb from "tonweb";

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
    usdtJettonWallet,
    dogsJettonWallet
  };
}

const buildTonTx = async (to:string,amount:string,meno:string)=>
{
      const cell = new TonWeb.boc.Cell();
      cell.bits.writeUint(0, 32);
      cell.bits.writeString(meno);
      const boc = await cell.toBoc(false);
      const payload = TonWeb.utils.bytesToBase64(boc);

      const tx: SendTransactionRequest = {
        validUntil: Math.floor(Date.now() / 1000) + 600,
         messages: [
            {
              address:to,
              amount,
              payload: payload
            },
          ],
      };
      return tx;
}

const buildJettonTx = async (from:string,to:string,amount:string,jetton:string,meno:string)=>
{
      const tonweb = new TonWeb();
      const jettonMinter = new TonWeb.token.jetton.JettonMinter(tonweb.provider, {address: jetton} as any);
      console.log(jettonMinter);
      const jettonMinterAddress = await jettonMinter.getJettonWalletAddress(new TonWeb.utils.Address(from));
      console.log(jettonMinterAddress.toString(true))
      const jettonWallet = new TonWeb.token.jetton.JettonWallet(tonweb.provider, {
        address: jettonMinterAddress
      });
      const tonFee = '50000000'

      const seqno = Date.now()
      const jettonBody = {
        queryId: seqno,
        jettonAmount: amount,
        toAddress: new TonWeb.utils.Address(to),
        responseAddress: new TonWeb.utils.Address(from)
      }

      console.log('🚧 jettonWallet.createTransferBody',jettonBody)
      let payload = await jettonWallet.createTransferBody(jettonBody as any)

      console.log('🚧 payload :',payload)

      //Invoice payment
      let pl = new TonWeb.boc.Cell();
      pl.bits.writeUint(0, 32);
      pl.bits.writeString(meno);


      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 6000, // 6000 sec
        messages: [
            {
                address: jettonMinterAddress.toString(true),
                amount: tonFee,
                payload: TonWeb.utils.bytesToBase64(await payload.toBoc())
            },
            {
                address: to,
                amount: 0,
                payload:  TonWeb.utils.bytesToBase64(await pl.toBoc())
            }
        ]
      }
      console.log(transaction)
      return transaction
}

export {
  buildTonTx,
  buildJettonTx
}