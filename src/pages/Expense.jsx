import React, { useEffect, useState } from "react";
import { Dashboard } from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import AxiosConfig from "../util/AxiosConfig";
import { API_ENDPOINTS } from "../util/ApiEndpoints";
import { toast } from "react-toastify";
import { Modal } from "../components/Modal";
import { DeleteAlert } from "../components/DeleteAlert";
import { ExpenseList } from "../components/ExpenseList";
import { ExpenseOverview } from "../components/ExpenseOverview";
import { AddExpenseForm } from "../components/AddExpenseForm";

export const Expense = () => {
    useUser();
    const [expenseData, setExpenseData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [openUpdateExpenseModal, setOpenUpdateExpenseModal] = useState({
        show: false,
        data: null,
    });
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

    const fetchExpenseDetails = async () => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);

        try {
            const response = await AxiosConfig.get(
                API_ENDPOINTS.GET_ALL_EXPENSES,
            );
            if (response.status === 200) {
                setExpenseData(response.data);
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

    const fetchIcomeCategories = async () => {
        try {
            const response = await AxiosConfig.get(
                API_ENDPOINTS.GET_CATEGORY_BY_TYPE("expense"),
            );

            if (response.status === 200) {
                setCategories(response.data);
            }
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Không thể tải dữ liệu",
            );
        }
    };

    const handleAddExpense = async (expense) => {
        const { name, amount, date, icon, categoryId } = expense;

        if (!name.trim()) {
            toast.error("Tên giao dịch không được để trống");
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) < 1000) {
            toast.error("Mệnh giá cần phải lớn hơn 1000đ");
            return;
        }

        if (!date) {
            toast.error("Ngày giao dịch không được để trống");
            return;
        }

        const today = new Date().toISOString().split("T")[0];
        if (date > today) {
            toast.error("Ngày giao dịch không thể ở tương lai");
            return;
        }

        if (!categoryId) {
            toast.error("Vui lòng chọn danh mục");
            return;
        }

        try {
            const response = await AxiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId,
            });

            if (response.status === 201) {
                setOpenAddExpenseModal(false);
                toast.success("Thêm giao dịch thành công");
                fetchExpenseDetails();
            }
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Không thể thêm dữ liệu",
            );
        }
    };

    const handleUpdateExpense = async (expense) => {
        const { name, amount, date, icon, categoryId } = expense;

        if (!name.trim()) {
            toast.error("Tên giao dịch không được để trống");
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) < 1000) {
            toast.error("Mệnh giá cần phải lớn hơn 1000đ");
            return;
        }

        if (!date) {
            toast.error("Ngày giao dịch không được để trống");
            return;
        }

        const today = new Date().toISOString().split("T")[0];
        if (date > today) {
            toast.error("Ngày giao dịch không thể ở tương lai");
            return;
        }

        if (!categoryId) {
            toast.error("Vui lòng chọn danh mục");
            return;
        }

        try {
            const response = await AxiosConfig.put(
                API_ENDPOINTS.UPDATE_DELETE_EXPENSE(expense.id),
                {
                    name,
                    amount: Number(amount),
                    date,
                    icon,
                    categoryId,
                },
            );

            if (response.status === 200) {
                setOpenUpdateExpenseModal({ show: false, data: null });
                toast.success("Sửa giao dịch thành công");
                fetchExpenseDetails();
            }
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Không thể thêm dữ liệu",
            );
        }
    };

    const deleteExpense = async (id) => {
        try {
            await AxiosConfig.delete(API_ENDPOINTS.UPDATE_DELETE_EXPENSE(id));
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Xóa giao dịch thành công");
            fetchExpenseDetails();
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Không thể xóa dữ liệu",
            );
        }
    };

    const handleDownloadExpenseDetails = async () => {
        try {
            // Trả về binary data (blob) => download file
            const response = await AxiosConfig.get(
                API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD,
                { responseType: "blob" },
            );

            // Tên file
            let filename = "ChiTiet_ChiTieu.xlsx";
            // Đường dẫn cho thẻ link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            // Tạo thẻ a và gán href là và attribute download
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            // Click xong xóa thẻ a và url đi
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);

            toast.success("Tải dữ liệu thành công");
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Không thể tải xuống dữ liệu",
            );
        }
    };

    const handleEmailExpenseDetails = async () => {
        try {
            const response = await AxiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
            if (response.status === 200) {
                toast.success("Gửi email thành công");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Không thể gửi email");
        }
    };

    useEffect(() => {
        fetchExpenseDetails();
        fetchIcomeCategories();
    }, []);

    return (
        <Dashboard activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        {/* Overview cho thu nhập cùng với biểu đồ */}
                        <ExpenseOverview
                            transactions={expenseData}
                            onAddExpense={() => setOpenAddExpenseModal(true)}
                        />
                    </div>

                    <ExpenseList
                        transactions={expenseData}
                        onDelete={(id) =>
                            setOpenDeleteAlert({ show: true, data: id })
                        }
                        onUpdate={(expense) => {
                            setOpenUpdateExpenseModal({
                                show: true,
                                data: expense,
                            });
                        }}
                        onDownload={handleDownloadExpenseDetails}
                        onEmail={handleEmailExpenseDetails}
                    />

                    {/* Modal thêm chi tiêu */}
                    <Modal
                        isOpen={openAddExpenseModal}
                        onClose={() => setOpenAddExpenseModal(false)}
                        title="Thêm chi tiêu"
                    >
                        <AddExpenseForm
                            onAddExpense={(expense) =>
                                handleAddExpense(expense)
                            }
                            categories={categories}
                        />
                    </Modal>

                    {/* Modal sửa chi tiêu */}
                    <Modal
                        isOpen={openUpdateExpenseModal.show}
                        onClose={() =>
                            setOpenUpdateExpenseModal({
                                show: false,
                                data: null,
                            })
                        }
                        title="Sửa chi tiêu"
                    >
                        <AddExpenseForm
                            onAddExpense={(expense) =>
                                handleUpdateExpense(expense)
                            }
                            categories={categories}
                            initialExpenseData={openUpdateExpenseModal.data}
                            isEditing
                        />
                    </Modal>

                    {/* Modal xóa chi tiêu */}
                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={() =>
                            setOpenDeleteAlert({ show: false, data: null })
                        }
                        title="Xóa giao dịch"
                    >
                        <DeleteAlert
                            content="Bạn có muốn xóa dữ liệu giao dịch này không"
                            onDelete={() => deleteExpense(openDeleteAlert.data)}
                        />
                    </Modal>
                </div>
            </div>
        </Dashboard>
    );
};
