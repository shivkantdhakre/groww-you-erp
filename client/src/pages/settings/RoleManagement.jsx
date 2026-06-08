import { useState } from "react";

function RoleManagement() {
  const [role, setRole] = useState("Admin");

  const modules = [
    "Customer Master",
    "Vendor Master",
    "Sales Invoice",
    "Purchase Invoice",
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">
        Role Management
      </h1>

      <p className="text-gray-500 mb-6">
        Manage Roles & Permissions
      </p>

      {/* Role Selection */}

      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <label className="block mb-2 font-medium">
          Select Role
        </label>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-3 rounded-lg w-full"
        >
          <option>Admin</option>
          <option>Manager</option>
          <option>Accountant</option>
          <option>Operator</option>
        </select>

      </div>

      {/* Permission Matrix */}

      <div className="bg-white p-6 rounded-xl shadow">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>
              <th className="p-3 text-left">Module</th>
              <th className="p-3">View</th>
              <th className="p-3">Add</th>
              <th className="p-3">Edit</th>
              <th className="p-3">Delete</th>
            </tr>

          </thead>

          <tbody>

            {modules.map((module, index) => (
              <tr key={index} className="border-t">

                <td className="p-3">{module}</td>

                <td className="text-center">
                  <input type="checkbox" defaultChecked />
                </td>

                <td className="text-center">
                  <input type="checkbox" defaultChecked />
                </td>

                <td className="text-center">
                  <input type="checkbox" defaultChecked />
                </td>

                <td className="text-center">
                  <input type="checkbox" />
                </td>

              </tr>
            ))}

          </tbody>

        </table>

        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-5"
        >
          Save Permissions
        </button>

      </div>

    </div>
  );
}

export default RoleManagement;