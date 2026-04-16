import React from "react";
import { CustomPieChart } from "./CustomPieChart";

export const FinanceOverview = ({ title, chartData }) => {
    const COLORS = [
        "#f97316",
        "#016630",
        "#14b8a6",
        "#f43f5e",
        "#0f766e",
        "#eab308",
        "#0ea5e9",
        "#9333ea",
        "#db2777",
    ];
    const total = chartData?.reduce((acc, item) => acc + item.amount, 0) || 0;

    return (
        <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold">{title}</h5>
            </div>

            {chartData?.length > 0 ? (
                <CustomPieChart
                    chartData={chartData}
                    total={total}
                    colors={COLORS}
                />
            ) : (
                <div className="pt-8">
                    <p className="text-gray-500">
                        Không có dữ liệu để hiển thị
                    </p>
                </div>
            )}
        </div>
    );
};
