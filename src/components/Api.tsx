import axios from "axios";

// const API_KEY = import.meta.env.VITE_IPIFY_API_KEY;
// const BASE_URL = "https://geo.ipify.org/api/v2/country,city";

export const getIPData = async (ip: string) => {
  try {
    const response = await axios.get(`/api/ip?ip=${ip}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching IP data:", error);
    return null;
  }
};
