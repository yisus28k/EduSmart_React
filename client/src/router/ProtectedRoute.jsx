// ProtectedRoute.js
import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    return isAuthenticated ? <Component /> : <Navigate to="/" />;
};
