'use client';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import Card from 'components/card';
import {
  useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useState } from "react";
const Dashboard = () => {

  useEffect(() => {

  }, []);

  return (
    <div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 justify-items-center">



        <Card extra="rounded-[20px] p-3">
          <div className="flex gap-2.5 justify-center">
                    <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
                      <span className="text-default-900 text-xl font-semibold">
                        👷 Page Building 👷
                      </span>
                    </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
