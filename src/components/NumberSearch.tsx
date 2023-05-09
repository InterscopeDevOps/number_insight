import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import RiskBar from "./RiskBar";

const NumberSearch: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const searchPhoneNumber = async () => {
    const options = {
      method: "GET",
      url: "https://scout.p.rapidapi.com/v1/numbers/search",
      params: { dialcode: phoneNumber },
      headers: {
        "X-RapidAPI-Key": "e29fed23a7mshbd06921c24acc07p1e9ebdjsn979db1c44c30",
        "X-RapidAPI-Host": "scout.p.rapidapi.com",
      },
    };

    try {
      const response: AxiosResponse = await axios.request(options);
      setSearchResult(response.data);
      console.log(response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setSearchResult(null);
      setError("Error al buscar el número de teléfono");
    }
  };

  return (
    <div>
      <div className="flex my-4 gap-4">
        <input
          type="number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Ingrese el número de teléfono"
          className="w-full px-3 py-4 text-sm text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none"
        />
        <button
          className="md:w-[220px] w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={searchPhoneNumber}
        >
          Buscar
        </button>
      </div>
      {error && <div>{error}</div>}
      {searchResult && (
        <>
          {/* <div>
            <pre>{JSON.stringify(searchResult, null, 2)}</pre>
          </div> */}
          <div className="flex md:flex-row">
            <div className="md:w-[50%] w-full flex flex-col bg-gray-100 p-6 rounded-2xl m-2">
              <span className="flex flex-col">
                <span className="text-[24px] ">Dialcode E164:</span>
                <strong className="text-[34px] ">
                  {searchResult.dialcode_e164}
                </strong>
              </span>
              <span className="flex flex-col">
                <span className="text-[24px] ">Risk Rating:</span>
                <strong className="text-[34px] capitalize">
                  {searchResult.risk_rating}
                </strong>
              </span>
            </div>
            <div className="md:w-[50%] w-full flex self-center justify-center bg-gray-100 p-4 rounded-2xl">
              <RiskBar riskRating={searchResult.risk_level} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NumberSearch;
