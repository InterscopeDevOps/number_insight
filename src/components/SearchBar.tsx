import { BsSearch } from "react-icons/bs";
import { MdContentCopy } from "react-icons/md";

interface SearchBarProps {
  searchPhoneNumbers: () => void;
  phoneNumberInput: string;
  setPhoneNumberInput : (value: string) => void;
  copyToClipboard: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchPhoneNumbers, phoneNumberInput, setPhoneNumberInput, copyToClipboard }) => {
  

  return (
    <div className="flex md:flex-row flex-col my-4 gap-4">
      <input
        type="text"
        value={phoneNumberInput}
        onChange={(e) => {
          const numericValue = e.target.value.replace(/[^0-9\s]/g, "");
          setPhoneNumberInput(numericValue);
        }}
        placeholder="Ingrese hasta 15 números de teléfono separados por espacios"
        maxLength={168}
        className="w-full px-3 py-4 text-sm text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none"
      />

      <button
        className="flex items-center justify-center md:w-[220px] w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={searchPhoneNumbers}
      >
        <BsSearch className="text-[20px] mr-2" />
        <span>Buscar</span>
      </button>
      <button
        className="flex items-center justify-center md:w-[220px] w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={copyToClipboard}
      >
        <MdContentCopy className="text-[20px] mr-2" />
        <span>Copiar</span>
      </button>
    </div>
  );
};

export default SearchBar;
