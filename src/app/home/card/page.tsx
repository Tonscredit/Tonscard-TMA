'use client';
import { FaCreditCard, FaStar ,FaHistory} from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import Card from 'components/card';
import {
  Flex,
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from "react";
import { generateQRCodeBase64 } from "utils/qr";
import { SendTransactionRequest, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import {TonConnectButton} from "@tonconnect/ui-react";
import TonWeb from 'tonweb';
import { api_user_data } from "core/api";
import NftCard from "components/card/NftCard";

import NFt6 from '/public/img/nfts/Nft6.png';
const Dashboard = () => {
  const [expanded, setExpanded] = useState(false);
  const [tonConnectUi] = useTonConnectUI();
  const wallet = useTonWallet();
  const [cards, setCards] = useState(
    [
      {
      id: 1,
      title: "💎TON Card💎",
      cardNum:"",
      subtitle: "Best crypto prepaid card on TON",
      imgSrc: "/img/card/card-emp.png",
      btnText: "Manage",
      onClick: () => {
        alert("Manage");
      },
    },
    ]
  );

  const [credit , setCredit] = useState(
    [
      // {
      //   id:1,
      //   amount : -27 ,
      //   date : 1747752398911
      // }
    ]
  )
  // const cards: any[] = [
  //   {
  //     id: 1,
  //     title: "💎TON Card💎",
  //     cardNum:"",
  //     subtitle: "Best crypto prepaid card on TON",
  //     imgSrc: "/img/card/card-emp.png",
  //     btnText: "Manage",
  //     onClick: () => {
  //       alert("Manage");
  //     },
  //   },
  //   // {
  //   //   id: 2,
  //   //   title: "BTC",
  //   //   subtitle: "",
  //   //   imgSrc: "/img/card/card-bg-1.webp",
  //   //   btnText: "Apply",
  //   //   onClick: () => {
  //   //     alert("Apply new card");
  //   //   },
  //   // },
  //   // {
  //   //   id: 3,
  //   //   title: "ETH",
  //   //   cardNum:"Hello",
  //   //   subtitle: "",
  //   //   imgSrc: "/img/card/card-bg-2.jpg",
  //   //   btnText: "Manage",
  //   //   onClick: () => {
  //   //     alert("Connect ETH clicked");
  //   //   },
  //   // },
  // ];

  useEffect(() => {
    const init = async () => {
      const info = await api_user_data()
      if(info)
      {
        console.log(info)
        if(info.card.length>1)
        {
          let c = JSON.parse(
            JSON.stringify(
              info.card
            )
          )
          c.push(
              {
                id: 1,
                title: "💎TON Card💎",
                cardNum:"",
                subtitle: "Best crypto prepaid card on TON",
                imgSrc: "/img/card/card-emp.png",
                btnText: "Manage",
                onClick: () => {
                  alert("Manage");
                },
              }
          )
          setCards(c)
        }
        if(info.credit.length >0)
        {
          setCredit(info.credit)
        }
      }
    }
    init()
  }, []);




  const applyNowDisplay = (card:any)=>
  {
    if(card.cardNum){
      return ("")
    }
    if(cards.length==1)
    {
      return (
        <div className="w-full flex flex-row-reverse">
                      <button
                        onClick={
                          ()=>
                          {
                            location.href = "/home/apply"
                          }
                        }
                        className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md w-max"
                      >
                        Apply Now
                      </button>
        </div>
      )
    }
    if(expanded)
    {
      return ("")
    }

  }
  return (
    <div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 justify-items-center">
      <Card extra={'w-full p-4 h-full'}>
        <div className="w-full max-w-md mx-auto py-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex"><FaCreditCard/>&nbsp; My Poket &nbsp;</h2>
          <div
            className={`
              relative 
              ${expanded ? "h-auto overflow-visible" : "h-48 overflow-hidden"}
              transition-all duration-300 ease-in-out
            `}
          >
            {cards.map((card, idx) => (
              <div
                key={card.id}
                className={`
                  relative bg-gray-800 rounded-xl shadow-lg overflow-hidden
                  h-48
                  transition-all duration-300 ease-in-out
                  ${!expanded && idx > 0 ? "-mt-12" : "mt-0"}
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
                    <h3 className="text-white text-xl font-semibold">
                      {card.title}
                    </h3>
                    {card.subtitle && (
                      <p className="text-gray-300 text-sm mt-1">
                        {card.subtitle}
                      </p>
                    )}
                  </div>
                  {
                    applyNowDisplay(card)
                  }
                  {(card.btnText&&card.cardNum&&(expanded||cards.length<=1)) && (
                    <button
                      onClick={card.onClick}
                      className="bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-md w-max"
                    >
                      {card.btnText}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
              {!expanded ? (
                <div
                  onClick={() => setExpanded(true)}
                  className="mt-2 text-center text-gray-200 cursor-pointer select-none"
                  style={{
                    display : cards.length>1 ? "":"none"
                  }}
                >
                  Tap to Expand
                </div>
              ) :
              (
                <div
                  onClick={() => setExpanded(false)}
                  className="mt-2 text-center text-gray-200 cursor-pointer select-none"
                  style={{
                    display : cards.length>1 ? "":"none"
                  }}
                >
                  Tap to Close
                </div>
              )}
        </div>
      </Card>
      <Card extra={'w-full p-4 h-full'}>
          <div className="w-full max-w-md mx-auto py-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex"><FaStar/>&nbsp; My Credit</h2>
            <div
            className="w-full flex justify-center items-center "
            >
              <TonConnectButton/>

            </div>
            <br/>
            <div
              className="w-full flex justify-center items-center "
            >
              {
                wallet?
                <div className="w-full flex justify-between ">
                    <div style={{color:"white"}}>
                      <img src="/img/chains/usdc.png" style={{maxWidth:"50px"}}/>12345
                    </div>
                    <div style={{color:"white"}}>
                      <img src="/img/chains/ton.png" style={{maxWidth:"50px"}}/>T12345
                    </div>
                    <div style={{color:"white"}}>
                      <img src="/img/chains/usdt.png" style={{maxWidth:"50px"}}/>
                      1234
                    </div>
                </div>
                :null
              }
            </div>
          </div>
      </Card>

      <Card extra={'w-full p-4 h-full'}>
          <div className="w-full max-w-md mx-auto py-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex"><FaHistory/>&nbsp; Credit History</h2>
              <div className={`!z-5 relative flex flex-col rounded-[20px] bg-gray-900 bg-clip-border shadow-3xl shadow-shadow-100 dark:text-white `}>
                {credit.map((c, idx) => (
                  <div className="h-full w-full">
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
      
    </div>
  );
};

export default Dashboard;
