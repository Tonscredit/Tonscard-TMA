"use client";
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { setAuth, setUserId } from 'core/storage';

export default function Home({}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const uid = searchParams.get("id");
  useEffect(() => {
    console.log(token,uid);
    setAuth(token);
    setUserId(uid);
    if(!token)
    {
      redirect('https://t.me/tonscredit_bot?start=launch');
    }else{
      redirect('/home/card');
    }
    }, []);
}
