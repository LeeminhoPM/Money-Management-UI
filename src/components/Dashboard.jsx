import React, { useContext } from "react";
import { MenuBar } from "./MenuBar";
import { AppContext } from "../context/AppContext";
import { Sidebar } from "./Sidebar";

export const Dashboard = ({ children, activeMenu }) => {
    const { user } = useContext(AppContext);
    return (
        <div>
            <MenuBar activeMenu={activeMenu} />
            {user && (
                <div className="flex">
                    <div className="max-[1025px]:hidden">
                        <Sidebar activeMenu={activeMenu} />
                    </div>
                    <div className="grow mx-5">{children}</div>
                </div>
            )}
        </div>
    );
};
