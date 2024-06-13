import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isLoggedIn: string;
  type: number;
  children: React.ReactNode;
  admin: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isLoggedIn, children, type, admin }) => {
    console.log(admin);
    console.log(type);
    if(type === 1 || type === 2){
        return isLoggedIn !== '' ? <>{children}</> : <Navigate to="/login" />;
    }
    return isLoggedIn === '' ? <>{children}</> : admin ? <Navigate to ="/admin" /> : <Navigate to="/home" />;
};
