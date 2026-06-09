function EmptyState({
  icon = "📂",
  message = "No Data Found",
  buttonText = "Add New",
  onButtonClick = () => { },
}) {
  return (
    <div className="bg-white p-10 rounded-xl shadow text-center">

      <div className="text-6xl mb-4">
        {icon}
      </div>

      <h2 className="text-xl font-semibold text-gray-500 mb-4">
        {message}
      </h2>

      <button
        onClick={onButtonClick}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
      >
        {buttonText}
      </button>

    </div>
  );
}

export default EmptyState;