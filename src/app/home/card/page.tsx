'use client';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import Card from 'components/card';
import {
  Flex,
  useDisclosure,
} from '@chakra-ui/react'
import { config, getChain, getKeys } from "../../../core/config";
import { useEffect, useRef, useState } from "react";
import { formatTime, search_token_by_id, toNoBounceAddress } from "core/utils";
import { generateQRCodeBase64 } from "utils/qr";
import { SendTransactionRequest, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import {TonConnectButton} from "@tonconnect/ui-react";
import TonWeb from 'tonweb';
const Dashboard = () => {

  useEffect(() => {
    const init = async () => {

    }

  }, []);


    const [expanded, setExpanded] = useState(false);
  const cards: any[] = [
    {
      id: 1,
      title: "TON",
      subtitle: "Hello world",
      imgSrc: "/img/card/card-emp.png",
      btnText: "Apply new card",
      onClick: () => {
        alert("Card Management");
      },
    },
    {
      id: 2,
      title: "BTC",
      subtitle: "",
      imgSrc: "/img/card/card-bg-1.webp",
      btnText: "Card Management",
      onClick: () => {
        alert("Connect BTC clicked");
      },
    },
    {
      id: 3,
      title: "ETH",
      subtitle: "",
      imgSrc: "/img/card/card-bg-2.jpg",
      btnText: "Connect ETH",
      onClick: () => {
        alert("Connect ETH clicked");
      },
    },
  ];

  return (
    <div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 justify-items-center">
        
<div className="w-full max-w-md mx-auto py-8">
   <h2 className="text-2xl font-bold text-white mb-4">My Poket</h2>
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
        ))}
      </div>
          {!expanded ? (
            <div
              onClick={() => setExpanded(true)}
              className="mt-2 text-center text-gray-200 cursor-pointer select-none"
            >
              Tap to Expand
            </div>
          ) :
          (
            <div
              onClick={() => setExpanded(false)}
              className="mt-2 text-center text-gray-200 cursor-pointer select-none"
            >
              Tap to Close
            </div>
          )}
    </div>
      </div>
    </div>
  );
};

export default Dashboard;
