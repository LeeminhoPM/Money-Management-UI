import { Trash, Upload, User } from "lucide-react";
import React, { useRef, useState } from "react";

export const ProfilePhotoSelector = ({ image, setImage, initialImage }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(initialImage || "");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            // Tạo đường dẫn tạm thời để xem preview
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = (e) => {
        e.preventDefault();
        setImage(null);
        setPreviewUrl(null);

        if (inputRef.current) {
            inputRef.current.value = null;
        }
    };

    const onChooseFile = (e) => {
        e.preventDefault();
        // useRef sử dụng để click vào input bằng custom UI
        inputRef.current?.click();
    };

    return (
        <div className="flex justify-center mb-6">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />
            {!image && !previewUrl ? (
                <div className="w-20 h-20 flex items-center justify-center bg-green-200 rounded-full relative">
                    <User className="text-primary" size={35} />
                    <button
                        type="button"
                        onClick={onChooseFile}
                        className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
                    >
                        <Upload size={15} />
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <img
                        src={previewUrl}
                        alt="Ảnh đại diện"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="w-8 h-8 flex items-center justify-center bg-red-800 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
                    >
                        <Trash size={15} />
                    </button>
                </div>
            )}
        </div>
    );
};
