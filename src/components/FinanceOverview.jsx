import React from "react";
import { CustomPieChart } from "./CustomPieChart";

export const FinanceOverview = ({ title, chartData }) => {
    const COLORS = [
        "#016630",
        "#9f0712",
        "#f97316",
        "#eab308",
        "#0ea5e9",
        "#9333ea",
    ];
    const total = chartData?.reduce((acc, item) => acc + item.amount, 0) || 0;

    return (
        <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold">{title}</h5>
            </div>

            <CustomPieChart
                chartData={chartData}
                total={total}
                colors={COLORS}
            />
        </div>
    );
};
