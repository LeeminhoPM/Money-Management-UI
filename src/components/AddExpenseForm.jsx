import React, { useEffect, useState } from "react";
import { EmojiPickerPopup } from "./EmojiPickerPopup";
import { Input } from "./Input";
import { LoaderCircle } from "lucide-react";

export const AddExpenseForm = ({
    onAddExpense,
    categories,
    initialExpenseData,
    isEditing,
}) => {
    const [expense, setExpense] = useState({
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
        setExpense({ ...expense, [key]: value });
    };

    const handleAddExpense = async () => {
        setIsLoading(true);
        try {
            await onAddExpense(expense);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (categories.length > 0 && !expense.categoryId) {
            setExpense((prev) => ({ ...prev, categoryId: categories[0].id }));
        }
    }, [categories, expense.categoryId]);

    useEffect(() => {
        if (isEditing && initialExpenseData) {
            setExpense(initialExpenseData);
        }
    }, [isEditing, initialExpenseData]);

    return (
        <div>
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={expense.name}
                onChange={({ target }) => handleChange("name", target.value)}
                label="Tên giao dịch"
                placeholder="VD: Sinh hoạt, học phí,..."
                type="text"
            />

            <Input
                label="Danh mục"
                value={expense.categoryId}
                onChange={({ target }) =>
                    handleChange("categoryId", target.value)
                }
                isSelect={true}
                options={categoryOptions}
            />

            <Input
                value={expense.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Mệnh giá"
                placeholder="VD: 500.000, 200.000..."
                type="number"
            />

            <Input
                value={expense.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Ngày giao dịch"
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    disabled={isLoading}
                    onClick={handleAddExpense}
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
