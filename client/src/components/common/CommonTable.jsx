function CommonTable({
  headers,
  children,
}) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">

      <table className="w-full">

        <thead className="bg-blue-600 text-white">

          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="p-3"
              >
                {header}
              </th>
            ))}
          </tr>

        </thead>

        <tbody>{children}</tbody>

      </table>

    </div>
  );
}

export default CommonTable;