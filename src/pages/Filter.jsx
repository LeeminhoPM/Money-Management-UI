import React, { useEffect, useState } from "react";
import { Dashboard } from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { Search } from "lucide-react";
import AxiosConfig from "../util/AxiosConfig";
import { API_ENDPOINTS } from "../util/ApiEndpoints";
import { toast } from "react-toastify";
import { TransactionInfoCard } from "../components/TransactionInfoCard";
import moment from "moment";
import { useLocation } from "react-router-dom";

export const Filter = () => {
    useUser();
    const [type, setType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [keyword, setKeyword] = useState("");
    const [sortField, setSortField] = useState("date");
    const [sortOrder, setSortOrder] = useState("desc");
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categories, setCategories] = useState([]);

    const location = useLocation();

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await AxiosConfig.post(
                API_ENDPOINTS.APPLY_FILTER,
                {
                    type,
                    startDate,
                    endDate,
                    keyword,
                    sortField,
                    sortOrder,
                },
            );
            if (categoryName) {
                setTransactions(
                    response.data.filter(
                        (transaction) =>
                            transaction.categoryName === categoryName,
                    ),
                );
            } else {
                setTransactions(response.data);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Không tải dữ liệu");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAllTransactions = async () => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);

        try {
            const response = await AxiosConfig.get(API_ENDPOINTS.APPLY_FILTER);
            if (response.status === 200) {
                setTransactions(response.data);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Không tải dữ liệu");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCategoryDetails = async () => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);

        try {
            if (type) {
                const response = await AxiosConfig.get(
                    API_ENDPOINTS.GET_CATEGORY_BY_TYPE(type),
                );
                if (response.status === 200) {
                    setCategories(response.data);
                }
            } else {
                const response = await AxiosConfig.get(
                    API_ENDPOINTS.GET_ALL_CATEGORIES,
                );
                if (response.status === 200) {
                    setCategories(response.data);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Không tải dữ liệu");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllTransactions();
        fetchCategoryDetails();

        return () => {};
    }, [location.pathname]);

    useEffect(() => {
        fetchCategoryDetails();

        return () => {};
    }, [type]);

    return (
        <Dashboard activeMenu="Filter">
            <div className="my-5 mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Bộ lọc giao dịch</h2>
                </div>
                <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-4 mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-semibold">Chọn bộ lọc</h5>
                    </div>
                    <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label
                                htmlFor="type"
                                className="block text-sm font-medium mb-1"
                            >
                                Kiểu
                            </label>
                            <select
                                id={type}
                                className="w-full border rounded px-3 py-2"
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="">Tất cả</option>
                                <option value="income">Thu nhập</option>
                                <option value="expense">Chi tiêu</option>
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="startDate"
                                className="block text-sm font-medium mb-1"
                            >
                                Ngày bắt đầu
                            </label>
                            <input
                                className="w-full border rounded px-3 py-2"
                                type="date"
                                id={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="endDate"
                                className="block text-sm font-medium mb-1"
                            >
                                Ngày kết thúc
                            </label>
                            <input
                                className="w-full border rounded px-3 py-2"
                                type="date"
                                id={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="sortField"
                                className="block text-sm font-medium mb-1"
                            >
                                Xắp xếp theo
                            </label>
                            <select
                                id={sortField}
                                className="w-full border rounded px-3 py-2"
                                onChange={(e) => setSortField(e.target.value)}
                            >
                                <option value="date">Ngày tạo</option>
                                <option value="amount">Mệnh giá</option>
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="sortOrder"
                                className="block text-sm font-medium mb-1"
                            >
                                Thứ tự xắp xếp
                            </label>
                            <select
                                id={sortOrder}
                                className="w-full border rounded px-3 py-2"
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <option value="desc">Từ cao xuống thấp</option>
                                <option value="asc">Từ thấp đến cao</option>
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="categoryName"
                                className="block text-sm font-medium mb-1"
                            >
                                Danh mục
                            </label>
                            <select
                                id={categoryName}
                                className="w-full border rounded px-3 py-2"
                                onChange={(e) =>
                                    setCategoryName(e.target.value)
                                }
                            >
                                <option value="">Tất cả</option>
                                {categories.map((option) => (
                                    <option key={option.id} value={option.name}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="sm:col-span-1 md:col-span-3 flex items-end">
                            <div className="w-full">
                                <label
                                    htmlFor="keyword"
                                    className="block text-sm font-medium mb-1"
                                >
                                    Tìm kiếm
                                </label>
                                <input
                                    id={keyword}
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    className="w-full border rounded px-3 py-2"
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={handleSearch}
                                className="ml-2 p-2 w-fit mb-px bg-primary hover:bg-primary-glow text-white rounded flex items-center justify-center cursor-pointer whitespace-nowrap transition-colors duration-200"
                            >
                                <Search size={20} /> Tìm kiếm
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-semibold">Giao dịch</h5>
                    </div>

                    {transactions.length === 0 && !isLoading ? (
                        <p className="text-gray-500">Chưa có giao dịch nào.</p>
                    ) : (
                        ""
                    )}
                    {isLoading ? (
                        <p className="text-gray-500">Đang tải dữ liệu.</p>
                    ) : (
                        ""
                    )}
                    {transactions.map((transaction) => (
                        <TransactionInfoCard
                            key={transaction.id}
                            title={transaction.name}
                            icon={transaction.icon}
                            date={moment(transaction.date).format("DD/MM/YYYY")}
                            amount={transaction.amount}
                            type={transaction.type}
                            categoryName={transaction.categoryName}
                            hideFunctionBtn
                        />
                    ))}
                </div>
            </div>
        </Dashboard>
    );
};
