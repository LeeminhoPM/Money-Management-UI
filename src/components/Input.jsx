import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const Input = ({
    label,
    value,
    onChange,
    placeholder,
    type,
    isSelect,
    options,
    isDisabled,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mb-4">
            <label className="font-medium text-[13px] text-slate-800 block mb-1">
                {label}
            </label>
            <div className="relative">
                {isSelect ? (
                    <select
                        disabled={isDisabled}
                        value={value}
                        onChange={(e) => onChange(e)}
                        className={`w-full bg-transparent outline-0 border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-normal focus:outline-0 focus:border-blue-500 ${isDisabled ? "cursor-not-allowed" : ""}`}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        className={`w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 ${
                            type === "password" || type === "text"
                                ? "pr-10"
                                : ""
                        } text-gray-700 leading-tight focus:outline-none focus:border-blue-500`}
                        type={
                            type === "password"
                                ? showPassword
                                    ? "text"
                                    : "password"
                                : type
                        }
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange(e)}
                        disabled={isDisabled}
                    />
                )}
                {type === "password" && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                        {showPassword ? (
                            <Eye
                                size={20}
                                className="text-primary"
                                onClick={toggleShowPassword}
                            />
                        ) : (
                            <EyeOff
                                size={20}
                                className="text-slate-400"
                                onClick={toggleShowPassword}
                            />
                        )}
                    </span>
                )}
            </div>
        </div>
    );
};
