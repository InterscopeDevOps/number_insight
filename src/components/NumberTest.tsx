
interface SearchResult {
  searchResults: any[];
  loading: boolean;
  error: string | null;
}

const NumberTest = ({ searchResults, loading, error }: SearchResult) => {


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
          <span className="my-6 text-[24px]">Cargando...</span>
        </div>
      )}
      <div className="overflow-x-scroll">
        {error && <div>{error}</div>}
        {searchResults.length > 1 && (
          <table className="table-auto w-full mt-4 ">
            <thead>
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Llamadas</th>
                <th className="px-4 py-2">Ultima Llamada</th>
                <th className="px-4 py-2">Reputación</th>
                <th className="px-4 py-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((searchResult, index) => {
                const lastCallString =
                  searchResult.phone_number_reputation_details.last_call;
                const lastCallDate = new Date(lastCallString);
                const timeElapsed = timeSince(lastCallDate);
                return (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : ""}
                  >
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{searchResult.phone_number}</td>
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
              {/* <h3 className="text-2xl font-semibold mt-4">
            Resultado {index + 1}
          </h3> */}
              <div className="flex md:flex-row my-4">
                <div className="md:w-[60%] w-full flex flex-col bg-gray-100 p-6 rounded-2xl m-2">
                  <span className="flex flex-col">
                    <strong className="text-[34px] text-orange-600">
                      {searchResult.phone_number}
                    </strong>
                  </span>
                  <span className="flex text-[18px] capitalize flex-col">
                    <span>Llamada Reciente:</span>
                    <strong className="text-[20px]">{timeElapsed}</strong>
                  </span>
                  <span className="flex text-[18px] capitalize flex-col">
                    <span>Numero de Llamadas:</span>
                    <strong className="text-[20px]">
                      {
                        searchResult.phone_number_reputation_details
                          .reputation_ratio
                      }
                    </strong>
                  </span>
                  <span className="flex text-[18px] capitalize flex-col">
                    <span>Reputación</span>
                    <strong className="text-[20px]">
                      {
                        searchResult.phone_number_reputation_details
                          .block_status
                      }
                    </strong>
                  </span>
                </div>
                <div className="md:w-[40%] w-full flex self-center justify-center bg-gray-100 p-4 rounded-2xl">
                  <div className="w-full flex flex-col bg-gray-100 p-6 rounded-2xl m-2">
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
