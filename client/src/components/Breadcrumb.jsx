import { useLocation } from "react-router-dom";

function Breadcrumb() {
  const location = useLocation();

  const pathnames = location.pathname
    .split("/")
    .filter((x) => x);

  return (
    <div className="bg-white px-5 py-3 rounded-lg shadow mb-4">
      <p className="text-gray-600 text-sm">

        Dashboard

        {pathnames.map((name, index) => (
          <span key={index}>
            {" > "}
            {name
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())}
          </span>
        ))}

      </p>
    </div>
  );
}

export default Breadcrumb;