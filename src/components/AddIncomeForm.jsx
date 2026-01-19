import React, { useEffect, useState } from "react";
import { EmojiPickerPopup } from "./EmojiPickerPopup";
import { Input } from "./Input";
import { LoaderCircle } from "lucide-react";

export const AddIncomeForm = ({
    onAddIncome,
    categories,
    initialIncomeData,
    isEditing,
}) => {
    const [income, setIncome] = useState({
        name: "",
        amount: "",
        date: "",
        icon: "",
        categoryId: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const categoryOptions = categories?.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    const handleChange = (key, value) => {
        setIncome({ ...income, [key]: value });
    };

    const handleAddIncome = async () => {
        setIsLoading(true);
        try {
            await onAddIncome(income);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (categories.length > 0 && !income.categoryId) {
            setIncome((prev) => ({ ...prev, categoryId: categories[0].id }));
        }
    }, [categories, income.categoryId]);

    useEffect(() => {
        if (isEditing && initialIncomeData) {
            setIncome(initialIncomeData);
        }
    }, [isEditing, initialIncomeData]);

    return (
        <div>
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={income.name}
                onChange={({ target }) => handleChange("name", target.value)}
                label="Tên giao dịch"
                placeholder="VD: Lương, freelance, thưởng..."
                type="text"
            />

            <Input
                label="Danh mục"
                value={income.categoryId}
                onChange={({ target }) =>
                    handleChange("categoryId", target.value)
                }
                isSelect={true}
                options={categoryOptions}
            />

            <Input
                value={income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Mệnh giá"
                placeholder="VD: 500.000, 200.000..."
                type="number"
            />

            <Input
                value={income.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Ngày giao dịch"
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    disabled={isLoading}
                    onClick={handleAddIncome}
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
