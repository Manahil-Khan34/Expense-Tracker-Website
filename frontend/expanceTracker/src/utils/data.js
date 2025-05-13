import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
  } from "react-icons/lu";
  import { IoIosLogOut } from "react-icons/io"; // Use this for logout
  
  export const SIDE_MENU_DATA = [
    {
      id: "01",
      label: "Dashboard",
      icon: LuLayoutDashboard,
      Path: "/dashboard",
    },
    {
      id: "02",
      label: "Income",
      icon: LuWalletMinimal,
      Path: "/income",
    },
    {
      id: "03",
      label: "Expense",
      icon: LuHandCoins,
      Path: "/expance",
    },
    {
      id: "06",
      label: "Logout",
      icon: IoIosLogOut, // Using `IoIosLogOut` for the logout icon
      Path: "/logout",
    },
  ];
  