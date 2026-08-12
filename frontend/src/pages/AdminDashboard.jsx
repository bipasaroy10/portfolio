import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const admin = JSON.parse(
        localStorage.getItem("admin")
    );

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");

        navigate("/admin/login");
    };

    return (
        <div className="min-h-screen bg-gray-100">

            <header className="bg-white border-b">

                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                    <div>

                        <h1 className="text-2xl font-bold">
                            Admin Dashboard
                        </h1>

                        <p className="text-sm text-gray-500">
                            Welcome, {admin?.name}
                        </p>

                    </div>


                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-black text-white rounded-lg"
                    >
                        Logout
                    </button>

                </div>

            </header>


            <main className="max-w-7xl mx-auto px-6 py-10">

                <h2 className="text-3xl font-bold mb-8">
                    Portfolio Management
                </h2>


                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                    <div className="bg-white border rounded-xl p-6">
                        <h3 className="text-xl font-bold">
                            Projects
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Manage portfolio projects
                        </p>
                    </div>


                    <div className="bg-white border rounded-xl p-6">
                        <h3 className="text-xl font-bold">
                            Skills
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Manage technical skills
                        </p>
                    </div>


                    <div className="bg-white border rounded-xl p-6">
                        <h3 className="text-xl font-bold">
                            Experience
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Manage work experience
                        </p>
                    </div>


                    <div className="bg-white border rounded-xl p-6">
                        <h3 className="text-xl font-bold">
                            Messages
                        </h3>

                        <p className="text-gray-500 mt-2">
                            View contact messages
                        </p>
                    </div>

                </div>

            </main>

        </div>
    );
};

export default AdminDashboard;