import {
    Pencil,
    Trash2,
    TrendingDown,
    TrendingUp,
    UtensilsCrossed,
} from "lucide-react";
import React from "react";
import { moneyFormatConverter } from "../util/Util";

export const TransactionInfoCard = ({
    icon,
    title,
    date,
    amount,
    type,
    categoryName,
    hideFunctionBtn,
    onDelete,
    onUpdate,
}) => {
    const getAmountStyles = () =>
        type === "income"
            ? "bg-green-50 text-green-800"
            : "bg-red-50 text-red-800";

    return (
        <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
            <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
                {icon ? (
                    <img src={icon} alt="Tiêu đề" className="w-6 h-6" />
                ) : (
                    <UtensilsCrossed className="text-primary" />
                )}
            </div>

            <div className="flex-1 flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-700 font-medium">{title}</p>

                    <p className="text-xs text-gray-400 mt-1">
                        {date}
                        <span className="text-xs text-gray-400">
                            {categoryName ? " - " + categoryName : ""}
                        </span>
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    {!hideFunctionBtn && (
                        <button
                            onClick={onUpdate}
                            className="text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                            <Pencil size={18} />
                        </button>
                    )}
                    {!hideFunctionBtn && (
                        <button
                            onClick={onDelete}
                            className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                            <Trash2 size={18} />
                        </button>
                    )}

                    <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
                    >
                        <h6 className="text-xs font-medium">
                            {type === "income" ? "+" : "-"}{" "}
                            {moneyFormatConverter(amount)}
                        </h6>
                        {type === "income" ? (
                            <TrendingUp size={15} />
                        ) : (
                            <TrendingDown size={15} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
