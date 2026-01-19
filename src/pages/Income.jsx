import React, { useEffect, useState } from "react";
import { Dashboard } from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import AxiosConfig from "../util/AxiosConfig";
import { API_ENDPOINTS } from "../util/ApiEndpoints";
import { toast } from "react-toastify";
import { IncomeList } from "../components/IncomeList";
import { Modal } from "../components/Modal";
import { AddIncomeForm } from "../components/AddIncomeForm";
import { DeleteAlert } from "../components/DeleteAlert";
import { IncomeOverview } from "../components/IncomeOverview";

export const Income = () => {
    useUser();
    const [incomeData, setIncomeData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [openUpdateIncomeModal, setOpenUpdateIncomeModal] = useState({
        show: false,
        data: null,
    });
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

    const fetchIncomeDetails = async () => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);

        try {
            const response = await AxiosConfig.get(
                API_ENDPOINTS.GET_ALL_INCOMES,
            );
            if (response.status === 200) {
                setIncomeData(response.data);
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
                API_ENDPOINTS.GET_CATEGORY_BY_TYPE("income"),
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

    const handleAddIncome = async (income) => {
        const { name, amount, date, icon, categoryId } = income;

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
            const response = await AxiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId,
            });

            if (response.status === 201) {
                setOpenAddIncomeModal(false);
                toast.success("Thêm giao dịch thành công");
                fetchIncomeDetails();
            }
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Không thể thêm dữ liệu",
            );
        }
    };

    const handleUpdateIncome = async (income) => {
        const { name, amount, date, icon, categoryId } = income;

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
                API_ENDPOINTS.UPDATE_DELETE_INCOME(income.id),
                {
                    name,
                    amount: Number(amount),
                    date,
                    icon,
                    categoryId,
                },
            );

            if (response.status === 200) {
                setOpenUpdateIncomeModal({ show: false, data: null });
                toast.success("Sửa giao dịch thành công");
                fetchIncomeDetails();
            }
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Không thể thêm dữ liệu",
            );
        }
    };

    const deleteIncome = async (id) => {
        try {
            await AxiosConfig.delete(API_ENDPOINTS.UPDATE_DELETE_INCOME(id));
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Xóa giao dịch thành công");
            fetchIncomeDetails();
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Không thể xóa dữ liệu",
            );
        }
    };

    const handleDownloadIncomeDetails = async () => {
        try {
            // Trả về binary data (blob) => download file
            const response = await AxiosConfig.get(
                API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD,
                { responseType: "blob" },
            );

            // Tên file
            let filename = "ChiTiet_ThuNhap.xlsx";
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

    const handleEmailIncomeDetails = async () => {
        try {
            const response = await AxiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
            if (response.status === 200) {
                toast.success("Gửi email thành công");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Không thể gửi email");
        }
    };

    useEffect(() => {
        fetchIncomeDetails();
        fetchIcomeCategories();
    }, []);

    return (
        <Dashboard activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        {/* Overview cho thu nhập cùng với biểu đồ */}
                        <IncomeOverview
                            transactions={incomeData}
                            onAddIncome={() => setOpenAddIncomeModal(true)}
                        />
                    </div>

                    <IncomeList
                        transactions={incomeData}
                        onDelete={(id) =>
                            setOpenDeleteAlert({ show: true, data: id })
                        }
                        onUpdate={(income) => {
                            setOpenUpdateIncomeModal({
                                show: true,
                                data: income,
                            });
                        }}
                        onDownload={handleDownloadIncomeDetails}
                        onEmail={handleEmailIncomeDetails}
                    />

                    {/* Modal thêm thu nhập */}
                    <Modal
                        isOpen={openAddIncomeModal}
                        onClose={() => setOpenAddIncomeModal(false)}
                        title="Thêm thu nhập"
                    >
                        <AddIncomeForm
                            onAddIncome={(income) => handleAddIncome(income)}
                            categories={categories}
                        />
                    </Modal>

                    {/* Modal sửa thu nhập */}
                    <Modal
                        isOpen={openUpdateIncomeModal.show}
                        onClose={() =>
                            setOpenUpdateIncomeModal({
                                show: false,
                                data: null,
                            })
                        }
                        title="Sửa thu nhập"
                    >
                        <AddIncomeForm
                            onAddIncome={(income) => handleUpdateIncome(income)}
                            categories={categories}
                            initialIncomeData={openUpdateIncomeModal.data}
                            isEditing
                        />
                    </Modal>

                    {/* Modal xóa thu nhập */}
                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={() =>
                            setOpenDeleteAlert({ show: false, data: null })
                        }
                        title="Xóa thu nhập"
                    >
                        <DeleteAlert
                            content="Bạn có muốn xóa dữ liệu thu nhập này không"
                            onDelete={() => deleteIncome(openDeleteAlert.data)}
                        />
                    </Modal>
                </div>
            </div>
        </Dashboard>
    );
};
