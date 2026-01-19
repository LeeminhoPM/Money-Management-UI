import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import AxiosConfig from "../util/AxiosConfig";
import { API_ENDPOINTS } from "../util/ApiEndpoints";

export const useUser = () => {
    const { user, setUser, clearUser } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Nếu có dữ liệu người dùng rồi thì thôi
        if (user) {
            return;
        }

        let isMounted = true;

        const fetchUserInfo = async () => {
            try {
                const response = await AxiosConfig.get(
                    API_ENDPOINTS.GET_USER_INFO
                );

                if (isMounted && response.data) {
                    setUser(response.data);
                }
            } catch (err) {
                console.error(err);
                // Nếu isMounted là true và get profile lỗi (Không có token trong localStorage => Chưa đăng nhập)
                if (isMounted) {
                    // Xóa dữ liệu người dùng
                    clearUser();
                    // Đưa đến trang login
                    navigate("/login");
                }
            }
        };

        fetchUserInfo();

        // Cleanup useEffect để tối ưu bộ nhớ khi component unmount
        return () => {
            isMounted = false;
        };
    }, [setUser, clearUser, navigate, user]);
};
