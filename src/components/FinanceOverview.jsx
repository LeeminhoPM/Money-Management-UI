import React from "react";
import { CustomPieChart } from "./CustomPieChart";

export const FinanceOverview = ({ totalBalance, totalExpense }) => {
    const COLORS = ["#016630", "#9f0712"];
    const data = [
        { name: "Tổng số dư", amount: totalBalance },
        { name: "Tổng chi tiêu", amount: totalExpense },
    ];

    return (
        <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold">Tổng quan</h5>
            </div>

            <CustomPieChart chartData={data} colors={COLORS} />
        </div>
    );
};
