import React, { useEffect, useState } from "react";
import { Dashboard } from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { InfoCard } from "../components/InfoCard";
import { BanknoteArrowDown, BanknoteArrowUp, Wallet } from "lucide-react";
import { moneyFormatConverter } from "../util/Util";
import { useNavigate } from "react-router-dom";
import AxiosConfig from "../util/AxiosConfig";
import { API_ENDPOINTS } from "../util/ApiEndpoints";
import { toast } from "react-toastify";
import { RecentTransactions } from "../components/RecentTransactions";
import { FinanceOverview } from "../components/FinanceOverview";
import { Transactions } from "../components/Transactions";

export const Home = () => {
    useUser();
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchDashboardData = async () => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);

        try {
            const response = await AxiosConfig.get(
                API_ENDPOINTS.DASHBOARD_DATA,
            );

            if (response.status === 200) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message || "Không thể tải dữ liệu",
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
        return () => {};
    }, []);

    return (
        <Dashboard activeMenu="Dashboard">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InfoCard
                        icon={<Wallet />}
                        label="Tổng số dư"
                        value={moneyFormatConverter(
                            dashboardData?.totalBalance || 0,
                        )}
                        color="bg-primary-dark"
                    />
                    <InfoCard
                        icon={<BanknoteArrowUp />}
                        label="Tổng thu nhập"
                        value={moneyFormatConverter(
                            dashboardData?.totalIncome || 0,
                        )}
                        color="bg-blue-800"
                    />
                    <InfoCard
                        icon={<BanknoteArrowDown />}
                        label="Tổng chi tiêu"
                        value={moneyFormatConverter(
                            dashboardData?.totalExpense || 0,
                        )}
                        color="bg-red-800"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {/* Giao dịch gần đây */}
                    <RecentTransactions
                        transactions={dashboardData?.recentTransactions}
                        onMore={() => navigate("/expense")}
                    />

                    {/* Biểu đồ thu nhập */}
                    <FinanceOverview
                        totalBalance={dashboardData?.totalBalance || 0}
                        totalExpense={dashboardData?.totalExpense || 0}
                    />

                    {/* Thu nhập */}
                    <Transactions
                        transactions={dashboardData?.recent5Incomes || []}
                        onMore={() => navigate("/income")}
                        type="income"
                        title="Thu nhập gần đây"
                    />

                    {/* Chi tiêu */}
                    <Transactions
                        transactions={dashboardData?.recent5Expenses || []}
                        onMore={() => navigate("/expense")}
                        type="expense"
                        title="Chi tiêu gần đây"
                    />
                </div>
            </div>
        </Dashboard>
    );
};
