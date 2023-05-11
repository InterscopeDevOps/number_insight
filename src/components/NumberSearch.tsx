import RiskBar from "./RiskBar";

interface SearchResult {
  searchResults: any[];
  loading: boolean;
  error: string | null;
}

const NumberSearch = ({ searchResults, loading, error }: SearchResult) => {
  

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
                <th className="px-4 py-2">Dialcode</th>
                <th className="px-4 py-2">Estate</th>
                <th className="px-4 py-2">Risk Level</th>
                <th className="px-4 py-2">Reputación</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((searchResult, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                >
                   <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    {searchResult.dialcode_e164}
                  </td>
                  <td className="border px-4 py-2">
                    {searchResult.risk_rating}
                  </td>
                  
                  <td className="border px-4 py-2">
                    {searchResult.administrative_area_level_1
                      ? searchResult.administrative_area_level_1
                      : "No disponible"}
                  </td>
                  <td className="border px-4 py-2">
                    <RiskBar
                      width="60"
                      heigth="60"
                      riskRating={searchResult.risk_level}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {searchResults.length === 1 &&
        searchResults.map((searchResult, index) => (
          <div key={index}>
            {/* <h3 className="text-2xl font-semibold mt-4">
              Resultado {index + 1}
            </h3> */}
            <div className="flex md:flex-row">
              <div className="md:w-[50%] w-full flex flex-col bg-gray-100 p-6 rounded-2xl m-2">
                <span className="flex flex-col">
                  <span className="text-[24px] ">Dialcode:</span>
                  <strong className="text-[34px] text-orange-600">
                    {searchResult.dialcode_e164}
                  </strong>
                </span>
                <span className="flex flex-col">
                  <span className="text-[24px] ">Risk Rating:</span>
                  <strong className="text-[34px] capitalize text-blue-600">
                    {searchResult.risk_rating}
                  </strong>
                </span>

                <span className="flex flex-col">
                  <span className="text-[24px] ">Estate</span>
                  <strong className="text-[34px] text-green-600">
                    {searchResult.administrative_area_level_1
                      ? searchResult.administrative_area_level_1
                      : "No disponible"}
                  </strong>
                </span>
              </div>
              <div className="md:w-[50%] w-full flex self-center justify-center bg-gray-100 p-4 rounded-2xl">
                <RiskBar
                  width="120"
                  heigth="120"
                  riskRating={searchResult.risk_level}
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default NumberSearch;
