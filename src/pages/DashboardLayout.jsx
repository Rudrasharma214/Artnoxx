import { useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import DashboardNavbar from "../components/DashboardNavbar";

const DashboardLayout = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-[#e8e0d5]">
            <DashboardNavbar onLogout={handleLogout} />
            
            <div className="p-4 sm:p-6 lg:p-10">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
