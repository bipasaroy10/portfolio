import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Login failed"
                );
            }

            // Save JWT
            localStorage.setItem(
                "adminToken",
                data.token
            );

            localStorage.setItem(
                "admin",
                JSON.stringify(data.admin)
            );

            navigate("/admin/dashboard");

        } catch (error) {
            console.error("Login error:", error);

            setError(error.message);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">

            <div className="w-full max-w-md">

                <div className="bg-white border rounded-2xl p-8 shadow-sm">

                    <div className="text-center mb-8">

                        <h1 className="text-3xl font-bold">
                            Admin Login
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Sign in to manage your portfolio
                        </p>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="admin@example.com"
                                required
                                className="w-full px-4 py-3 border rounded-lg outline-none"
                            />

                        </div>


                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-3 border rounded-lg outline-none"
                            />

                        </div>


                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 rounded-lg">
                                {error}
                            </div>
                        )}


                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-3 rounded-lg disabled:opacity-50"
                        >
                            {loading
                                ? "Signing in..."
                                : "Sign In"}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default AdminLogin;