import React, { useEffect, useState } from "react";
import { Input } from "./Input";
import { LoaderCircle } from "lucide-react";
import { ProfilePhotoSelector } from "./ProfilePhotoSelector";

export const UpdateUserForm = ({ onUpdateUser, userData }) => {
    const [user, setUser] = useState({
        fullName: "",
        oldPassword: "",
        newPassword: "",
    });
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (key, value) => {
        setUser({ ...user, [key]: value });
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            await onUpdateUser(user, profilePhoto);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (userData) {
            setUser({
                fullName: userData.fullName,
                oldPassword: "",
                newPassword: "",
            });
        }
    }, [userData]);

    return (
        <div className="p-4">
            <ProfilePhotoSelector
                image={profilePhoto}
                setImage={setProfilePhoto}
                initialImage={userData.profileImageUrl}
            />

            <Input
                value={user.fullName}
                onChange={({ target }) =>
                    handleChange("fullName", target.value)
                }
                label="Tên người dùng"
                type="text"
            />

            <Input
                value={userData.email}
                isDisabled={true}
                label="Email"
                type="text"
            />

            <Input
                value={user.oldPassword}
                onChange={({ target }) =>
                    handleChange("oldPassword", target.value)
                }
                label="Nhập mật khẩu cũ"
                type="password"
            />

            <Input
                value={user.newPassword}
                onChange={({ target }) =>
                    handleChange("newPassword", target.value)
                }
                label="Nhập mật khẩu mới"
                type="password"
            />

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    disabled={isLoading}
                    onClick={handleSubmit}
                    className="text-white px-3 py-2 font-medium rounded-lg cursor-pointer transition-colors duration-200 bg-blue-600 hover:bg-blue-400"
                >
                    {isLoading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin" />
                            Đang cập nhật...
                        </>
                    ) : (
                        <>Sửa</>
                    )}
                </button>
            </div>
        </div>
    );
};
