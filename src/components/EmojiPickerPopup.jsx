import { Image, X } from "lucide-react";
import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

export const EmojiPickerPopup = ({ icon, onSelect, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleEmojiClick = (emoji) => {
        onSelect(emoji?.imageUrl || "");
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
            <div
                onClick={() => setIsOpen(!disabled)}
                className="flex items-center gap-4 cursor-pointer"
            >
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-green-100 text-primary rounded-lg">
                    {icon ? (
                        <img src={icon} alt="icon" className="w-12 h-12" />
                    ) : (
                        <Image />
                    )}
                </div>
                <p>{icon ? "Thay đổi icon" : "Thêm icon mới"}</p>
            </div>
            {isOpen && (
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer"
                    >
                        <X />
                    </button>
                    <EmojiPicker
                        open={isOpen}
                        onEmojiClick={handleEmojiClick}
                    />
                </div>
            )}
        </div>
    );
};
