import axios from "axios";
// import {extractDomain} from "./extractDomain"

const API_KEY = import.meta.env.VITE_IPIFY_API_KEY;
const BASE_URL = "https://geo.ipify.org/api/v2/country,city";

// export const getIPData = async (ip: string) => {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}?apiKey=${API_KEY}&ipAddress=${ip}`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching IP data:", error);
//     return null;
//   }
// };


export const getIPData = async (input: string, isIP: boolean) => {
  try {
    let url = `${BASE_URL}?apiKey=${API_KEY}`;

    if (isIP) {
      url += `&ipAddress=${input}`;
    } else {
      url += `&domain=${input}`;
    }

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching IP data:", error);
    return null;
  }
};;
