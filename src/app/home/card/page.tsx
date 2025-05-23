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
import { getBal } from "core/ton";
import { getCardById } from "core/config";
const Dashboard = () => {
  const [expanded, setExpanded] = useState(false);
  const [tonConnectUi] = useTonConnectUI();
  const wallet = useTonWallet();
  const [cards, setCards] = useState(
    [
      {
      id: 0,
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

  const [tonBal , setTonBal] = useState(0)
  const [usdtBal , setUsdtBal] = useState(0)
  const [dogsBal , setDogsBal] = useState(0)
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

  const [initLock , setInitLock] = useState(false)
  useEffect(() => {
    const init = async () => {
      const info = await api_user_data()
      if(info)
      {
        console.log(info)
        if(info.card.length>0)
        {
          let c = [];
          info.card.forEach((e:any) => {
            c.push(
              {
                id:e.user_card_id,
                title:`💎 ${getCardById(e.type)?getCardById(e.type).name:"Tonscredit CARD"} 💎`,
                cardNum:e.pan,
                subtitle:e.cvv,
                brand:e.brand_code,
                type:e.card_type,
                expire:`${e.expire_year}/${e.expire_month}`,
                imgSrc: getCardById(e.type)?getCardById(e.type).img:"/img/card/card-emp.png",
                btnText: "Manage",
                onClick: () => {
                  location.href="/home/card-management?id="+e.user_card_id
                },
              }
            )
          });
          c.push(
              {
                id: 0,
                title: "💎TON Card💎",
                cardNum:"",
                subtitle: "Best crypto prepaid card on TON",
                imgSrc: "/img/card/card-bg-2.jpg",
                btnText: "Manage",
                onClick: () => {
                  
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
    if(!initLock)
    {
      setInitLock(true);
      init();
    }

    if(wallet)
    {
      walletBlanace()
    }
  }, [wallet]);


  const walletBlanace = async()=>
  {
        if(wallet)
        {
          const bal = await getBal(wallet.account.address)
          console.log(bal)
          setTonBal(
            Number((Number(bal?.tonBalance)/1e9).toFixed(3))
          );
          setUsdtBal(
            Number((Number(bal?.usdtBalance)/1e9).toFixed(3))
          )
          setDogsBal(
            Number((Number(bal?.dogsBalance)/1e9).toFixed(3))
          )
        }else{
          console.log("wallet not exit",wallet)
        }
  }

  const applyNowDisplay = (card:any)=>
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

  const cardNumDisplay = (cardNum:string)=>
  {
      const groups = cardNum.match(/.{1,4}/g);
      return groups ? groups.join(" ") : "";
  }
  return (
    <div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 justify-items-center">

        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4 flex"><FaCreditCard/>&nbsp; My Poket &nbsp;</h2>
          <div
            className={`
              relative 
              ${expanded ? "h-auto overflow-visible" : "h-48 overflow-hidden"}
              transition-all duration-300 ease-in-out
            `}
          >
            {cards.map((card, idx) => (
              card.id==0?
              <div
                key={card.id}
                className={`
                  relative bg-gray-800 rounded-xl shadow-lg overflow-hidden
                  h-48
                  transition-all duration-300 ease-in-out
                  ${!expanded && idx > 0 ? "-mt-10" : "mt-0"}
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
                </div>
              </div>
              :
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
                    {/* <h2 className="text-white text-xl font-semibold">
                      {card.title}
                    </h2> */}
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
                      <img src="/img/coins/dogs.png" style={{maxWidth:"50px"}}/>{dogsBal}
                    </div>
                    <div style={{color:"white"}}>
                      <img src="/img/chains/ton.png" style={{maxWidth:"50px"}}/>{tonBal}
                    </div>
                    <div style={{color:"white"}}>
                      <img src="/img/chains/usdt.png" style={{maxWidth:"50px"}}/>{usdtBal}
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
                  <div className="h-full w-full" key={idx}>
                    <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
                      <div className="flex">
                      <div className="mb-2">
                        <p className="text-lg font-bold text-navy-700 dark:text-white">
                          {(c.amount>0 ? "+"+c.amount.toString():c.amount.toString())}$
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
                          {(new Date(
                            Number(c.request_id.split(c.user_card_id)[1])
                            )).toLocaleString()}
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
