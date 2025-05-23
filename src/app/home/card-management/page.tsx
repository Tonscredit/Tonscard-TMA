'use client';
import React, { useEffect, useRef, useState } from "react";
import { generateQRCodeBase64 } from "utils/qr";
import { SendTransactionRequest, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import {TonConnectButton} from "@tonconnect/ui-react";
import TonWeb from 'tonweb';
import Image from 'next/image';
import Link from 'next/link';

import { useRouter, useSearchParams } from "next/navigation";
import config, { getCardById, getChain } from "core/config";
import { api_card, api_user_data, api_user_info, api_user_info_update } from "core/api";
import { getBal } from "core/ton";
import { getUserId } from "core/storage";
import Card from "components/card";
import { FaHistory } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/react";

const Dashboard = () => {

    const searchParams = useSearchParams();

    const { open, onOpen, onClose } = useDisclosure()

    const [token , setToken] = useState("ton")

    const [tonConnectUi] = useTonConnectUI();

    const [initLock , setInitLock] = useState(false)

    const [amount, setAmount] = useState(0);

    const [credit , setCredit] = useState([])
    const [card,setCard] = useState(
        {
            id:0,
            title:`💎Tonscredit CARD💎`,
            cardNum:"1928257036692316",
            subtitle:"123",
            brand: "MASTER",
            type:"VIRTUAL",
            expire:`2028/01`,
            imgSrc: "/img/card/card-emp.png",
        }
    )
    const [cardInfo,setCardInfo] = useState({
        available_balance:0
    })

    const countries = config.region;
    const bRef = useRef<any>(null);

    const wallet = useTonWallet();

    const cardId = searchParams.get("id");
  useEffect(() => {
    const init = async () => {
      const data = await api_card(cardId)
      console.log(data)
      if(data && data.data)
      {
        setCardInfo(data.data);
        const type = data.data.type
        setCard(
            {
            id:data.data.user_card_id,
            title:`💎 ${getCardById(type).name} 💎`,
            cardNum:data.data.pan,
            subtitle:data.data.cvv,
            brand: data.data.user_card_id,
            type:data.data.user_card_id,
            expire:`${data.data.expire_year}/${data.data.expire_month}`,
            imgSrc: getCardById(type).img
            }
        )
      }
    };

    if(!initLock)
    {
      setInitLock(true);
      init();
    }

    if(wallet)
    {

    }
  }, [wallet]); 

  const cardNumDisplay = (cardNum:string)=>
  {
      const groups = cardNum.match(/.{1,4}/g);
      return groups ? groups.join(" ") : "";
  }
  const deposite = async() =>
  {
    if(!wallet)
    {
      tonConnectUi.openModal()
    }else{

    }
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 justify-items-center">
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray" style={{
        display : open?"block":"none",
        backgroundColor:"transparent"
      }}>
        <div className="bg-gray-300/70 p-6 rounded-xl shadow-lg h-full" onClick={onClose}>
            <Card extra="rounded-[20px] p-3"  onClick={(e:any) => e.stopPropagation()}>
            <section className="flex items-center py-2">
                    <p className="grow text-center font-bold">Select Asserts</p>
                  </section>
                  <section className="flex flex-col gap-2">
                    <div className="search-items flex flex-wrap gap-2">
                      {config.chains.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center border border-gray-300 rounded-full px-3 py-1 cursor-pointer hover:bg-gray-100 transition"
                          onClick={
                            ()=>
                            {
                              setToken(item.id)
                              onClose();
                            }
                          }
                        >
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                      ))}
                    </div>

                  </section>
                  
            </Card>
          </div>
      </div>

      <div className="w-full max-w-md mx-auto py-8 flex justify-center items-center ">
       <h2 className="text-2xl font-bold text-white flex"> My Card</h2>
      </div>

    <div
        key={card.id}
        className={`
            relative bg-gray-800 rounded-xl shadow-lg overflow-hidden
            h-46
            transition-all duration-300 ease-in-out
            }
        `}
        >
        <div className="absolute inset-0">
            <img
            src={card.imgSrc}
            alt={card.title}
            className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 flex flex-col h-full justify-between p-4">
            <div>
            <h2 className="text-white text-xl font-semibold">
                {card.title}
            </h2>
            <br/>
            <div className="text-white text-xl font-semibold creditfont creditcardnumber">
                {
                cardNumDisplay(card.cardNum)
                }
            </div>
            <div
            style={{
                flexDirection: "row-reverse"
            }}
            className="flex w-full"
            >
                <p className="text-gray-300 text-sm mt-1 creditfont creditcardcvv" >
                    {card.subtitle}
                </p>
            </div>

            <div
            style={{
                flexDirection: "row-reverse"
            }}
            className="flex w-full"
            >
                <p className="text-gray-300 text-sm mt-1 creditfont creditcardcvv" >
                    {card['expire']}
                </p>
            </div>
            
            </div>
        </div>
    </div>

        <Card extra={'w-full p-4 h-full'}>
        <div className="w-full max-w-md mx-auto flex justify-center items-center ">
            <h2 className="text-2xl font-bold text-white flex"> Balance</h2>
        </div>
        <div className="w-full max-w-md mx-auto flex justify-center items-center ">
            <h2 className="text-2xl font-bold text-white flex"> {cardInfo.available_balance} $</h2>
        </div>

      </Card>
    <Card extra={'w-full p-4 h-full'}>
        <div className="w-full max-w-md mx-auto flex justify-center items-center ">
        <h2 className="text-2xl font-bold text-white flex"> Deposite</h2>
        </div>
        <div
            style={{
            // minWidth: '100vh',
            width: '95%',
            // background: authBg,
            position: 'relative',
            height: 'max-content',
            boxSizing: 'border-box',
            color:"white"
            }}
        >
            <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                width: '100%',
                margin: '0 auto',
                // paddingTop: '10px',
                paddingLeft: '30px',
                paddingRight: '0px',
                paddingBottom: '0px',
                boxSizing: 'border-box',
            }}
            >
            <div
                style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: '420px',
                margin: '0 auto 20px auto',
                background: 'transparent',
                borderRadius: '15px',
                boxSizing: 'border-box',
                }}
            >
                <br/>
                <div
                    className="flex justify-center items-center items-center border border-gray-300 rounded-full px-3 py-1 cursor-pointer hover:bg-gray-100 transition"
                    onClick={
                    ()=>
                    {
                        onOpen()
                    }
                    }
                >
                    <img
                    src={(getChain(token) as any).img}
                    alt={(getChain(token) as any).name}
                    className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="text-sm font-medium">{(getChain(token) as any).name}</span>
                </div>
                <br/>
                <div style={{ marginBottom: '24px' }}>
                <label
                    htmlFor="email"
                    style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                    }}
                >
                    {"Amount"}
                    <span style={{ marginLeft: '4px' }}></span>
                </label>
                <input
                    id="holder"
                    type="number"
                    placeholder="Amount to deposite"
                    required
                    onChange={(e) => setAmount(Number(e.target.value))}
                    style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    border: `1px solid`,
                    boxSizing: 'border-box',
                    color:"black"
                    }}
                />
                </div>


                <button
                onClick={deposite}
                style={{
                    width: '100%',
                    height: '50px',
                    marginBottom: '24px',
                    fontSize: '14px',
                    fontWeight: 500,
                    backgroundColor: '#1c2558',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                }}
                >
                {`Confirm Deposite ${amount} ${(getChain(token) as any).name}`}
                </button>
            </div>
            </div>
        </div>

      </Card>

        <Card extra={'w-full p-4 h-full'}>
            <div className="w-full max-w-md mx-auto flex justify-center items-center ">
                <h2 className="text-2xl font-bold text-white flex"> Credit History</h2>
            </div>
          <div className="w-full max-w-md mx-auto">
              <div className={`!z-5 relative flex flex-col rounded-[20px] bg-gray-900 bg-clip-border shadow-3xl shadow-shadow-100 dark:text-white `}>
                {credit.map((c, idx) => (
                  <div className="h-full w-full" key={idx}>
                    <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
                      <div className="flex">
                      <div className="mb-2">
                        <p className="text-lg font-bold text-navy-700 dark:text-white">
                          {(c.amount>0 ? "+"+c.amount.toString():c.amount.toString())}$
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
                          {(new Date(c.date)).toLocaleString()}
                        </p>
                      </div>
                      </div>
                      <button className=" linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90">
                        Check Details
                      </button>
                    </div>
                  </div>
                ))
              }
              {
                credit.length==0 ? 
                  <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
                    <div  className="w-full flex justify-center items-center" style={{minHeight:"50px"}}>
                       No any bill
                    </div>
                   
                  </div>
                :null
              }
      </div>


          </div>
      </Card>
    </div>
  );
};

export default Dashboard;
