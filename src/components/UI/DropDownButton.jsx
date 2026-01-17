import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function DropdownButton({
  options = {}, 
  selectedKey,
  onChange,
  placeholder = "Select an option",
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

 
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentOption = options[selectedKey];

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block w-full max-w-md ${className}`}
    >
      {/* Dropdown button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center justify-between"
      >
        <span className="font-medium text-gray-800">
          {currentOption?.name || placeholder}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown list */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          {Object.entries(options).map(([key, opt]) => (
            <button
              key={key}
              onClick={() => {
                onChange?.(key);
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-150"
            >
              <span className="font-medium text-gray-800">{opt.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
