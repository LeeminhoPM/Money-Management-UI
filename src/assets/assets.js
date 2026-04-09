import {
    Clock,
    Coins,
    FunnelPlus,
    LayoutDashboard,
    List,
    Wallet,
} from "lucide-react";
import login_bg from "./bg_img.jpg";
import logo from "./logo_img.jpg";

export const assets = {
    login_bg,
    logo,
};

export const SIDE_BAR_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
        text: "Trang chủ",
    },
    {
        id: "02",
        label: "Category",
        icon: List,
        path: "/category",
        text: "Danh mục",
    },
    {
        id: "03",
        label: "Income",
        icon: Wallet,
        path: "/income",
        text: "Thu nhập",
    },
    {
        id: "04",
        label: "Expense",
        icon: Coins,
        path: "/expense",
        text: "Chi tiêu",
    },
    {
        id: "05",
        label: "Schedule",
        icon: Clock,
        path: "/schedule",
        text: "Đặt lịch",
    },
    {
        id: "06",
        label: "Filter",
        icon: FunnelPlus,
        path: "/filter",
        text: "Bộ lọc",
    },
];
