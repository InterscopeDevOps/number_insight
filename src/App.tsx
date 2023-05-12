import { useState } from "react";
import NumberTest from "./components/NumberTest";
import SearchBar from "./components/SearchBar";
4;
import Swal from "sweetalert2";
import axios, { AxiosResponse } from "axios";
import NumberSearch from "./components/NumberSearch";

function App() {
  const [phoneNumberInput, setPhoneNumberInput] = useState<string>("");
  const [searchResults1, setSearchResults1] = useState<any[]>([]);
  const [searchResults2, setSearchResults2] = useState<any[]>([]);
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

    setSearchResults1([]);
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

      setSearchResults1(responses);
    } catch (err) {
      console.error(err);
      setSearchResults1([]);
      setError("Error al buscar los números de teléfono");
    } finally {
      setLoading(false);
    }
  };

  const searchPhoneNumbersTest = async () => {
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

    setSearchResults2([]);
    setLoading(true);
    setError(null);

    try {
      const responses = await Promise.all(
        phoneNumbers.map(async (phoneNumber) => {
          const formattedPhoneNumber = `+${phoneNumber}`;
          const options = {
            method: "GET",
            url: "https://robokiller-call-confidence.p.rapidapi.com/reputation",
            params: {
              from: formattedPhoneNumber,
            },
            headers: {
              "X-RapidAPI-Key":
                "e29fed23a7mshbd06921c24acc07p1e9ebdjsn979db1c44c30",
              "X-RapidAPI-Host": "robokiller-call-confidence.p.rapidapi.com",
            },
          };

          const response: AxiosResponse = await axios.request(options);
          return response.data;
        })
      );

      setSearchResults2(responses);
    } catch (err) {
      console.error(err);
      setSearchResults2([]);
      setError("Error al buscar los números de teléfono");
    } finally {
      setLoading(false);
    }
  };

  const Excute2Function = () => {
    searchPhoneNumbers();
    searchPhoneNumbersTest();
  };

  const copyToClipboard1 = () => {
    const headers = ["#", "Dialcode", "Estate", "Risk Level", "Reputación"];

    const data = searchResults1.map((searchResult, index) => [
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

  const copyToClipboard2 = () => {
    const headers = [
      "#",
      "Phone",
      "Llamadas",
      "Ultima Llamada",
      "Reputación",
      "Estado",
    ];

    const data = searchResults2.map((searchResult, index) => [
      index + 1,
      searchResult.phone_number.substring(1),
      searchResult.phone_number_reputation_details.number_of_calls,
      searchResult.phone_number_reputation_details.last_call_time,
      searchResult.reputation,
      searchResult.phone_number_reputation_details.block_status ||
        "No disponible",
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

  const Copy2Clipboard = () => {
    copyToClipboard1();
    copyToClipboard2();
  };

  return (
    <>
      <div className="w-full">
        <div className="md:w-[90%] w-full px-4 mx-auto mb-10 mt-10">
          <div className="flex justify-center flex-col items-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/searchapp-25415.appspot.com/o/LOGO%20RDG%20S.A%20copia.png?alt=media&token=05f78069-f771-4deb-a19a-b950bdcd458b"
              className="w-[100px]"
              alt="logo"
            />
            <h1 className="md:text-[38px] text-[20px] font-bold text-center dark:text-white">
              Validate Number
            </h1>
          </div>
          <SearchBar
            searchPhoneNumbers={Excute2Function}
            phoneNumberInput={phoneNumberInput}
            setPhoneNumberInput={setPhoneNumberInput}
            copyToClipboard={Copy2Clipboard}
          />
          <div className="flex gap-6 w-full my-10">
            <div className="md:w-[50%] sticky-column h-[90vh]">
              <h1 className="text-center text-[34px] font-bold dark:text-white">
                RoboKiller{" "}
              </h1>
              <NumberTest
                searchResults={searchResults2}
                error={error}
                loading={loading}
              />
            </div>
            <div className="md:w-[50%]">
              <h1 className="text-center text-[34px] font-bold dark:text-white">
                Scout
              </h1>
              <NumberSearch
                searchResults={searchResults1}
                error={error}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
