import { Download, LoaderCircle, Mail } from "lucide-react";
import React, { useState } from "react";
import { TransactionInfoCard } from "./TransactionInfoCard";
import moment from "moment";

export const IncomeList = ({
    transactions,
    onUpdate,
    onDelete,
    onDownload,
    onEmail,
}) => {
    const [isEmailLoading, setIsEmailLoading] = useState(false);
    const [isDownloadLoading, setIsDownloadLoading] = useState(false);

    const handleEmail = async () => {
        setIsEmailLoading(true);
        try {
            await onEmail();
        } finally {
            setIsEmailLoading(false);
        }
    };

    const handleDownload = async () => {
        setIsDownloadLoading(true);
        try {
            await onDownload();
        } finally {
            setIsDownloadLoading(false);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold">Nguồn thu nhập</h5>
                <div className="flex items-center justify-end gap-2">
                    <button
                        disabled={isEmailLoading || isDownloadLoading}
                        onClick={handleEmail}
                        className="main-btn"
                    >
                        {isEmailLoading ? (
                            <>
                                <LoaderCircle className="w-4 h-4 animate-spin" />
                                Đang gửi...
                            </>
                        ) : (
                            <>
                                <Mail size={15} className="text-base mr-2" />
                                Email
                            </>
                        )}
                    </button>
                    <button
                        disabled={isEmailLoading || isDownloadLoading}
                        onClick={handleDownload}
                        className="main-btn"
                    >
                        {isDownloadLoading ? (
                            <>
                                <LoaderCircle className="w-4 h-4 animate-spin" />
                                Đang tải...
                            </>
                        ) : (
                            <>
                                <Download
                                    size={15}
                                    className="text-base mr-2"
                                />
                                Tải xuống
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Hiện dữ liệu thu nhập */}
                {transactions?.length === 0 ? (
                    <p className="text-gray-400">Chưa có giao dịch nào</p>
                ) : (
                    transactions.map((income) => (
                        <TransactionInfoCard
                            key={income.id}
                            title={income.name}
                            icon={income.icon}
                            date={moment(income.date).format("DD/MM/YYYY")}
                            amount={income.amount}
                            type="income"
                            categoryName={income.categoryName}
                            onDelete={() => onDelete(income.id)}
                            onUpdate={() => onUpdate(income)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
