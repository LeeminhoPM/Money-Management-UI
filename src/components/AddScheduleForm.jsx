import React, { useContext, useEffect, useState } from "react";
import { EmojiPickerPopup } from "./EmojiPickerPopup";
import { Input } from "./Input";
import { LoaderCircle } from "lucide-react";
import { AppContext } from "../context/AppContext";
import AxiosConfig from "../util/AxiosConfig";
import { API_ENDPOINTS } from "../util/ApiEndpoints";
import { toast } from "react-toastify";

export const AddScheduleForm = ({
    onAddSchedule,
    initialScheduleData,
    isEditing,
}) => {
    const { user } = useContext(AppContext);

    const [categories, setCategories] = useState([]);
    const [schedule, setSchedule] = useState({
        cronExpression: "",
        name: "",
        amount: "",
        icon: "",
        type: "income",
        categoryId: "",
        profileId: user.id,
    });
    const [cronBuilder, setCronBuilder] = useState({
        cycle: "daily",
        time: "00:00",
        dayOfWeek: "1",
        dayOfMonth: "1",
    });
    const [isLoading, setIsLoading] = useState(false);

    const typeOptions = [
        { value: "income", label: "Thu nhập" },
        { value: "expense", label: "Chi tiêu" },
    ];
    const cycleOptions = [
        { value: "daily", label: "Hàng ngày" },
        { value: "weekly", label: "Hàng tuần" },
        { value: "monthly", label: "Hàng tháng" },
    ];
    const dayOfWeekOptions = [
        { value: "1", label: "Thứ 2" },
        { value: "2", label: "Thứ 3" },
        { value: "3", label: "Thứ 4" },
        { value: "4", label: "Thứ 5" },
        { value: "5", label: "Thứ 6" },
        { value: "6", label: "Thứ 7" },
        { value: "7", label: "Chủ nhật" },
    ];
    const dayOfMonthOptions = Array.from({ length: 31 }, (_, i) => ({
        value: (i + 1).toString(),
        label: (i + 1).toString(),
    }));

    const buildCronExpression = () => {
        const { cycle, time, dayOfWeek, dayOfMonth } = cronBuilder;
        const [hour, minute] = time.split(":");
        let cronExpression = "";

        switch (cycle) {
            case "daily":
                cronExpression = `0 ${minute} ${hour} * * *`;
                break;
            case "weekly":
                cronExpression = `0 ${minute} ${hour} * * ${dayOfWeek}`;
                break;
            case "monthly":
                cronExpression = `0 ${minute} ${hour} ${dayOfMonth} * *`;
                break;
            default:
                cronExpression = `0 ${minute} ${hour} * * *`;
        }

        return cronExpression;
    };

    const handleCronChange = (key, value) => {
        setCronBuilder((prev) => ({ ...prev, [key]: value }));
    };

    const handleChange = (key, value) => {
        setSchedule((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const fetchCategories = async (type) => {
        try {
            const response = await AxiosConfig.get(
                API_ENDPOINTS.GET_CATEGORY_BY_TYPE(type),
            );

            if (response.status === 200) {
                setCategories(response.data);
                setSchedule((prev) => ({
                    ...prev,
                    categoryId:
                        response.data.length > 0 ? response.data[0].id : "",
                }));
            }
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Không thể tải dữ liệu",
            );
        }
    };

    const handleAddSchedule = async () => {
        setIsLoading(true);
        try {
            const cronExpression = buildCronExpression();
            await onAddSchedule({ ...schedule, cronExpression });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories(schedule.type);
        if (isEditing && initialScheduleData) {
            setSchedule(initialScheduleData);
        }
    }, [isEditing, initialScheduleData, schedule.type]);

    return (
        <div>
            <EmojiPickerPopup
                icon={schedule.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={schedule.name}
                onChange={({ target }) => handleChange("name", target.value)}
                label="Tên giao dịch"
                placeholder="VD: Lương, freelance, thưởng..."
                type="text"
            />

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Kiểu giao dịch"
                    value={schedule.type}
                    onChange={({ target }) => {
                        handleChange("type", target.value);
                        fetchCategories(target.value);
                    }}
                    isSelect={true}
                    options={typeOptions.map((type) => ({
                        value: type.value,
                        label: type.label,
                    }))}
                />

                <Input
                    label="Kiểu giao dịch"
                    value={schedule.type}
                    onChange={({ target }) =>
                        handleChange("categoryId", target.value)
                    }
                    isSelect={true}
                    options={categories.map((category) => ({
                        value: category.id,
                        label: category.name,
                    }))}
                />
            </div>

            <Input
                value={schedule.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Mệnh giá"
                placeholder="VD: 500.000, 200.000..."
                type="number"
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
                <Input
                    label="Kiểu lặp lại"
                    value={cronBuilder.cycle}
                    onChange={({ target }) =>
                        handleCronChange("cycle", target.value)
                    }
                    isSelect={true}
                    options={cycleOptions.map((cycle) => ({
                        value: cycle.value,
                        label: cycle.label,
                    }))}
                />
                <Input
                    value={cronBuilder.time}
                    onChange={({ target }) =>
                        handleCronChange("time", target.value)
                    }
                    label="Giờ lặp lại"
                    placeholder=""
                    type="time"
                />
                <Input
                    label="Ngày trong tuần"
                    value={cronBuilder.dayOfWeek}
                    onChange={({ target }) =>
                        handleCronChange("dayOfWeek", target.value)
                    }
                    isSelect={true}
                    options={dayOfWeekOptions.map((cycle) => ({
                        value: cycle.value,
                        label: cycle.label,
                    }))}
                    isDisabled={
                        cronBuilder.cycle === "daily" ||
                        cronBuilder.cycle === "monthly"
                    }
                />
                <Input
                    value={cronBuilder.dayOfMonth}
                    onChange={({ target }) =>
                        handleCronChange("dayOfMonth", target.value)
                    }
                    label="Ngày trong tháng"
                    isSelect={true}
                    options={dayOfMonthOptions.map((cycle) => ({
                        value: cycle.value,
                        label: cycle.label,
                    }))}
                    isDisabled={
                        cronBuilder.cycle === "daily" ||
                        cronBuilder.cycle === "weekly"
                    }
                />
            </div>

            <div className="flex justify-end mt-6">
                <button
                    disabled={isLoading}
                    onClick={handleAddSchedule}
                    className={`text-white px-3 py-2 font-medium rounded-lg cursor-pointer transition-colors duration-200 ${isEditing ? "bg-blue-600 hover:bg-blue-400" : "bg-primary hover:bg-primary-glow"}`}
                >
                    {isLoading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin" />{" "}
                            {isEditing ? "Đang cập nhật..." : "Đang thêm..."}
                        </>
                    ) : (
                        <>{isEditing ? "Cập nhật" : "Thêm mới"}</>
                    )}
                </button>
            </div>
        </div>
    );
};
