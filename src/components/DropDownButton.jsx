
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function DropdownButton({
  options = [],
  selectedKey,
  onChange,
  placeholder = "Select Department",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const current = options.find(o => o.key === selectedKey);

  return (
    <div ref={ref} className="relative inline-block w-full max-w-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center justify-between"
      >
        <span className="font-medium text-gray-800">{current?.label || placeholder}</span>
        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          {options.map((o) => (
            <button
              key={o.key}
              onClick={() => {
                onChange(o.key);
                setIsOpen(false);
              }}
                 className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-150"
            >
             <span className="font-medium text-gray-800">{o.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );




}