import { useState } from "react";


function Navbar() {
    const [search, setSearch] = useState("");
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            message: "New Customer Added",
            read: false,
        },
        {
            id: 2,
            message: "Sales Invoice Created",
            read: false,
        },
        {
            id: 3,
            message: "Vendor Added",
            read: false,
        },
        {
            id: 4,
            message: "Purchase Invoice Created",
            read: false,
        },
    ]);

    const unreadCount = notifications.filter(
        (item) => !item.read
    ).length;

    const data = [
        "Customer - Amit Traders",
        "Vendor - Amit Supplier",
        "Sales Invoice - INV001",
        "Purchase Invoice - PINV001",
        "Item - Laptop",
        "Item - Mouse",
    ];

    const results = data.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
    );
    const markAsRead = (id) => {
        setNotifications(
            notifications.map((item) =>
                item.id === id
                    ? { ...item, read: true }
                    : item
            )
        );
    };

    const clearAll = () => {
        setNotifications([]);
    };

    return (
        <div className="bg-white shadow px-6 py-4 flex justify-between items-center relative">

            {/* Search */}

            <div className="w-2/3 relative">

                <input
                    type="text"
                    placeholder="Search Customers, Vendors, Invoices..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border p-3 rounded-lg"
                />

                {search && (
                    <div className="absolute bg-white border rounded-lg shadow-lg w-full mt-1 z-50">

                        {results.length > 0 ? (
                            results.map((item, index) => (
                                <div
                                    key={index}
                                    className="p-3 hover:bg-gray-100 cursor-pointer"
                                >
                                    {item}
                                </div>
                            ))
                        ) : (
                            <div className="p-3 text-gray-500">
                                No Results Found
                            </div>
                        )}

                    </div>
                )}

            </div>

            {/* Notification Bell */}

            <div className="relative">

                <button
                    onClick={() =>
                        setShowNotifications(!showNotifications)
                    }
                    className="relative p-2 rounded-lg hover:bg-gray-100"
                >
                    <span className="text-2xl">🔔</span>

                    {unreadCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 rounded-full">
                            {unreadCount}
                        </span>
                    )}
                </button>

                {showNotifications && (
                    <div className="absolute right-0 mt-3 w-80 bg-white border rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">

                        <div className="p-4 border-b flex justify-between">

                            <h3 className="font-semibold">
                                Notifications
                            </h3>

                            <button
                                onClick={clearAll}
                                className="text-red-600 text-sm"
                            >
                                Clear All
                            </button>

                        </div>

                        {notifications.length > 0 ? (
                            notifications.map((item) => (
                                <div
                                    key={item.id}
                                    className="p-4 border-b"
                                >
                                    <p>{item.message}</p>

                                    {!item.read && (
                                        <button
                                            onClick={() =>
                                                markAsRead(item.id)
                                            }
                                            className="text-blue-600 text-sm mt-1"
                                        >
                                            Mark As Read
                                        </button>
                                    )}

                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-gray-500">
                                No Notifications
                            </div>
                        )}

                    </div>
                )}

            </div>

            {/* Profile Menu */}

            <div className="relative ml-4">

                <button
                    onClick={() => setShowProfile(!showProfile)}
                    className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200"
                >
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                        A
                    </div>

                    <span className="font-medium">
                        Admin
                    </span>
                </button>

                {showProfile && (
                    <div className="absolute right-0 mt-3 w-72 bg-white border rounded-lg shadow-xl z-50">

                        <div className="p-4 border-b">
                            <h3 className="font-bold text-lg">
                                Admin User
                            </h3>

                            <p className="text-sm text-gray-500">
                                Administrator
                            </p>

                            <p className="text-sm text-gray-500">
                                admin@growwyou.com
                            </p>
                        </div>

                        <button className="w-full text-left p-3 hover:bg-gray-100">
                            My Profile
                        </button>

                        <button className="w-full text-left p-3 hover:bg-gray-100">
                            Change Password
                        </button>

                        <button className="w-full text-left p-3 hover:bg-gray-100">
                            Settings
                        </button>

                        <button className="w-full text-left p-3 hover:bg-red-100 text-red-600">
                            Logout
                        </button>

                    </div>
                )}

            </div>

        </div>
    );
}

export default Navbar;