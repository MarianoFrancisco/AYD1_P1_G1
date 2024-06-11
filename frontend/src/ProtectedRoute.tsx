import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isLoggedIn: string;
  type: number;
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isLoggedIn, children, type }) => {
    
    if(type === 1) {
        return isLoggedIn !== '' ? <>{children}</> : <Navigate to="/login" />;
    }
    return isLoggedIn === '' ? <>{children}</> : <Navigate to="/home" />;
};
