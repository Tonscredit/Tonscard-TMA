'use client';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
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
const Dashboard = () => {

  const [from, setFrom] = useState("SOL");

  const [to, setTo] = useState("TON");
  const [invoiceId , setInvoiceId] = useState("")
  const [tonConnectUi] = useTonConnectUI();

  const [initLock , setInitLock] = useState(false)

  const bRef = useRef<any>(null);

  const wallet = useTonWallet();

  useEffect(() => {
    const init = async () => {
    };

    if(!initLock)
    {
      setInitLock(true);
      init();
    }
  }, [invoiceId,wallet,from,to]); 

  const [expanded, setExpanded] = useState(true);
  const cards: any[] = [
    {
      id: 1,
      title: "Dark Card",
      subtitle: "Non-KYC|10$|2.45%|1999$ Limit Peer Month",
      imgSrc: "/img/card/card-emp.png",
      btnText: "Apply Dark Card",
      onClick: () => {
        location.href = "/home/new-apply?type=dark"
      },
    },
    {
      id: 2,
      title: "Blue Card",
      subtitle: "Require-KYC|5$|1.99%|4999$ Limit Peer Month",
      imgSrc: "/img/card/card-bg-1.webp",
      btnText: "Apply Blue Card",
      onClick: () => {
        location.href = "/home/new-apply?type=blue"
      },
    },
    {
      id: 3,
      title: "Red Card",
      subtitle: "Require-KYC|100$|1.99%|49999$ Limit Peer Month",
      imgSrc: "/img/card/card-bg-2.jpg",
      btnText: "Apply Red card",
      onClick: () => {
        location.href = "/home/new-apply?type=red"
      },
    },
  ];

  return (
    <div>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 justify-items-center">
        <div className="w-full max-w-md mx-auto py-8">
      <h2 className="text-2xl font-bold text-white mb-4">Apply new card</h2>
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
                  h-52
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
                      <div className="w-full">
                        <p className="text-gray-300 text-sm mt-1 w-full flex flex-row-reverse">
                          {card.subtitle.split("|")[0]}
                        </p>
                        <p className="text-gray-300 text-sm mt-1 w-full flex flex-row-reverse">
                          {card.subtitle.split("|")[1]} Apply
                        </p>
                        <p className="text-gray-300 text-sm mt-1 w-full flex flex-row-reverse">
                          {card.subtitle.split("|")[2]} Fee
                        </p>

                        <p className="text-gray-300 text-sm mt-1">
                          {card.subtitle.split("|")[3]??""}
                        </p>
                      </div>
                    )}
                  </div>

                    <div className="w-full flex flex-row-reverse">
                      {(card.btnText&&expanded) && (
                        <button
                          onClick={card.onClick}
                          className="bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-md w-max"
                        >
                          {card.btnText}
                        </button>
                      )}
                    </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
