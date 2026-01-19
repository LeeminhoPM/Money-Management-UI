import React, { useEffect, useState } from "react";
import { Dashboard } from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { Plus } from "lucide-react";
import { CategoryList } from "../components/CategoryList";
import AxiosConfig from "../util/AxiosConfig";
import { API_ENDPOINTS } from "../util/ApiEndpoints";
import { Modal } from "../components/Modal";
import { AddCategoryForm } from "../components/AddCategoryForm";
import { toast } from "react-toastify";
import { DeleteAlert } from "../components/DeleteAlert";

export const Category = () => {
    useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
    const [openDeleteCategoryModal, setOpenDeleteCategoryModal] =
        useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategoryDetails = async () => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);

        try {
            const response = await AxiosConfig.get(
                API_ENDPOINTS.GET_ALL_CATEGORIES,
            );
            if (response.status === 200) {
                setCategoryData(response.data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddCategory = async (category) => {
        const { name, type, icon } = category;

        if (!name.trim()) {
            toast.error("Tên danh mục không được để trống");
            return;
        }

        const isDuplicate = categoryData.some((category) => {
            return category.name.toLowerCase() === name.toLowerCase();
        });

        if (isDuplicate) {
            toast.error("Tên danh mục này đã tồn tại");
            return;
        }

        try {
            const response = await AxiosConfig.post(
                API_ENDPOINTS.ADD_CATEGORY,
                { name, type, icon },
            );
            if (response.status === 201) {
                toast.success("Thêm danh mục mới thành công");
                setOpenAddCategoryModal(false);
                fetchCategoryDetails();
            }
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Thêm danh mục mới thất bại",
            );
        }
    };

    const handleEditCategory = (category) => {
        setSelectedCategory(category);
        setOpenEditCategoryModal(true);
    };

    const handleUpdateCategory = async (category) => {
        const { id, type, name, icon } = category;

        if (!id) {
            toast.error("Không tìm thấy danh mục");
            return;
        }

        if (!name.trim()) {
            toast.error("Tên danh mục không được để trống");
            return;
        }

        try {
            const response = await AxiosConfig.put(
                API_ENDPOINTS.UPDATE_DELETE_CATEGORY(id),
                {
                    name,
                    type,
                    icon,
                },
            );

            if (response.status === 200) {
                setOpenEditCategoryModal(false);
                setSelectedCategory(null);
                toast.success("Chỉnh sửa danh mục thành công");
                fetchCategoryDetails();
            }
        } catch (error) {
            console.log(error.response?.data?.message || error.message);
            toast.error(
                error.response?.data?.message || "Chỉnh sửa danh mục thất bại",
            );
        }
    };

    const handleRemoveCategory = (category) => {
        setSelectedCategory(category);
        setOpenDeleteCategoryModal(true);
    };

    const handleDeleteCategory = async (category) => {
        const { id } = category;

        if (!id) {
            toast.error("Không tìm thấy danh mục");
            return;
        }

        try {
            const response = await AxiosConfig.delete(
                API_ENDPOINTS.UPDATE_DELETE_CATEGORY(id),
            );

            if (response.status === 200) {
                setOpenDeleteCategoryModal(false);
                setSelectedCategory(null);
                toast.success("Xóa danh mục thành công");
                fetchCategoryDetails();
            }
        } catch (error) {
            console.log(error.response?.data?.message || error.message);
            toast.error(
                error.response?.data?.message || "Xóa danh mục thất bại",
            );
        }
    };

    useEffect(() => {
        fetchCategoryDetails();
    }, []);

    return (
        <Dashboard activeMenu="Category">
            <div className="my-5 mx-auto">
                {/* Nút thêm danh mục mới */}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-semibold">Tất cả danh mục</h2>
                    <button
                        onClick={() => setOpenAddCategoryModal(true)}
                        className="main-btn"
                    >
                        <Plus size={15} className="text-lg mr-1" /> Thêm danh
                        mục
                    </button>
                </div>

                {/* Danh sách danh mục */}
                <CategoryList
                    categories={categoryData}
                    onEditCategory={handleEditCategory}
                    onRemoveCategory={handleRemoveCategory}
                />

                {/* Modal thêm danh mục */}
                <Modal
                    isOpen={openAddCategoryModal}
                    onClose={() => setOpenAddCategoryModal(false)}
                    title="Thêm danh mục mới"
                >
                    <AddCategoryForm onAddCategory={handleAddCategory} />
                </Modal>

                {/* Modal cập nhật danh mục */}
                <Modal
                    isOpen={openEditCategoryModal}
                    onClose={() => {
                        setOpenEditCategoryModal(false);
                        setSelectedCategory(null);
                    }}
                    title="Chỉnh sửa danh mục"
                >
                    <AddCategoryForm
                        initialCategoryData={selectedCategory}
                        onAddCategory={handleUpdateCategory}
                        isEditing={true}
                    />
                </Modal>

                {/* Modal xóa danh mục */}
                <Modal
                    isOpen={openDeleteCategoryModal}
                    onClose={() => {
                        setOpenDeleteCategoryModal(false);
                        setSelectedCategory(null);
                    }}
                    title="Xóa danh mục"
                >
                    <DeleteAlert
                        content="Bạn có chắc muốn xóa danh mục này."
                        onDelete={() => handleDeleteCategory(selectedCategory)}
                    />
                </Modal>
            </div>
        </Dashboard>
    );
};
