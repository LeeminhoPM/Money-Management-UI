import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Bolt, User } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { Modal } from "./Modal";
import { UpdateUserForm } from "./UpdateUserForm";
import uploadProfileImage from "../util/UploadProfileImage";
import { toast } from "react-toastify";
import AxiosConfig from "../util/AxiosConfig";
import { API_ENDPOINTS } from "../util/ApiEndpoints";

export const Sidebar = ({ activeMenu }) => {
    const [openUpdateUserModal, setOpenUpdateUserModal] = useState(false);

    const { user, setUser } = useContext(AppContext);
    const navigate = useNavigate();

    const handleUpdateUser = async (updatedUser, profilePhoto) => {
        try {
            let profileImageUrl = user.profileImageUrl;
            if (profilePhoto) {
                const imageUrl = await uploadProfileImage(profilePhoto);
                profileImageUrl = imageUrl;
            }

            const response = await AxiosConfig.put(API_ENDPOINTS.UPDATE_USER, {
                fullName: updatedUser.fullName,
                oldPassword: updatedUser.oldPassword,
                newPassword: updatedUser.newPassword || updatedUser.oldPassword,
                profileImageUrl,
            });
            if (response.status === 200) {
                setUser(response.data);
                toast.success("Cập nhật thông tin thành công");
                setOpenUpdateUserModal(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Cập nhât thông tin thất bại",
            );
        }
    };

    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-white border-gray-200/50 p-5 sticky top-15.25 z-30">
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
                <div className="group relative rounded-full hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all duration-200">
                    {user?.profileImageUrl ? (
                        <img
                            src={user?.profileImageUrl || ""}
                            alt="Ảnh đại diện"
                            className="w-20 h-20 bg-slate-400 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-full">
                            <User className="w-10 h-10 text-primary" />
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={() => setOpenUpdateUserModal(true)}
                        className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                        <Bolt size={15} />
                    </button>

                    {/* Modal update người dùng */}
                    <Modal
                        isOpen={openUpdateUserModal}
                        onClose={() => setOpenUpdateUserModal(false)}
                        title="Cập nhật hồ sơ"
                    >
                        <UpdateUserForm
                            onUpdateUser={handleUpdateUser}
                            userData={user}
                        />
                    </Modal>
                </div>
                <h5 className="text-gray-950 font-medium leading-6 mb-8">
                    {user?.fullName || "User"}
                </h5>
                {SIDE_BAR_DATA.map((item, index) => {
                    return (
                        <button
                            onClick={() => navigate(item.path)}
                            key={`menu_${index}`}
                            className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 cursor-pointer ${
                                activeMenu == item.label
                                    ? "text-white bg-primary-dark"
                                    : ""
                            }`}
                        >
                            <item.icon className="text-xl" />
                            {item.text}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
