import React, { useEffect } from "react";
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

export const CustomPieChart = ({ chartData, total, colors }) => {
    const percentageConverter = (amount) => {
        return ((amount / total) * 100).toFixed(2) + "%";
    };

    useEffect(() => {
        if (!chartData) {
            return;
        }
    }, [chartData]);

    return (
        <ResponsiveContainer width="100%" height={500} className="pb-6">
            <PieChart>
                <Pie data={chartData} dataKey="amount">
                    {chartData?.map((item, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={
                                colors[
                                    index < colors.length
                                        ? index
                                        : index - colors.length
                                ]
                            }
                        />
                    ))}
                </Pie>
                <Tooltip
                    formatter={(amount, name) => [
                        percentageConverter(amount),
                        name,
                    ]}
                />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};
