import React from 'react';

// Admin Imports

// Icon Imports
import { FaRegCreditCard } from "react-icons/fa6";
import { GiFarmer } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";
import { MdContactSupport } from "react-icons/md";
import { TbBrandGithub } from "react-icons/tb";
const routes = [
  {
    name: 'My Cards',
    layout: '/home',
    path: 'card',
    icon: <FaRegCreditCard className="h-6 w-6" />,
  },
  {
    name: 'History',
    layout: '/home',
    icon: <FaHistory className="h-6 w-6" />,
    path: 'dev',
  },
  {
    name: 'Farm',
    layout: '/home',
    path: 'dev',
    icon: <GiFarmer className="h-6 w-6" />,
    secondary: true,
  },
  {
    name: 'Support',
    layout: '/links',
    path: "http://t.me/TonspaySupport_bot",
    icon: <MdContactSupport className="h-6 w-6" />,
  },
  {
    name: 'Community Channel',
    layout: '/links',
    path: "https://t.me/+GU7hK-z0jVthYjQ1",
    icon: <MdContactSupport className="h-6 w-6" />,
  },
  {
    name: 'Source-Code',
    layout: '/links',
    path: 'https://github.com/Tonscredit',
    icon: <TbBrandGithub className="h-6 w-6" />,
  }
];
export default routes;
