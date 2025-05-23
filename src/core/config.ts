const config =  {
    storage:{
        baseTag:"tonscredit_",
        router:{
            auth:"auth",
            user:"user",
        }
    },
    api:{
        baseUrl:"https://api.tons.credit",
        router:{
            login:"/user/login",
            info:"/user/info",
            card:"/user/card",
        }
    },
    card:{
        dark:{
            id:0,
            name:"DARK CARD",
            color:"black",
            feeRate:"2.99%",
            applyFee:5.99,
            monthFee:0.1,
            img:"/img/card/card-emp.png",
            feeLimit:"100/TX , 1000/D , 2000/M"
        },
        blue:{
            id:1,
            color:"blue",
            name:"BLUE CARD",
            feeRate:"1.99%",
            applyFee:2.99,
            monthFee:0.1,
            img:"/img/card/card-bg-1.webp",
            feeLimit:"1000/TX , 10000/D , 20000/M"
        },
        red:{
            id:2,
            color:"red",
            name:"RED CARD",
            feeRate:"1.89%",
            applyFee:9.99,
            monthFee:0.1,
            img:"/img/card/card-bg-2.jpg",
            feeLimit:"10000/TX , 100000/D , 500000/M"
            }
        },
        vault:{
            ton:"UQAjAbN4GR4fjtIccYkhBg50grTv6xEFhT0CAYr-BYLmZVse",
        },
        chains:[
        // {
        //     name:"SOL",
        //     id:"SOL",
        //     img:"/img/chains/sol.png",
        //     scan:{
        //         base:"https://solscan.io/",
        //         account:"account",
        //         tx:"tx"
        //     }
        // },
        {
            name:"TON",
            id:"TON",
            img:"/img/chains/ton.png",
            decimal:9,
            scan:{
                base:"https://tonscan.org/",
                account:"address",
                tx:"tx"
            }
        },
        {
            name:"USDT",
            id:"TONUSDT",
            img:"/img/chains/usdt.png",
            address:"EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs",
            decimal:6,
            scan:{
                base:"https://tonscan.org/",
                account:"address",
                tx:"tx"
            }
        },
        {
            name:"DOGS",
            id:"TONDOGS",
            img:"/img/coins/dogs.png",
            address:"EQCvxJy4eG8hyHBFsZ7eePxrRsUQSFE_jpptRAYBmcG_DOGS",
            decimal:6,
            scan:{
                base:"https://tonscan.org/",
                account:"address",
                tx:"tx"
            }
        },
        // {
        //     name:"ETH",
        //     id:"ETH",
        //     img:"/img/chains/eth.png",
        //     scan:{
        //         base:"https://etherscan.io/",
        //         account:"address",
        //         tx:"tx"
        //     }
        // },
        // {
        //     name:"BTC",
        //     id:"BTC",
        //     img:"/img/chains/btc.png",
        //     scan:{
        //         base:"https://mempool.space/",
        //         account:"address",
        //         tx:"tx"
        //     }
        // },
        // {
        //     name:"LTC",
        //     id:"LTC",
        //     img:"/img/chains/ltc.png",
        //     scan:{
        //         base:"https://litecoinspace.org/",
        //         account:"address",
        //         tx:"tx"
        //     }
        // },
        // {
        //     name:"BCH",
        //     id:"BCH",
        //     img:"/img/chains/bch.png",
        //     scan:{
        //         base:"https://explorer.bitcoinunlimited.info/",
        //         account:"address",
        //         tx:"tx"
        //     }
        // },
        // {
        //     name:"ARB",
        //     id:"ARB",
        //     img:"/img/chains/arb.png",
        //     scan:{
        //         base:"https://arbiscan.io/",
        //         account:"address",
        //         tx:"tx"
        //     }
        // },
        // {
        //     name:"BNB",
        //     id:"BNB",
        //     img:"/img/chains/bnb.png",
        //     scan:{
        //         base:"https://bscscan.com/",
        //         account:"address",
        //         tx:"tx"
        //     }
        // },
        // {
        //     name:"TRX",
        //     id:"TRX",
        //     img:"/img/chains/trx.png",
        //     scan:{
        //         base:"https://tronscan.org/#/",
        //         account:"address",
        //         tx:"transaction"
        //     }
        // },
        // {
        //     name:"XMR",
        //     id:"XMR",
        //     img:"/img/chains/xmr.png",
        //     scan:{
        //         base:"https://xmrscan.org/",
        //         account:"address",
        //         tx:"tx"
        //     }
        // },
        // {
        //     name:"AVAX",
        //     id:"AVAX",
        //     img:"/img/chains/avax.png",
        //     scan:{
        //         base:"https://snowtrace.io/",
        //         account:"address",
        //         tx:"tx"
        //     }
        // },
        // {
        //     name:"BSCUSDT",
        //     id:"USDTBSC",
        //     img:"/img/chains/usdt.png",
        //     scan:{
        //         base:"https://bscscan.com/",
        //         account:"address",
        //         tx:"tx"
        //     }
        // },
        // {
        //     name:"TRXUSDT",
        //     id:"USDTTRX",
        //     img:"/img/chains/usdt.png",
        //     scan:{
        //         base:"https://tronscan.org/#/",
        //         account:"address",
        //         tx:"transaction"
        //     }
        // },
        // {
        //     name:"ETHDAI",
        //     id:"DAIETH",
        //     img:"/img/chains/dai.png",
        //     scan:{
        //         base:"https://etherscan.io/",
        //         account:"address",
        //         tx:"tx"
        //     }
        // },
    ],
    region:{
            "AF": "Afghanistan",
            "AX": "Aland Islands",
            "AL": "Albania",
            "DZ": "Algeria",
            "AS": "American Samoa",
            "AD": "Andorra",
            "AO": "Angola",
            "AI": "Anguilla",
            "AQ": "Antarctica",
            "AG": "Antigua And Barbuda",
            "AR": "Argentina",
            "AM": "Armenia",
            "AW": "Aruba",
            "AU": "Australia",
            "AT": "Austria",
            "AZ": "Azerbaijan",
            "BS": "Bahamas",
            "BH": "Bahrain",
            "BD": "Bangladesh",
            "BB": "Barbados",
            "BY": "Belarus",
            "BE": "Belgium",
            "BZ": "Belize",
            "BJ": "Benin",
            "BM": "Bermuda",
            "BT": "Bhutan",
            "BO": "Bolivia",
            "BA": "Bosnia And Herzegovina",
            "BW": "Botswana",
            "BV": "Bouvet Island",
            "BR": "Brazil",
            "IO": "British Indian Ocean Territory",
            "BN": "Brunei Darussalam",
            "BG": "Bulgaria",
            "BF": "Burkina Faso",
            "BI": "Burundi",
            "KH": "Cambodia",
            "CM": "Cameroon",
            "CA": "Canada",
            "CV": "Cape Verde",
            "KY": "Cayman Islands",
            "CF": "Central African Republic",
            "TD": "Chad",
            "CL": "Chile",
            "CN": "China",
            "CX": "Christmas Island",
            "CC": "Cocos (Keeling) Islands",
            "CO": "Colombia",
            "KM": "Comoros",
            "CG": "Congo",
            "CD": "Congo, Democratic Republic",
            "CK": "Cook Islands",
            "CR": "Costa Rica",
            "CI": "Cote D\"Ivoire",
            "HR": "Croatia",
            "CU": "Cuba",
            "CY": "Cyprus",
            "CZ": "Czech Republic",
            "DK": "Denmark",
            "DJ": "Djibouti",
            "DM": "Dominica",
            "DO": "Dominican Republic",
            "EC": "Ecuador",
            "EG": "Egypt",
            "SV": "El Salvador",
            "GQ": "Equatorial Guinea",
            "ER": "Eritrea",
            "EE": "Estonia",
            "ET": "Ethiopia",
            "FK": "Falkland Islands (Malvinas)",
            "FO": "Faroe Islands",
            "FJ": "Fiji",
            "FI": "Finland",
            "FR": "France",
            "GF": "French Guiana",
            "PF": "French Polynesia",
            "TF": "French Southern Territories",
            "GA": "Gabon",
            "GM": "Gambia",
            "GE": "Georgia",
            "DE": "Germany",
            "GH": "Ghana",
            "GI": "Gibraltar",
            "GR": "Greece",
            "GL": "Greenland",
            "GD": "Grenada",
            "GP": "Guadeloupe",
            "GU": "Guam",
            "GT": "Guatemala",
            "GG": "Guernsey",
            "GN": "Guinea",
            "GW": "Guinea-Bissau",
            "GY": "Guyana",
            "HT": "Haiti",
            "HM": "Heard Island & Mcdonald Islands",
            "VA": "Holy See (Vatican City State)",
            "HN": "Honduras",
            "HK": "Hong Kong",
            "HU": "Hungary",
            "IS": "Iceland",
            "IN": "India",
            "ID": "Indonesia",
            "IR": "Iran, Islamic Republic Of",
            "IQ": "Iraq",
            "IE": "Ireland",
            "IM": "Isle Of Man",
            "IL": "Israel",
            "IT": "Italy",
            "JM": "Jamaica",
            "JP": "Japan",
            "JE": "Jersey",
            "JO": "Jordan",
            "KZ": "Kazakhstan",
            "KE": "Kenya",
            "KI": "Kiribati",
            "KR": "Korea",
            "KP": "North Korea",
            "KW": "Kuwait",
            "KG": "Kyrgyzstan",
            "LA": "Lao People\"s Democratic Republic",
            "LV": "Latvia",
            "LB": "Lebanon",
            "LS": "Lesotho",
            "LR": "Liberia",
            "LY": "Libyan Arab Jamahiriya",
            "LI": "Liechtenstein",
            "LT": "Lithuania",
            "LU": "Luxembourg",
            "MO": "Macao",
            "MK": "Macedonia",
            "MG": "Madagascar",
            "MW": "Malawi",
            "MY": "Malaysia",
            "MV": "Maldives",
            "ML": "Mali",
            "MT": "Malta",
            "MH": "Marshall Islands",
            "MQ": "Martinique",
            "MR": "Mauritania",
            "MU": "Mauritius",
            "YT": "Mayotte",
            "MX": "Mexico",
            "FM": "Micronesia, Federated States Of",
            "MD": "Moldova",
            "MC": "Monaco",
            "MN": "Mongolia",
            "ME": "Montenegro",
            "MS": "Montserrat",
            "MA": "Morocco",
            "MZ": "Mozambique",
            "MM": "Myanmar",
            "NA": "Namibia",
            "NR": "Nauru",
            "NP": "Nepal",
            "NL": "Netherlands",
            "AN": "Netherlands Antilles",
            "NC": "New Caledonia",
            "NZ": "New Zealand",
            "NI": "Nicaragua",
            "NE": "Niger",
            "NG": "Nigeria",
            "NU": "Niue",
            "NF": "Norfolk Island",
            "MP": "Northern Mariana Islands",
            "NO": "Norway",
            "OM": "Oman",
            "PK": "Pakistan",
            "PW": "Palau",
            "PS": "Palestinian Territory, Occupied",
            "PA": "Panama",
            "PG": "Papua New Guinea",
            "PY": "Paraguay",
            "PE": "Peru",
            "PH": "Philippines",
            "PN": "Pitcairn",
            "PL": "Poland",
            "PT": "Portugal",
            "PR": "Puerto Rico",
            "QA": "Qatar",
            "RE": "Reunion",
            "RO": "Romania",
            "RU": "Russian Federation",
            "RW": "Rwanda",
            "BL": "Saint Barthelemy",
            "SH": "Saint Helena",
            "KN": "Saint Kitts And Nevis",
            "LC": "Saint Lucia",
            "MF": "Saint Martin",
            "PM": "Saint Pierre And Miquelon",
            "VC": "Saint Vincent And Grenadines",
            "WS": "Samoa",
            "SM": "San Marino",
            "ST": "Sao Tome And Principe",
            "SA": "Saudi Arabia",
            "SN": "Senegal",
            "RS": "Serbia",
            "SC": "Seychelles",
            "SL": "Sierra Leone",
            "SG": "Singapore",
            "SK": "Slovakia",
            "SI": "Slovenia",
            "SB": "Solomon Islands",
            "SO": "Somalia",
            "ZA": "South Africa",
            "GS": "South Georgia And Sandwich Isl.",
            "ES": "Spain",
            "LK": "Sri Lanka",
            "SD": "Sudan",
            "SR": "Suriname",
            "SJ": "Svalbard And Jan Mayen",
            "SZ": "Swaziland",
            "SE": "Sweden",
            "CH": "Switzerland",
            "SY": "Syrian Arab Republic",
            "TW": "Taiwan",
            "TJ": "Tajikistan",
            "TZ": "Tanzania",
            "TH": "Thailand",
            "TL": "Timor-Leste",
            "TG": "Togo",
            "TK": "Tokelau",
            "TO": "Tonga",
            "TT": "Trinidad And Tobago",
            "TN": "Tunisia",
            "TR": "Turkey",
            "TM": "Turkmenistan",
            "TC": "Turks And Caicos Islands",
            "TV": "Tuvalu",
            "UG": "Uganda",
            "UA": "Ukraine",
            "AE": "United Arab Emirates",
            "GB": "United Kingdom",
            "US": "United States",
            "UM": "United States Outlying Islands",
            "UY": "Uruguay",
            "UZ": "Uzbekistan",
            "VU": "Vanuatu",
            "VE": "Venezuela",
            "VN": "Vietnam",
            "VG": "Virgin Islands, British",
            "VI": "Virgin Islands, U.S.",
            "WF": "Wallis And Futuna",
            "EH": "Western Sahara",
            "YE": "Yemen",
            "ZM": "Zambia",
            "ZW": "Zimbabwe"
            }
}

export default config


function getCardById(id:number)
{
    for(let i in config.card)
    {
        if(config.card[i].id == id)
        {
            return config.card[i];
        }
    }
    return false;
}

const getChain = (id:string) =>
{
    for(let i in config.chains)
    {
        let e = config.chains[i];
        if(e.id.toUpperCase() == id.toUpperCase())
        {
            return e
        }
    }
    return false;
}
export {
    getCardById,
    getChain
}