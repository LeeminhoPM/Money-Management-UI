import React, { useEffect, useState } from "react";
import { prepareIncomeChartData } from "../util/Util";
import { CustomLineChart } from "./CustomLineChart";
import { Plus } from "lucide-react";

export const ExpenseOverview = ({ transactions, onAddExpense }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeChartData(transactions);
        setChartData(result);

        return () => {};
    }, [transactions]);

    return (
        <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg font-semibold">
                        Tổng quan chi tiêu
                    </h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Theo dõi và phân tích xu hướng chi tiêu của bạn.
                    </p>
                </div>
                <button onClick={onAddExpense} className="main-btn">
                    <Plus size={15} className="text-lg mr-1" />
                    Thêm chi tiêu
                </button>
            </div>
            <div className="mt-10 h-[50vh]">
                {/* Biểu đồ đường */}
                <CustomLineChart chartData={chartData} />
            </div>
        </div>
    );
};
