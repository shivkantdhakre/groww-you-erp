import { useState, useEffect, useRef } from "react";

function Autocomplete({
  options = [],
  labelKey = "name",
  valueKey = "id",
  placeholder = "Search...",
  onSelect,
  selectedId = null,
  onClear = null,
  searchFields = ["name"],
  customRender = null
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef(null);

  // Find currently selected option
  const selectedOption = options.find((opt) => opt[valueKey] === selectedId);

  useEffect(() => {
    if (selectedOption) {
      setSearchTerm(selectedOption[labelKey]);
    } else {
      setSearchTerm("");
    }
  }, [selectedOption, labelKey]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        // Reset search term to selected option's name when closing
        if (selectedOption) {
          setSearchTerm(selectedOption[labelKey]);
        } else {
          setSearchTerm("");
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedOption, labelKey]);

  const filteredOptions = options.filter((opt) => {
    const term = searchTerm.toLowerCase();
    return searchFields.some((field) => {
      const val = opt[field];
      return val && String(val).toLowerCase().includes(term);
    });
  });

  const handleSelect = (option) => {
    onSelect(option);
    setSearchTerm(option[labelKey]);
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
    if (e.target.value === "" && onClear) {
      onClear();
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="border p-3 rounded-lg w-full bg-white pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              if (onClear) onClear();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && (
        <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto divide-y divide-gray-100">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option[valueKey]}
                onClick={() => handleSelect(option)}
                className="p-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150 text-gray-700 flex justify-between items-center"
              >
                {customRender ? (
                  customRender(option)
                ) : (
                  <span>{option[labelKey]}</span>
                )}
              </li>
            ))
          ) : (
            <li className="p-3 text-gray-400 text-center">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default Autocomplete;
