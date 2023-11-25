// ProtectedRoute.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider.jsx';
import { Outlet, Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component }) => {
    const auth = useAuth();

    return auth.isAuthenticated ? <Component /> : <Navigate to="/" />;
};
