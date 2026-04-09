import React, { useEffect, useState } from "react";
import { Dashboard } from "../components/Dashboard";
import { Plus } from "lucide-react";
import { ScheduleList } from "../components/ScheduleList";
import { useUser } from "../hooks/useUser";
import { API_ENDPOINTS } from "../util/ApiEndpoints";
import AxiosConfig from "../util/AxiosConfig";
import { Modal } from "../components/Modal";
import { AddScheduleForm } from "../components/AddScheduleForm";
import { toast } from "react-toastify";
import { DeleteAlert } from "../components/DeleteAlert";

export const Schedule = () => {
    useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [schedules, setSchedules] = useState([]);
    const [openAddScheduleModal, setOpenAddScheduleModal] = useState(false);
    const [openEditScheduleModal, setOpenEditScheduleModal] = useState({
        show: false,
        data: null,
    });
    const [openDeleteScheduleAlert, setOpenDeleteScheduleAlert] = useState({
        show: false,
        data: null,
    });

    const fetchAllSchedules = async () => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);

        try {
            const response = await AxiosConfig.get(
                API_ENDPOINTS.GET_ALL_SCHEDULES,
            );
            if (response.status === 200) {
                setSchedules(response.data);
            }
        } catch (err) {
            console.log(err);
            toast.error(
                err.response?.data?.message || "Thêm lịch trình thất bại!",
            );
        } finally {
            setIsLoading(false);
        }
    };

    const addSchedule = async (schedule) => {
        console.log(schedule);
        const {
            cronExpression,
            name,
            amount,
            icon,
            type,
            categoryId,
            profileId,
        } = schedule;

        if (!amount || isNaN(amount) || Number(amount) < 1000) {
            toast.error("Số tiền phải là số và lớn hơn hoặc bằng 1000đ!");
            return;
        }

        if (
            !cronExpression ||
            !name.trim() ||
            !type ||
            !categoryId ||
            !profileId
        ) {
            toast.error("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        try {
            const response = await AxiosConfig.post(
                API_ENDPOINTS.ADD_SCHEDULE,
                {
                    cronExpression,
                    name,
                    amount: Number(amount),
                    type,
                    categoryId,
                    profileId,
                    icon,
                },
            );
            if (response.status === 201) {
                toast.success("Thêm lịch trình thành công!");
                fetchAllSchedules();
                setOpenAddScheduleModal(false);
            }
        } catch (err) {
            console.log(err);
            toast.error(
                err.response?.data?.message || "Thêm lịch trình thất bại!",
            );
        }
    };

    const updateSchedule = async (schedule) => {
        console.log(schedule);
        const { cronExpression, name, amount, icon, type, categoryId, userId } =
            schedule;

        if (!amount || isNaN(amount) || Number(amount) < 1000) {
            toast.error("Số tiền phải là số và lớn hơn hoặc bằng 1000đ!");
            return;
        }

        if (
            !cronExpression ||
            !name.trim() ||
            !type ||
            !categoryId ||
            !userId
        ) {
            toast.error("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        try {
            const response = await AxiosConfig.put(
                API_ENDPOINTS.UPDATE_DELETE_SCHEDULE(schedule.id),
                {
                    cronExpression,
                    name,
                    amount: Number(amount),
                    type,
                    categoryId,
                    userId,
                    icon,
                },
            );
            if (response.status === 200) {
                toast.success("Cập nhật lịch trình thành công!");
                fetchAllSchedules();
                setOpenEditScheduleModal({ show: false, data: null });
            }
        } catch (err) {
            console.log(err);
            toast.error(
                err.response?.data?.message || "Cập nhật lịch trình thất bại!",
            );
        }
    };

    const deleteSchedule = async (id) => {
        try {
            const response = await AxiosConfig.delete(
                API_ENDPOINTS.UPDATE_DELETE_SCHEDULE(id),
            );
            if (response.status === 204) {
                toast.success("Xóa lịch trình thành công!");
                fetchAllSchedules();
                setOpenDeleteScheduleAlert({ show: false, data: null });
            }
        } catch (err) {
            console.log(err);
            toast.error(
                err.response?.data?.message || "Xóa lịch trình thất bại!",
            );
        }
    };

    useEffect(() => {
        fetchAllSchedules();
    }, []);

    return (
        <Dashboard activeMenu="Schedule">
            <div className="my-5 mx-auto">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-semibold">
                        Tất cả lịch trình
                    </h2>
                    <button
                        className="main-btn"
                        onClick={() => setOpenAddScheduleModal(true)}
                    >
                        <Plus size={15} className="text-lg mr-1" /> Thêm lịch
                        trình
                    </button>
                </div>

                <ScheduleList
                    schedules={schedules}
                    onEditSchedule={(schedule) =>
                        setOpenEditScheduleModal({ show: true, data: schedule })
                    }
                    onRemoveSchedule={(id) =>
                        setOpenDeleteScheduleAlert({ show: true, data: id })
                    }
                />

                <Modal
                    isOpen={openAddScheduleModal}
                    onClose={() => setOpenAddScheduleModal(false)}
                    title="Thêm lịch trình mới"
                >
                    <AddScheduleForm
                        onAddSchedule={(schedule) => addSchedule(schedule)}
                        isEditing={false}
                    />
                </Modal>

                <Modal
                    isOpen={openEditScheduleModal.show}
                    onClose={() =>
                        setOpenEditScheduleModal({ show: false, data: null })
                    }
                    title="Chỉnh sửa lịch trình"
                >
                    <AddScheduleForm
                        initialScheduleData={openEditScheduleModal.data}
                        onAddSchedule={(updatedSchedule) =>
                            updateSchedule(updatedSchedule)
                        }
                        isEditing={true}
                    />
                </Modal>

                <Modal
                    isOpen={openDeleteScheduleAlert.show}
                    onClose={() =>
                        setOpenDeleteScheduleAlert({ show: false, data: null })
                    }
                    title="Xóa lịch trình"
                >
                    <DeleteAlert
                        content="Bạn có chắc chắn muốn xóa lịch trình này không?"
                        onDelete={() =>
                            deleteSchedule(openDeleteScheduleAlert.data)
                        }
                    />
                </Modal>
            </div>
        </Dashboard>
    );
};
