import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { LogOut, Menu, User, X } from "lucide-react";
import { assets } from "../assets/assets";
import { Sidebar } from "./Sidebar";

export const MenuBar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const dropDownRef = useRef(null);
    const { user, clearUser } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        setShowDropDown(false);
        navigate("/login");
    };

    // Gọi khi mỗi lần showDropDown thay đổi
    useEffect(() => {
        const handleClickOutside = (e) => {
            // Nếu dropdown menu đang mở và người dùng ấn ra ngoài vùng của button dropdown => Đóng dropdown lại
            if (
                dropDownRef.current &&
                !dropDownRef.current.contains(e.target)
            ) {
                setShowDropDown(false);
            }
        };

        // Gán sự kiện mousedown cho hàm
        if (showDropDown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Cleanup effect bằng cách xóa sự kiện mousedown ở trên
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropDown]);

    return (
        <div className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">
            {/* Phần bên trái - Menu và tiêu đề */}
            <div className="flex items-center gap-5">
                <button
                    onClick={() => setOpenSideMenu(!openSideMenu)}
                    className="block lg:hidden text-black hover:bg-gray-100 p-1 transition-colors cursor-pointer"
                >
                    {openSideMenu ? (
                        <X className="text-2xl" />
                    ) : (
                        <Menu className="text-2xl" />
                    )}
                </button>

                <div className="flex items-center gap-2">
                    <img src={assets.logo} alt="logo" className="h-10 w-10 " />
                    <span className="text-lg font-medium text-black truncate">
                        Trợ lý tài chính
                    </span>
                </div>
            </div>

            {/* Phần bên phải - Ảnh đại diện */}
            <div ref={dropDownRef} className="relative">
                <button
                    onClick={() => setShowDropDown(!showDropDown)}
                    className="cursor-pointer flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-0 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                    <User className="text-primary" />
                </button>

                {/* Dropdown menu */}
                {showDropDown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                        {/* Thông tin người dùng */}
                        <div className="px-4 py-3 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                                    <User className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 truncate">
                                        {user?.fullName || "User"}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {user?.email || "user@gmail.com"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Dropdown options */}
                        <div className="py-1">
                            <button
                                onClick={handleLogout}
                                className="cursor-pointer flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                            >
                                <LogOut className="w-4 h-4 text-gray-500" />
                                <span>Đăng xuất</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {/* Mobile */}
            {openSideMenu && (
                <div className="fixed left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20 top-18.25">
                    <Sidebar activeMenu={activeMenu} />
                </div>
            )}
        </div>
    );
};
