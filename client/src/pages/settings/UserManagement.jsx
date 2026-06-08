import { useState } from "react";
import ValidationMessage from "../../components/common/ValidationMessage";

function UserManagement() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const [users, setUsers] = useState([

        {
            name: "Admin User",
            username: "admin",
            role: "Administrator",
            status: "Active",
        },
    ]);
    const [editIndex, setEditIndex] = useState(null);


    const addUser = () => {
        if (!name) {
            setMessage("Name is required");
            setMessageType("error");
            return;
        }
        const newUser = {
            name,
            email,
            mobile,
            username,
            password,
            role,
            status: "Active",
        };

        if (editIndex !== null) {
            const updatedUsers = [...users];

            updatedUsers[editIndex] = newUser;

            setUsers(updatedUsers);

            setEditIndex(null);
        } else {
            setUsers([...users, newUser]);
        }

        setName("");
        setEmail("");
        setMobile("");
        setUsername("");
        setPassword("");
        setRole("");
        setMessage("User Added Successfully");
        setMessageType("success");
    };


    const deleteUser = (index) => {
        const updatedUsers = users.filter(
            (_, i) => i !== index
        );

        setUsers(updatedUsers);
    };
    const editUser = (index) => {
        const user = users[index];

        setName(user.name);
        setUsername(user.username);
        setRole(user.role);
        setEmail(user.email || "");
        setMobile(user.mobile || "");
        setPassword(user.password || "");
        setEditIndex(index);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2">
                User Management
            </h1>

            <p className="text-gray-500 mb-6">
                Manage ERP Users
            </p>

            {/* Form */}

            <div className="bg-white p-6 rounded-xl shadow">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-3 rounded-lg"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        placeholder="Mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="border p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border p-3 rounded-lg"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-3 rounded-lg"
                    />

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border p-3 rounded-lg"
                    >
                        <option value="">
                            Select Role
                        </option>
                        <option>Administrator</option>
                        <option>Manager</option>
                        <option>Accountant</option>
                    </select>

                </div>

                <div className="flex gap-3 mt-5">

                    <button
                        onClick={addUser}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                    >
                        {editIndex !== null ? "Update User" : "Add User"}
                    </button>

                </div>
                <ValidationMessage
                    type={messageType}
                    message={message}
                />

            </div>

            {/* Table */}

            <div className="bg-white p-6 rounded-xl shadow mt-6">

                <table className="w-full">

                    <thead className="bg-blue-600 text-white">

                        <tr>
                            <th className="p-3">Name</th>
                            <th className="p-3">Username</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {users.map((user, index) => (
                            <tr key={index} className="border-t">

                                <td className="p-3">{user.name}</td>
                                <td className="p-3">{user.username}</td>
                                <td className="p-3">{user.role}</td>
                                <td className="p-3">{user.status}</td>

                                <td className="p-3">

                                    <button
                                        onClick={() => editUser(index)}
                                        className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                    >
                                        Edit
                                    </button>


                                    <button
                                        onClick={() => deleteUser(index)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </div >
    );
}

export default UserManagement;