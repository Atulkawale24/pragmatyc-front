import { Icons } from "../constants/sideNavIcons";

export const tabArray = [
  {
    tab: "Todo List",
    route: "/dashboard/todo",
    activeClass: "todo",
    icon: Icons?.dashboardIcon,
  },
  {
    tab: "Dashboard",
    route: "/dashboard/stat",
    activeClass: "stat",
    icon: Icons?.reportsIcon,
  },
];
