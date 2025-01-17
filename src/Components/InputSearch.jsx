import { FaSearch } from "react-icons/fa";

const InputSearch = ({
  onSearch,
  placeholder = "Search by camp name, participant...",
}) => {
  return (
    <div className="relative w-full my-8 container mx-auto">
      <input
        type="text"
        // value={searchText}
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <FaSearch className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
    </div>
  );
};

export default InputSearch;
