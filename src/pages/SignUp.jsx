import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Input } from "../components/Input";
import { ValidateEmail } from "../util/Validation";
import AxiosConfig from "../util/AxiosConfig";
import { API_ENDPOINTS } from "../util/ApiEndpoints";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
import { ProfilePhotoSelector } from "../components/ProfilePhotoSelector";
import uploadProfileImage from "../util/UploadProfileImage";

export const SignUp = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let profileImageUrl = "";
        setIsLoading(true);

        if (!fullName.trim()) {
            setError("Xin hãy điền họ tên của bạn");
            setIsLoading(false);
            return;
        }
        if (!password.trim()) {
            setError("Xin hãy điền mật khẩu của bạn");
            setIsLoading(false);
            return;
        }
        if (!ValidateEmail(email)) {
            setError("Xin hãy điền email hợp lệ của bạn");
            setIsLoading(false);
            return;
        }
        setError("");

        try {
            if (profilePhoto) {
                const imageUrl = await uploadProfileImage(profilePhoto);
                profileImageUrl = imageUrl || "";
            }

            const response = await AxiosConfig.post(API_ENDPOINTS.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl,
            });

            if (response.status === 201) {
                toast.success("Người dùng đã được tạo thành công");
                navigate("/login");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            <img
                src={assets.login_bg}
                alt="Backgroud"
                className="absolute inset-0 w-full h-full object-cover blur-sm"
            />

            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Tạo tài khoản
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Theo dõi chi tiêu của bạn bằng cách đăng kí với chúng
                        tôi.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex justify-center mb-6">
                            <ProfilePhotoSelector
                                image={profilePhoto}
                                setImage={setProfilePhoto}
                            />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                            <Input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                label="Họ và tên"
                                placeholder="VD:Nguyễn Công Hậu"
                                type="text"
                            />
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                label="Mật khẩu"
                                placeholder="********"
                                type="password"
                            />
                            <div className="col-span-2">
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    label="Địa chỉ email"
                                    placeholder="VD:HoTen@example.com"
                                    type="text"
                                />
                            </div>
                        </div>
                        {error && (
                            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}
                        <button
                            disabled={isLoading}
                            className={`bg-primary text-white rounded-md cursor-pointer shadow-primary shadow-sm hover:bg-primary-glow w-full py-3 text-lg font-medium flex items-center justify-center gap-2 ${
                                isLoading ? "opacity-60 cursor-not-allowed" : ""
                            }`}
                            type="submit"
                        >
                            {isLoading ? (
                                <>
                                    <LoaderCircle className="animate-spin w-5 h-5" />
                                    Đang đăng ký...
                                </>
                            ) : (
                                "Đăng ký"
                            )}
                        </button>
                        <p className="text-sm text-slate-800 text-center mt-6">
                            Đã có tài khoản?{" "}
                            <Link
                                to="/login"
                                className="font-medium text-primary-dark underline hover:text-primary-dark transition-colors"
                            >
                                Đăng nhập
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};
