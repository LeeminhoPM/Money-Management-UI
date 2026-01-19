import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Input } from "../components/Input";
import { ValidateEmail } from "../util/Validation";
import AxiosConfig from "../util/AxiosConfig";
import { API_ENDPOINTS } from "../util/ApiEndpoints";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { setUser } = useContext(AppContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!password.trim() || !ValidateEmail(email)) {
            setError("Sai thông tin, vui lòng điền lại");
            setIsLoading(false);
            return;
        }
        setError("");

        try {
            const response = await AxiosConfig.post(API_ENDPOINTS.LOGIN, {
                email,
                password,
            });
            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                setUser(user);
                toast.success("Đăng nhập thành công");
                navigate("/");
            }
        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                console.error(err);
            }
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
                        Chào mừng quay lại
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Điền thông tin của bạn để đăng nhập.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Địa chỉ email"
                            placeholder="VD:HoTen@example.com"
                            type="text"
                        />
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Mật khẩu"
                            placeholder="********"
                            type="password"
                        />
                        {error && (
                            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}
                        <button
                            disabled={isLoading}
                            className={`bg-primary text-white rounded-md cursor-pointer shadow-primary shadow-sm hover:bg-primary-glow w-full py-3 text-lg font-medium mt-8 flex items-center justify-center gap-2 ${
                                isLoading ? "opacity-60 cursor-not-allowed" : ""
                            }`}
                            type="submit"
                        >
                            {isLoading ? (
                                <>
                                    <LoaderCircle className="animate-spin w-5 h-5" />
                                    Đang đăng nhập...
                                </>
                            ) : (
                                "Đăng nhập"
                            )}
                        </button>
                        <p className="text-sm text-slate-800 text-center mt-6">
                            Chưa có tài khoản?{" "}
                            <Link
                                to="/signup"
                                className="font-medium text-primary-dark underline hover:text-primary-dark transition-colors"
                            >
                                Đăng ký
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};
