export const BASE_URL = "http://localhost:8080/api/v1.0";
const CLOUDINARY_CLOUD_NAME = "djabvutkv";

export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    GET_USER_INFO: "/profile",
    UPDATE_USER: "/profile",
    GET_ALL_CATEGORIES: "/categories",
    ADD_CATEGORY: "/categories",
    UPDATE_DELETE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
    GET_ALL_INCOMES: "/incomes",
    GET_CATEGORY_BY_TYPE: (type) => `/categories/${type}`,
    ADD_INCOME: "/incomes",
    UPDATE_DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,
    INCOME_EXCEL_DOWNLOAD: "/excel/download/income",
    EMAIL_INCOME: "/email/income-excel",
    GET_ALL_EXPENSES: "/expenses",
    ADD_EXPENSE: "/expenses",
    UPDATE_DELETE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,
    EXPENSE_EXCEL_DOWNLOAD: "/excel/download/expense",
    EMAIL_EXPENSE: "/email/expense-excel",
    APPLY_FILTER: "/filter",
    DASHBOARD_DATA: "/dashboard",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    GET_ALL_SCHEDULES: "/schedules",
    ADD_SCHEDULE: "/schedules",
    UPDATE_DELETE_SCHEDULE: (scheduleId) => `/schedules/${scheduleId}`,
};
