import { useMemo, useState } from "react";
import { BsArrowBarDown } from "react-icons/bs";

interface SearchResult {
  searchResults: any[];
  loading: boolean;
  error: string | null;
}

interface SortConfig {
  key: string | null;
  direction: "asc" | "desc";
}

const NumberTest = ({ searchResults, loading, error }: SearchResult) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });

  const onSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };



// Sort the results
  const sortedResults = useMemo(() => {
    if (sortConfig.key) {
      const sorted = [...searchResults].sort((a, b) => {
        if (sortConfig.key) {
          const aValue = sortConfig.key.split(".").reduce((o, i) => o[i], a);
          const bValue = sortConfig.key.split(".").reduce((o, i) => o[i], b);

          if (typeof aValue === "string" && typeof bValue === "string") {
            return aValue.localeCompare(bValue);
          }

          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        }
        return 0;
      });

      return sortConfig.direction === "asc" ? sorted : sorted.reverse();
    }
    return searchResults;
  }, [searchResults, sortConfig]);

  function timeSince(date: Date): string {
    const now: Date = new Date();
    const seconds: number = Math.floor((now.getTime() - date.getTime()) / 1000);
    const minutes: number = Math.floor(seconds / 60);
    const hours: number = Math.floor(minutes / 60);
    const days: number = Math.floor(hours / 24);

    if (days > 0) {
      return `hace ${days} días`;
    } else if (hours > 0) {
      return `hace ${hours} horas`;
    } else if (minutes > 0) {
      return `hace ${minutes} minutos`;
    } else {
      return `hace ${seconds} segundos`;
    }
  }

  // Convertir la cadena de tiempo en un objeto de fecha y calcular el tiempo transcurrido

  return (
    <div>
      {loading && (
        <div className="flex justify-center">
          <span className="my-6 text-[24px] text-[#00A7C4]">Cargando...</span>
        </div>
      )}
      <div className="overflow-x-scroll">
        {error && <div>{error}</div>}
        {searchResults.length > 1 && (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-100">
            <thead className="text-[13px] text-gray-700 uppercase font-bold bg-gray-50 dark:bg-gray-700 dark:text-[#00A7C4]">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Llamadas</th>
                <th className="px-4 py-2">Ultima Llamada</th>
                <th className="px-4 py-2">Reputación</th>
                <th className="px-4 py-2 flex self-center items-center">
                  <button
                    onClick={() =>
                      onSort("phone_number_reputation_details.block_status")
                    }
                  >
                    <BsArrowBarDown className="mr-1" />
                  </button>
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedResults.map((searchResult, index) => {
                const lastCallString =
                  searchResult.phone_number_reputation_details.last_call;
                const lastCallDate = new Date(lastCallString);
                const timeElapsed = timeSince(lastCallDate);
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">
                      {searchResult.phone_number}
                    </td>
                    <td className="border px-4 py-2">
                      {
                        searchResult.phone_number_reputation_details
                          .number_of_calls
                      }
                    </td>
                    <td className="border px-4 py-2">{timeElapsed}</td>
                    <td className="border px-4 py-2 capitalize">
                      {searchResult.reputation}
                    </td>
                    <td className="border px-4 py-2">
                      {
                        searchResult.phone_number_reputation_details
                          .block_status
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {searchResults.length === 1 &&
        searchResults.map((searchResult, index) => {
          const lastCallString =
            searchResult.phone_number_reputation_details.last_call;
          const lastCallDate = new Date(lastCallString);
          const timeElapsed = timeSince(lastCallDate);
          return (
            <div key={index}>
              <div className="flex md:flex-row my-4">
                <div className="md:w-[50%] w-full flex flex-col dark:bg-[#0F172A] p-6 rounded-2xl m-2 dark:text-white relative overflow-hidden">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/searchapp-25415.appspot.com/o/LOGO%20RDG%20S.A%20copia.png?alt=media&token=05f78069-f771-4deb-a19a-b950bdcd458b"
                    className="absolute bottom-[-40px] right-[-20px] w-[200px] opacity-20"
                    alt="logo"
                  />
                  <span className="flex flex-col">
                    <strong className="text-[26px] text-[#00A7C4]">
                      {searchResult.phone_number}
                    </strong>
                  </span>
                  <span className="flex text-[18px] capitalize flex-col">
                    <span>Llamada Reciente:</span>
                    <strong className="text-[26px] text-[#00A7C4]">
                      {timeElapsed}
                    </strong>
                  </span>
                  <span className="flex text-[18px] capitalize flex-col">
                    <span>Numero de Llamadas:</span>
                    <strong className="text-[26px] text-[#00A7C4]">
                      {
                        searchResult.phone_number_reputation_details
                          .reputation_ratio
                      }
                    </strong>
                  </span>
                  <span className="flex text-[18px] capitalize flex-col">
                    <span>Reputación</span>
                    <strong className="text-[26px] text-[#00A7C4]">
                      {
                        searchResult.phone_number_reputation_details
                          .block_status
                      }
                    </strong>
                  </span>
                </div>
                <div className="md:w-[50%] w-full flex flex-col dark:bg-[#0F172A] p-6 rounded-2xl m-2 dark:text-white">
                  <div className="w-full flex flex-col p-6 rounded-2xl m-2">
                    <span className="flex text-[20px] flex-col text-center capitalize">
                      <strong className="text-[28px]">
                        {searchResult.reputation}
                      </strong>
                      <span>Reputacion</span>
                    </span>
                    <span className="flex text-[20px] flex-col text-center capitalize justify-between">
                      <strong className="text-[28px]">
                        {
                          searchResult.phone_number_reputation_details
                            .block_status
                        }
                      </strong>
                      <span>Robokiller Status</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default NumberTest;
