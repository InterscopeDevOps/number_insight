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
          <span className="my-6 text-[24px] text-[#00A7C4]">Cargando...</span>
        </div>
      )}
      <div className="overflow-x-scroll">
        {error && <div>{error}</div>}
        {searchResults.length > 1 && (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-100">
            <thead className="text-[14px] text-gray-700 uppercase font-bold bg-gray-50 dark:bg-gray-700 dark:text-[#00A7C4]">
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
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
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
            <div className="flex md:flex-row">
              <div className="md:w-[50%] w-full flex flex-col dark:bg-[#0F172A] p-6 rounded-2xl m-2 dark:text-white relative overflow-hidden">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/searchapp-25415.appspot.com/o/LOGO%20RDG%20S.A%20copia.png?alt=media&token=05f78069-f771-4deb-a19a-b950bdcd458b"
                  className="absolute bottom-[-40px] right-[-20px] w-[200px] opacity-20"
                  alt="logo"
                />
                <span className="flex flex-col">
                  <span className="text-[24px] ">Dialcode:</span>
                  <strong className="text-[26px] text-[#00A7C4]">
                    {searchResult.dialcode_e164}
                  </strong>
                </span>
                <span className="flex flex-col">
                  <span className="text-[24px] ">Risk Rating:</span>
                  <strong className="text-[26px] text-[#00A7C4]">
                    {searchResult.risk_rating}
                  </strong>
                </span>

                <span className="flex flex-col">
                  <span className="text-[24px] ">Estate</span>
                  <strong className="text-[26px] text-[#00A7C4]">
                    {searchResult.administrative_area_level_1
                      ? searchResult.administrative_area_level_1
                      : "No disponible"}
                  </strong>
                </span>
              </div>
              <div className="md:w-[50%] w-full flex flex-col dark:bg-[#0F172A] p-6 rounded-2xl m-2 dark:text-white">
                <div className="h-full flex justify-center">
                  <RiskBar
                    width="120"
                    heigth="120"
                    riskRating={searchResult.risk_level}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default NumberSearch;
