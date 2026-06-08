function BackupRestore() {
  const backupHistory = [
    {
      date: "2026-06-01",
      time: "10:30 AM",
      size: "25 MB",
    },
    {
      date: "2026-06-02",
      time: "11:15 AM",
      size: "28 MB",
    },
    {
      date: "2026-06-03",
      time: "09:45 AM",
      size: "30 MB",
    },
    {
      date: "2026-06-04",
      time: "04:20 PM",
      size: "32 MB",
    },
    {
      date: "2026-06-05",
      time: "06:10 PM",
      size: "35 MB",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">
        Backup & Restore
      </h1>

      <p className="text-gray-500 mb-6">
        Manage Database Backup & Recovery
      </p>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Backup Database
          </h2>

          <p className="text-gray-500 mb-4">
            Create a database backup file.
          </p>

          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
            Create Backup
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Restore Database
          </h2>

          <p className="text-gray-500 mb-4">
            Upload backup file and restore.
          </p>

          <input
            type="file"
            className="border p-2 rounded-lg w-full mb-4"
          />

          <button className="bg-green-600 text-white px-5 py-2 rounded-lg">
            Restore Backup
          </button>
        </div>

      </div>

      {/* Backup History */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-semibold mb-4">
          Backup History
        </h2>

        <table className="w-full">

          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Backup Size</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>

            {backupHistory.map((backup, index) => (
              <tr key={index} className="border-t">

                <td className="p-3">{backup.date}</td>
                <td className="p-3">{backup.time}</td>
                <td className="p-3">{backup.size}</td>

                <td className="p-3">

                  <button className="bg-indigo-600 text-white px-3 py-1 rounded">
                    Download
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default BackupRestore;