import React, { useEffect, useState } from "react";
import { Input } from "./Input";
import { EmojiPickerPopup } from "./EmojiPickerPopup";
import { LoaderCircle } from "lucide-react";

export const AddCategoryForm = ({
    onAddCategory,
    initialCategoryData,
    isEditing,
}) => {
    const [category, setCategory] = useState({
        name: "",
        type: "Thu nhập",
        icon: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const categoryTypeOptions = [
        { value: "income", label: "Thu nhập" },
        { value: "expense", label: "Chi tiêu" },
    ];

    const handleChange = (key, value) => {
        setCategory({ ...category, [key]: value });
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            await onAddCategory(category);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isEditing && initialCategoryData) {
            setCategory(initialCategoryData);
        } else {
            setCategory({ name: "", type: "income", icon: "" });
        }
    }, [isEditing, initialCategoryData]);

    return (
        <div className="p-4">
            <EmojiPickerPopup
                icon={category.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={category.name}
                onChange={({ target }) => handleChange("name", target.value)}
                label="Tên danh mục"
                placeholder="VD: freelance, lương cứng, thưởng"
                type="text"
            />

            <Input
                value={category.type}
                onChange={({ target }) => handleChange("type", target.value)}
                label="Kiểu danh mục"
                isSelect={true}
                options={categoryTypeOptions}
            />

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    disabled={isLoading}
                    onClick={handleSubmit}
                    className={`text-white px-3 py-2 font-medium rounded-lg cursor-pointer transition-colors duration-200 ${
                        isEditing
                            ? "bg-blue-600 hover:bg-blue-400"
                            : "bg-primary hover:bg-primary-glow"
                    }`}
                >
                    {isLoading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin" />
                            {isEditing
                                ? "Đang cập nhật..."
                                : "Đang thêm mới..."}
                        </>
                    ) : (
                        <>{isEditing ? "Sửa" : "Thêm"}</>
                    )}
                </button>
            </div>
        </div>
    );
};
