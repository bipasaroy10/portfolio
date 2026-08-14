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
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        if (error) {
            setError("");
        }
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

            // Save admin information
            localStorage.setItem(
                "admin",
                JSON.stringify(data.admin)
            );

            navigate("/admin/dashboard");

        } catch (error) {
            console.error("Login error:", error);

            setError(
                error.message ||
                "Unable to sign in. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="admin-login-page">

            {/* Background effects */}

            <div className="login-bg">

                <div className="login-orb login-orb-purple" />

                <div className="login-orb login-orb-cyan" />

                <div className="login-orb login-orb-pink" />

            </div>


            {/* Grid */}

            <div className="login-grid" />


            {/* Login container */}

            <div className="login-wrapper">

                {/* Brand */}

                <div className="login-brand">

                    <div className="login-brand-icon">
                        BR
                    </div>

                    <div>
                        <div className="login-brand-name">
                            Bipasa Roy
                        </div>

                        <div className="login-brand-label">
                            PORTFOLIO ADMIN
                        </div>
                    </div>

                </div>


                {/* Card */}

                <div className="login-card">

                    {/* Top glow */}

                    <div className="login-card-glow" />


                    {/* Header */}

                    <div className="login-header">

                        <div className="login-icon">

                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 3L20 7V11C20 16.2 16.6 20.8 12 22C7.4 20.8 4 16.2 4 11V7L12 3Z"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                                <path
                                    d="M9 12L11 14L15 10"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                        </div>


                        <div>

                            <p className="login-eyebrow">
                                SECURE ACCESS
                            </p>

                            <h1>
                                Welcome back
                            </h1>

                            <p className="login-subtitle">
                                Sign in to manage your portfolio.
                            </p>

                        </div>

                    </div>


                    {/* Form */}

                    <form
                        onSubmit={handleSubmit}
                        className="login-form"
                    >

                        {/* Email */}

                        <div className="login-field">

                            <label htmlFor="email">
                                Email address
                            </label>

                            <div className="login-input-wrapper">

                                <svg
                                    className="login-input-icon"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 6H20V18H4V6Z"
                                        stroke="currentColor"
                                        strokeWidth="1.6"
                                        strokeLinejoin="round"
                                    />

                                    <path
                                        d="M4 7L12 13L20 7"
                                        stroke="currentColor"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="admin@example.com"
                                    autoComplete="email"
                                    required
                                />

                            </div>

                        </div>


                        {/* Password */}

                        <div className="login-field">

                            <div className="login-label-row">

                                <label htmlFor="password">
                                    Password
                                </label>

                            </div>


                            <div className="login-input-wrapper">

                                <svg
                                    className="login-input-icon"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        x="5"
                                        y="10"
                                        width="14"
                                        height="10"
                                        rx="2"
                                        stroke="currentColor"
                                        strokeWidth="1.6"
                                    />

                                    <path
                                        d="M8 10V7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7V10"
                                        stroke="currentColor"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                    />

                                    <circle
                                        cx="12"
                                        cy="15"
                                        r="1"
                                        fill="currentColor"
                                    />
                                </svg>


                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                />


                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            (previous) =>
                                                !previous
                                        )
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >

                                    {showPassword ? (
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M3 3L21 21"
                                                stroke="currentColor"
                                                strokeWidth="1.7"
                                                strokeLinecap="round"
                                            />

                                            <path
                                                d="M10.6 10.6C10.2 11 10 11.5 10 12C10 13.1 10.9 14 12 14C12.5 14 13 13.8 13.4 13.4"
                                                stroke="currentColor"
                                                strokeWidth="1.7"
                                                strokeLinecap="round"
                                            />

                                            <path
                                                d="M9.9 5.2C10.6 5 11.3 4.9 12 4.9C17 4.9 20.5 9 21.5 12C21.1 13.2 20.1 15 18.4 16.6"
                                                stroke="currentColor"
                                                strokeWidth="1.7"
                                                strokeLinecap="round"
                                            />

                                            <path
                                                d="M6.1 6.2C4.3 7.7 3.1 9.8 2.5 12C3.5 15 7 19.1 12 19.1C13.2 19.1 14.3 18.9 15.3 18.5"
                                                stroke="currentColor"
                                                strokeWidth="1.7"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M2.5 12C3.5 9 7 4.9 12 4.9C17 4.9 20.5 9 21.5 12C20.5 15 17 19.1 12 19.1C7 19.1 3.5 15 2.5 12Z"
                                                stroke="currentColor"
                                                strokeWidth="1.7"
                                            />

                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="3"
                                                stroke="currentColor"
                                                strokeWidth="1.7"
                                            />
                                        </svg>
                                    )}

                                </button>

                            </div>

                        </div>


                        {/* Error */}

                        {error && (

                            <div className="login-error">

                                <div className="login-error-icon">
                                    !
                                </div>

                                <div>
                                    <strong>
                                        Sign in failed
                                    </strong>

                                    <span>
                                        {error}
                                    </span>
                                </div>

                            </div>

                        )}


                        {/* Submit */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="login-submit"
                        >

                            <span>
                                {loading
                                    ? "Signing in..."
                                    : "Sign in"}
                            </span>

                            {!loading && (
                                <span className="login-arrow">
                                    →
                                </span>
                            )}

                        </button>

                    </form>


                    {/* Security footer */}

                    <div className="login-security">

                        <span className="security-dot" />

                        <span>
                            Protected admin environment
                        </span>

                    </div>

                </div>


                {/* Footer */}

                <div className="login-footer">

                    <span>
                        © {new Date().getFullYear()} Bipasa Roy
                    </span>

                    <span className="footer-separator">
                        •
                    </span>

                    <span>
                        Portfolio Management System
                    </span>

                </div>

            </div>

        </main>
    );
};

export default AdminLogin;