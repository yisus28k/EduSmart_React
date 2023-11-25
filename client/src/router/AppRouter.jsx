// AppRouter.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage, RecoverPasswordPage } from "../pages/auth";
import { HomePage } from "../pages";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route index element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/recover-password" element={<RecoverPasswordPage />} />
                <Route
                    path="/home"
                    element={<ProtectedRoute component={HomePage} />}
                />
            </Routes>
        </>
    );
};
