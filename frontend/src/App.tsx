import { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";
import { LoginForm } from "@/components/LoginForm";
import { UserHome } from "./pages/UserHome";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminHome } from "./pages/AdminHome";
import { RegistrationForm } from "./components/RegistrationForm";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<string>("");
  useEffect(() => {
    const token = Cookies.get("token");

    if (token && token !== isLoggedIn) {
      setIsLoggedIn(token);
    }
  }, [isLoggedIn]);
  const handleLoginApp = (token: string, admin: boolean) => {
    Cookies.set("token", token);
    if (admin) {
      Cookies.set("admin", "true");
    }
    setIsLoggedIn(token);
  };
  const handleLogoutApp = () => {
    Cookies.remove("token");
    setIsLoggedIn("");
    if (Cookies.get("admin")) {
      Cookies.remove("admin");
    }
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} type={0} admin={Cookies.get("admin") === "true"}>
              <div className="flex justify-center mt-60">
                <LoginForm onLogin={handleLoginApp}></LoginForm>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} type={1} admin={Cookies.get("admin") === "true"}>
              <UserHome onLogout={handleLogoutApp}></UserHome>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} type={2} admin={Cookies.get("admin") === "true"}>

              <AdminHome onLogout={handleLogoutApp}></AdminHome>

            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} type={3} admin={Cookies.get("admin") === "true"}>
              <div className="flex justify-center mt-20">
                <RegistrationForm></RegistrationForm>
              </div>
            </ProtectedRoute>
          } />
        <Route
          path="/"
          element={<Navigate to={isLoggedIn !== "" ? "/home" : "/login"} />}
        />
      </Routes>
    </Router>
    // <>
    //   <div className="flex justify-center mt-60">
    //     <div className="w-96">
    //       {isLoggedIn !== '' ? <UserHome></UserHome>: <LoginForm onLogin={handleLoginApp}></LoginForm>}
    //     </div>
    //   </div>
    // </>
  );
}

export default App;
