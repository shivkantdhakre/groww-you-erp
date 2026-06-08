function EmptyState({
  message = "No Data Found",
}) {
  return (
    <div className="bg-white p-10 rounded-xl shadow text-center">

      <h2 className="text-xl font-semibold text-gray-500">
        {message}
      </h2>

    </div>
  );
}

export default EmptyState;