import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
