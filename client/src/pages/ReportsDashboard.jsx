function ReportsDashboard() {
    const reports = [
        {
            title: "Sales Report",
            value: "₹ 1,25,000",
        },
        {
            title: "Purchase Report",
            value: "₹ 85,000",
        },
        {
            title: "Customer Report",
            value: "25",
        },
        {
            title: "Vendor Report",
            value: "12",
        },
        {
            title: "Stock Report",
            value: "150 Items",
        },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">
                Reports Dashboard
            </h1>

            {/* Report Cards */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

                {reports.map((report, index) => (
                    <div
                        key={index}
                        className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
                    >
                        <h2 className="text-gray-500">
                            {report.title}
                        </h2>

                        <p className="text-2xl font-bold mt-2 text-blue-600">
                            {report.value}
                        </p>
                    </div>
                ))}

            </div>

            {/* Quick Actions */}

            <div className="bg-white p-5 rounded-xl shadow mt-6">

                <h2 className="text-2xl font-bold mb-4">
                    Quick Report Actions
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <button className="bg-blue-600 text-white p-3 rounded-lg">
                        Generate Sales Report
                    </button>

                    <button className="bg-green-600 text-white p-3 rounded-lg">
                        Generate Purchase Report
                    </button>

                    <button className="bg-purple-600 text-white p-3 rounded-lg">
                        Generate Stock Report
                    </button>

                </div>

            </div>

            {/* Recent Reports */}

            <div className="bg-white p-5 rounded-xl shadow mt-6">

                <h2 className="text-2xl font-bold mb-4">
                    Recent Reports
                </h2>

                <table className="w-full">

                    <thead className="bg-blue-600 text-white">

                        <tr>
                            <th className="p-3 text-left">
                                Report Name
                            </th>

                            <th className="p-3 text-left">
                                Date
                            </th>

                            <th className="p-3 text-left">
                                Status
                            </th>
                        </tr>

                    </thead>

                    <tbody>

                        <tr className="border-t">
                            <td className="p-3">
                                Sales Report
                            </td>

                            <td className="p-3">
                                05-06-2026
                            </td>

                            <td className="p-3 text-green-600">
                                Generated
                            </td>
                        </tr>

                        <tr className="border-t">
                            <td className="p-3">
                                Purchase Report
                            </td>

                            <td className="p-3">
                                04-06-2026
                            </td>

                            <td className="p-3 text-green-600">
                                Generated
                            </td>
                        </tr>

                        <tr className="border-t">
                            <td className="p-3">
                                Stock Report
                            </td>

                            <td className="p-3">
                                03-06-2026
                            </td>

                            <td className="p-3 text-green-600">
                                Generated
                            </td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default ReportsDashboard;