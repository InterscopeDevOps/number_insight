import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import RiskBar from "./RiskBar";
import Swal from "sweetalert2";
import { MdContentCopy } from "react-icons/md";
import { BsSearch } from "react-icons/bs";

const NumberSearch: React.FC = () => {
  const [phoneNumberInput, setPhoneNumberInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const searchPhoneNumbers = async () => {
    const phoneNumbers = phoneNumberInput
      .split(" ")
      .filter((phoneNumber) => phoneNumber.length === 11)
      .slice(0, 15);

    if (phoneNumbers.length > 15) {
      phoneNumbers.splice(15);
      Swal.fire({
        icon: "warning",
        title: "Atención",
        text: "Se han ingresado más de 15 números. Se tomarán en cuenta solo los primeros 15.",
      });
    }

    if (phoneNumbers.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Atención",
        text: "No has ingresado ningun número!",
      });
    }

    setSearchResults([]);
    setLoading(true);
    setError(null);

    try {
      const responses = await Promise.all(
        phoneNumbers.map(async (phoneNumber) => {
          const formattedPhoneNumber = `+${phoneNumber}`;
          const options = {
            method: "GET",
            url: "https://scout.p.rapidapi.com/v1/numbers/search",
            params: {
              dialcode: formattedPhoneNumber,
            },
            headers: {
              "X-RapidAPI-Key":
                "e29fed23a7mshbd06921c24acc07p1e9ebdjsn979db1c44c30",
              "X-RapidAPI-Host": "scout.p.rapidapi.com",
            },
          };

          const response: AxiosResponse = await axios.request(options);
          return response.data;
        })
      );

      setSearchResults(responses);
    } catch (err) {
      console.error(err);
      setSearchResults([]);
      setError("Error al buscar los números de teléfono");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    const headers = [
      "Resultado",
      "Dialcode",
      "Risk Rating",
      "Estate",
      "Risk Level",
    ];
    const data = searchResults.map((searchResult, index) => [
      index + 1,
      searchResult.dialcode_e164.substring(1),
      searchResult.risk_rating,
      searchResult.administrative_area_level_1 || "No disponible",
      searchResult.risk_level,
    ]);

    const csvContent = [headers, ...data]
      .map((row) => row.join("\t"))
      .join("\n");

    navigator.clipboard.writeText(csvContent).then(
      () => {
        Swal.fire({
          icon: "success",
          title: "Copiado al portapapeles",
          text: "Los datos se han copiado en el portapapeles en formato CSV compatible con Excel.",
        });
      },
      (err) => {
        console.error("Error al copiar los datos en el portapapeles: ", err);
        Swal.fire({
          icon: "error",
          title: "Error al copiar",
          text: "Error al copiar los datos en el portapapeles.",
        });
      }
    );
  };

  return (
    <div>
      <div className="flex md:flex-row flex-col my-4 gap-4">
        <input
          type="text"
          value={phoneNumberInput}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/[^0-9\s]/g, "");
            setPhoneNumberInput(numericValue);
          }}
          placeholder="Ingrese hasta 15 números de teléfono separados por espacios"
          maxLength={170}
          className="w-full px-3 py-4 text-sm text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none"
        />

        <button
          className="flex items-center justify-center md:w-[220px] w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={searchPhoneNumbers}
        >
          <BsSearch className="text-[20px] mr-2" />
          <span>Buscar</span>
        </button>
        <button
          className="flex items-center justify-center md:w-[220px] w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={copyToClipboard}
        >
          <MdContentCopy className="text-[20px] mr-2" />
          <span>Copiar</span>
        </button>
      </div>
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
                <th className="px-4 py-2">Resultado</th>
                <th className="px-4 py-2">Dialcode</th>
                <th className="px-4 py-2">Risk Rating</th>
                <th className="px-4 py-2">Estate</th>
                <th className="px-4 py-2">Risk Level</th>
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
                  <td className="border px-4 py-2 capitalize">
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
