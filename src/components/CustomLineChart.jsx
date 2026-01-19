import React from "react";
import {
    LineChart,
    Line,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import { moneyFormatConverter } from "../util/Util";
import { PieChart } from "lucide-react";

export const CustomLineChart = ({ chartData }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width="100%"
                height="100%"
                data={chartData}
                margin={{ right: 50, left: 10 }}
            >
                <YAxis
                    width={100}
                    tickFormatter={(value) => moneyFormatConverter(value)}
                />
                <XAxis dataKey="month" reversed />
                <CartesianGrid />

                <Tooltip
                    formatter={(amount, name) => [
                        moneyFormatConverter(amount),
                        name,
                    ]}
                />

                <Line
                    stroke="#016630"
                    strokeWidth={3}
                    type="monotone"
                    dataKey="totalAmount"
                    name="Giá trị giao dịch"
                />
            </LineChart>
        </ResponsiveContainer>
    );
};
