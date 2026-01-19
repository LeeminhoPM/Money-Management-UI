import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";

export const DeleteAlert = ({ content, onDelete }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleOnDelete = async () => {
        setIsLoading(true);
        try {
            await onDelete();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <p className="text-sm">{content}</p>
            <div className="flex justify-end mt-6">
                <button
                    disabled={isLoading}
                    type="button"
                    onClick={handleOnDelete}
                    className="text-white px-3 py-2 font-medium rounded-lg cursor-pointer transition-colors duration-200 bg-red-600 hover:bg-red-400"
                >
                    {isLoading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin" />{" "}
                            Đang xóa...
                        </>
                    ) : (
                        <>Xóa</>
                    )}
                </button>
            </div>
        </div>
    );
};
