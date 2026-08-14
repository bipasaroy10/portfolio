import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import "./App.css";

import {
    SettingsProvider
} from "./context/SettingsContext";

import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>

            <SettingsProvider>

                <Routes>

                    {/* Public */}

                    <Route
                        path="/"
                        element={<Home />}
                    />


                    {/* Admin Login */}

                    <Route
                        path="/admin/login"
                        element={<AdminLogin />}
                    />


                    {/* Protected Admin */}

                    <Route
                        element={
                            <ProtectedRoute />
                        }
                    >

                        <Route
                            path="/admin/dashboard"
                            element={
                                <AdminDashboard />
                            }
                        />

                    </Route>

                </Routes>

            </SettingsProvider>

        </BrowserRouter>
    );
}

export default App;