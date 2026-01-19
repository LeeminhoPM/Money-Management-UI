import { ArrowRight } from "lucide-react";
import React from "react";
import { TransactionInfoCard } from "./TransactionInfoCard";
import moment from "moment";

export const RecentTransactions = ({ transactions, onMore }) => {
    return (
        <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Giao dịch gần đây</h4>
                <button onClick={onMore} className="main-btn">
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
                                type={transaction.type}
                                categoryName={transaction.categoryName}
                                hideFunctionBtn
                            />
                        ))
                )}
            </div>
        </div>
    );
};
