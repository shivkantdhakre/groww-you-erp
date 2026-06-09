function Skeleton({ type = "card" }) {

  if (type === "card") {
    return (
      <div className="bg-white p-5 rounded-xl shadow animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (type === "form") {
    return (
      <div className="bg-white p-5 rounded-xl shadow animate-pulse">
        <div className="grid grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="h-12 bg-gray-200 rounded"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className="bg-white p-5 rounded-xl shadow animate-pulse">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="h-12 bg-gray-200 rounded mb-3"
          ></div>
        ))}
      </div>
    );
  }

  if (type === "dashboard") {
    return (
      <div className="grid grid-cols-4 gap-4 animate-pulse">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow"
          >
            <div className="h-6 bg-gray-300 rounded mb-3"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export default Skeleton;