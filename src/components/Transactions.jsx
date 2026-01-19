import { ArrowRight } from "lucide-react";
import React from "react";
import { TransactionInfoCard } from "./TransactionInfoCard";
import moment from "moment";

export const Transactions = ({ transactions, onMore, type, title }) => {
    return (
        <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold">{title}</h5>
                <button className="main-btn" onClick={onMore}>
                    Xem thêm <ArrowRight className="text-base" size={15} />
                </button>
            </div>

            <div className="mt-6">
                {transactions?.length === 0 ? (
                    <p className="text-gray-400">Chưa có giao dịch nào</p>
                ) : (
                    transactions
                        ?.slice(0, 5)
                        ?.map((transaction) => (
                            <TransactionInfoCard
                                key={transaction.id}
                                title={transaction.name}
                                icon={transaction.icon}
                                date={moment(transaction.date).format(
                                    "DD/MM/YYYY",
                                )}
                                amount={transaction.amount}
                                type={type}
                                categoryName={transaction.categoryName}
                                hideFunctionBtn
                            />
                        ))
                )}
            </div>
        </div>
    );
};
