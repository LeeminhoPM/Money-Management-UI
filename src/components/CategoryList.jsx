import { Layers2, Pencil, Trash2 } from "lucide-react";
import React from "react";

export const CategoryList = ({
    categories,
    onEditCategory,
    onRemoveCategory,
}) => {
    return (
        <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">Nguồn danh mục</h4>
            </div>

            {/* Danh sách danh mục */}
            {categories.length === 0 ? (
                <p className="text-gray-500">
                    Không có danh mục nào, hay thêm danh mục mới để bắt đầu!
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="group relative flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100/60"
                        >
                            {/* Bảng icon và emoji */}
                            <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
                                {category.icon ? (
                                    <span className="text-2xl">
                                        <img
                                            src={category.icon}
                                            alt={category.name}
                                            className="w-5 h-5"
                                        />
                                    </span>
                                ) : (
                                    <Layers2
                                        className="text-primary"
                                        size={24}
                                    />
                                )}
                            </div>

                            {/* Thông tin danh mục */}
                            <div className="flex-1 flex items-center justify-between">
                                {/* Tên và kiểu danh mục */}
                                <div>
                                    <p className="text-sm text-gray-700 font-medium">
                                        {category.name}
                                    </p>
                                    <p className="text-sm text-gray-400 font-medium mt-1 capitalize">
                                        {category.type === "income"
                                            ? "Thu nhập"
                                            : "Chi tiêu"}
                                    </p>
                                </div>

                                {/* Nút chức năng */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onEditCategory(category)}
                                        className="text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() =>
                                            onRemoveCategory(category)
                                        }
                                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
