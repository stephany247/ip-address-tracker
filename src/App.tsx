import { useEffect, useState } from "react";
import "./App.css";
import iconArrow from "./assets/images/icon-arrow.svg";
import Map from "./components/Map";
import { getIPData } from "./components/Api";

function App() {
  const dataFields = [
    { label: "IP Address", key: "ip" },
    { label: "Location", key: "location" },
    { label: "Timezone", key: "timezone" },
    { label: "ISP", key: "isp" },
  ];

  const [ip, setIp] = useState("");
  interface IPData {
    ip: string;
    location: {
      lat: number;
      lng: number;
      city: string;
      country: string;
      timezone: string;
    };
    isp: string;
  }

  const [ipData, setIpData] = useState<IPData | null>(null);
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  const [error, setError] = useState("");

  const isValidIP = (ip: string) => {
    const ipv4Regex =
      /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}$/;
    const ipv6Regex =
      /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9]))$/;

    return ipv4Regex.test(ip) || ipv6Regex.test(ip);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidIP(ip)) {
      setError("Please enter a valid IP address.");
      return;
    }

    setError("");
    console.log("Fetching data for IP:", ip);
    const data = await getIPData(ip);

    if (data) {
      console.log("Fetched Data:", data);
      setIpData(data);
      setCoords({ lat: data.location.lat, lng: data.location.lng });
    } else {
      console.error("Error: No data returned from API.");
    }
  };

  useEffect(() => {
    const getUserIP = async () => {
      try {
        const res = await fetch("https://api64.ipify.org?format=json");
        const data = await res.json();
        setIp(data.ip);
        const ipData = await getIPData(data.ip);
        if (ipData) {
          setIpData(ipData);
          setCoords({ lat: ipData.location.lat, lng: ipData.location.lng });
        }
      } catch (error) {
        console.error("Error fetching user's IP:", error);
      }
    };

    getUserIP();
  }, []);

  return (
    <main>
      {/* Header Section */}
      <div className='bg-[url("./assets/images/pattern-bg-mobile.png")] sm:bg-[url("./assets/images/pattern-bg-desktop.png")] bg-cover bg-top bg-no-repeat p-4 sm:p-6 space-y-6 flex flex-col items-center h-[40vh] sm:h-[40vh]'>
        <h1 className="text-center font-medium text-3xl text-white">
          IP Address Tracker
        </h1>
        <article className="space-y-1 w-11/12 flex justify-center">
          <form className="bg-white flex items-center justify-between rounded-xl w-full max-w-lg">
            <input
              type="search"
              placeholder="Search for any IP address or domain"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className="w-full pl-4 pr-2 outline-none"
            />

            <button
              type="submit"
              className="bg-very-dark-gray hover:bg-very-dark-gray/85 w-fit p-5 rounded-r-xl transition duration-300 ease-in-out"
              onClick={handleSearch}
            >
              <img src={iconArrow} alt="search"></img>
            </button>
          </form>
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </article>

        {/* Info Cards Section */}
        <article className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-4 p-8 bg-white rounded-lg shadow-md absolute top-1/4 sm:mt-6 z-50 w-10/12 sm:w-10/12 lg:divide-x divide-solid divide-dark-gray">
          {dataFields.map(({ label, key }, index) => {
            let value = "Loading...";

            if (ipData) {
              value =
                key === "location"
                  ? `${ipData.location.city}, ${ipData.location.country}`
                  : key === "timezone"
                  ? `UTC ${ipData.location.timezone}`
                  : ipData[key as keyof typeof ipData]?.toString() || "";
            }
            return (
              <div
                key={index}
                className="flex flex-col justify-start items-center sm:items-start gap-2 px-2"
              >
                <p className="text-dark-gray uppercase text-xs font-bold">
                  {label}
                </p>
                <p className="text-gray-900 text-lg sm:text-xl font-bold text-center text-wrap sm:text-start">
                  {value}
                </p>
              </div>
            );
          })}
        </article>
      </div>
      {/* Map Section */}
      <section className="h-[60vh] w-full z-0">
        <Map
          lat={coords.lat}
          lng={coords.lng}
          city={ipData?.location.city || "Unknown"}
          country={ipData?.location.country || "Unknown"}
        />
      </section>
    </main>
  );
}

export default App;
