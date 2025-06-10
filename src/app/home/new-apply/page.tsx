'use client';
import React, { useEffect, useRef, useState } from "react";
import { generateQRCodeBase64 } from "utils/qr";
import { SendTransactionRequest, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import {TonConnectButton} from "@tonconnect/ui-react";
import TonWeb from 'tonweb';
import Image from 'next/image';
import Link from 'next/link';

import { useRouter, useSearchParams } from "next/navigation";
import config from "core/config";
import { api_user_info, api_user_info_update } from "core/api";
import { getBal } from "core/ton";
import { getUserId } from "core/storage";
import { useDisclosure } from "@chakra-ui/react";
import Card from "components/card";
import { sleep } from "core/utils";

const Dashboard = () => {

  const searchParams = useSearchParams();

  const cardType = searchParams.get("type");

  const id = searchParams.get("id");

  const [from, setFrom] = useState("SOL");

  const [to, setTo] = useState("TON");
  const [invoiceId , setInvoiceId] = useState("")
  const [tonConnectUi] = useTonConnectUI();

  const [initLock , setInitLock] = useState(false)
  const [phone, setPhone] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [email, setEmail] = useState('');
  const [firstName,setFirstName]= useState('');
  const [lastName,setLastName]= useState('');
  const [holderRegion, setHolderRegion] = useState('HK');
  const [holderZipcode, setHolderZipcode] = useState('');
  const [holderCity, setHolderCity] = useState('');
  const [holderDetails, setHolderDetails] = useState('');

  const { open:pendingOpen, onOpen:onPendingOpen, onClose:onPendingClose } = useDisclosure()

  const countries = config.region;
  const bRef = useRef<any>(null);

  const wallet = useTonWallet();

  useEffect(() => {
    // onPendingOpen()
    const init = async () => {
      const data = await api_user_info()
      console.log(data)
      if(data && data.data)
      {
        let d = data.data
        setPhoneCode(d.mobile.nation_code)
        setPhone(d.mobile.mobile)
        setEmail(d.email)
        setFirstName(d.first_name)
        setLastName(d.last_name)
        setHolderRegion(d.region);

        let add = d.address.split("|");
        if(add[0])
        {
          setHolderZipcode(add[0]);
        }
        if(add[1])
        {
          setHolderCity(add[1])
        }

        if(add[2])
        {
          setHolderDetails(add[2])
        }
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
  }, [invoiceId,wallet,from,to]); 


  const apply = async() =>
  {
    if(!wallet)
    {
      tonConnectUi.openModal()
    }else{
      //Submit the address to server and generate invoice id
      await updateHolderInfo()
      //Submit the invoice id on chain .
      await applyNewCardPayment()
      onPendingOpen();
      await sleep(20000);
      onPendingClose();
      location.href="/home/card"
    }
  }

const updateHolderInfo=async()=>
{
      const infoUpdate = await api_user_info_update(
        {
          first_name:firstName,
          last_name:lastName,
          birth:"2001-12-20",
          email,
          mobile: {
              nation_code:phoneCode,
              mobile:phone
          },
          region:holderRegion,
          address:`${holderZipcode}|${holderCity}|${holderDetails}`
        }
      )
      console.log(infoUpdate)
      return infoUpdate
}

const applyNewCardPayment = async()=>
{
      // const id = Number(getUserId()).toString(36)+config.card[cardType].id.toString(32);
      // console.log(id)
      const cell = new TonWeb.boc.Cell();
      cell.bits.writeUint(0, 32);
      cell.bits.writeString(id);
      const boc = await cell.toBoc(false);
      const payload = TonWeb.utils.bytesToBase64(boc);
      const tx: SendTransactionRequest = {
      validUntil: Math.floor(Date.now() / 1000) + 600,
       messages: [
          {
            address: "UQAjAbN4GR4fjtIccYkhBg50grTv6xEFhT0CAYr-BYLmZVse",
            amount: Number(config.card[cardType].applyFee*1e9).toFixed(0),
            payload: payload
          },
        ],
      };

    return tonConnectUi.sendTransaction(tx)
}
  return (
    <div>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray" style={{
            display : pendingOpen?"block":"none",
            backgroundColor:"transparent"
        }}>
            <div className="bg-gray-300/70 p-6 rounded-xl shadow-lg h-full flex items-center justify-center">
            <div style={{maxWidth:"600px" , minWidth:"400px"}}>
                <Card extra="rounded-[20px] p-3"  onClick={(e:any) => e.stopPropagation()}>
                    <section className="items-center py-2">
                        <p className="grow text-center font-bold">Transaction Pending ...</p>
                        <p className="grow text-center font-bold">Please wait for transaction confirm ...</p>
                    </section>
                </Card>
            </div>
            </div>
        </div>
      <div className="w-full max-w-md mx-auto py-8 flex justify-center items-center ">
       <h2 className="text-2xl font-bold text-white mb-4 flex"> Apply&nbsp;<span className="text-3xl" style={{color:config.card[cardType].color}}> {cardType.toUpperCase()}</span>&nbsp;Card</h2>
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

          <div style={{ marginBottom: '24px' }}>
              <label
                htmlFor="holder"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                {"Holder"}
                <span style={{ marginLeft: '4px' }}>*</span>
              </label>
              <div className="w-full flex">
              <input
                id="holder"
                type="text"
                placeholder="First Name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
                            <input
                id="holder"
                type="text"
                placeholder="Last name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label
                htmlFor="phone"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                {"Phone Number"}
                <span style={{ marginLeft: '4px' }}>*</span>
              </label>
              <div className="w-full flex">
              <input
                id="phoneCode"
                type="text"
                placeholder="852"
                required
                value={phoneCode}
                onChange={(e) => setPhoneCode(e.target.value)}
                style={{
                  width: '20%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: 500,
                  borderRadius: '8px',
                  border: `1px solid`,
                  boxSizing: 'border-box',
                   color:"black"
                }}
              />
              <input
                id="phone"
                type="text"
                placeholder="Phone Number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  width: '80%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: 500,
                  borderRadius: '8px',
                  border: `1px solid`,
                  boxSizing: 'border-box',
                   color:"black"
                }}
              />
              </div>
            </div>

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
                {"Email"}
                <span style={{ marginLeft: '4px' }}>*</span>
              </label>
              <input
                id="holder"
                type="text"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <div style={{ flex: 1 }}>
                <label
                  htmlFor="holderRegion"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  {"Address"}
                  <span style={{ marginLeft: '4px' }}>*</span>
                </label>
                {/* <input
                  id="holderRegion"
                  type="text"
                  placeholder={"Region"}
                  required
                  value={holderRegion}
                  onChange={(e) => setHolderRegion(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    border: `1px solid`,
                    boxSizing: 'border-box',
                  }}
                /> */}

                <select
                  id="holderRegion"
                  required
                  value={holderRegion}
                  onChange={(e) => setHolderRegion(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    border: `1px solid`,
                    backgroundColor: '#ffffff',
                    boxSizing: 'border-box',
                    color:"black"
                  }}
                >
                  <option value="" disabled>
                    {'Select Region'}
                  </option>
                  {(Object.keys(countries)).map((country) => (
                    <option key={country} value={country}>
                      {countries[country]}
                    </option>
                  ))}
              </select>
              </div>
              <div style={{ flex: 1 }}>
                <label
                  htmlFor="holderZipcode"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  &nbsp;
                </label>
                <input
                  id="holderZipcode"
                  type="text"
                  placeholder={"PostCode"}
                  required
                  value={holderZipcode}
                  onChange={(e) => setHolderZipcode(e.target.value)}
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
              <div style={{ flex: 1 }}>
                <label
                  htmlFor="holderCity"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  &nbsp;
                </label>
                <input
                  id="holderCity"
                  type="text"
                  placeholder={"City"}
                  required
                  value={holderCity}
                  onChange={(e) => setHolderCity(e.target.value)}
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
            </div>

            <div style={{ marginBottom: '24px' }}>
              <input
                id="holderDetails"
                type="text"
                placeholder={"Stree"}
                required
                value={holderDetails}
                onChange={(e) => setHolderDetails(e.target.value)}
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
              onClick={apply}
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
              {`Apply with ${config.card[cardType].applyFee} TON`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
