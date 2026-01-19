import React, { useEffect, useState } from "react";
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

export const CustomPieChart = ({ chartData, colors }) => {
    const [total, setTotal] = useState(0);

    const percentageConverter = (amount, total) => {
        return ((amount / total) * 100).toFixed(2) + "%";
    };

    useEffect(() => {
        if (!chartData) {
            return;
        }

        const sum = chartData.reduce((acc, item) => acc + item.amount, 0);
        setTotal(sum);
    }, [chartData]);

    return (
        <ResponsiveContainer width="100%" height="100%" className="pb-6">
            <PieChart>
                <Pie data={chartData} dataKey="amount">
                    {chartData.map((item, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                </Pie>
                <Tooltip
                    formatter={(amount, name) => [
                        percentageConverter(amount, total),
                        name,
                    ]}
                />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};
