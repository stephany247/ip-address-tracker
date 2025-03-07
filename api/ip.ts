import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { ip } = req.query; // Get IP address from request query

  if (!ip) {
    return res.status(400).json({ error: "IP address is required" });
  }

  const API_KEY = process.env.IPIFY_API_KEY; // Secure API Key (Not exposed)
  const BASE_URL = "https://geo.ipify.org/api/v2/country,city";

  try {
    const response = await axios.get(`${BASE_URL}?apiKey=${API_KEY}&ipAddress=${ip}`);
    res.status(200).json(response.data); // Send data back to frontend
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch IP data" });
  }
}
