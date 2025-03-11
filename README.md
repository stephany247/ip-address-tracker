# IP Address Tracker

## Overview
The **IP Address Tracker** is a web application that allows users to search for IP addresses or domain names to retrieve geographic and network-related data. The application provides information such as the IP address, location, timezone, and ISP, along with a map displaying the location.

## Features
- Search for an **IP address** or **domain name**
- Automatically resolves domain names to their corresponding IP addresses
- Displays key information including:
  - IP Address
  - Location (City, Region, Country)
  - Timezone
  - ISP (Internet Service Provider)
- Interactive map visualization of the IP location

## Technologies Used
- **Vite** – Build tool for faster development
- **React** – Frontend framework for building the UI
- **TypeScript** – Ensuring type safety and improved development experience
- **Tailwind CSS** – Styling the application efficiently
- **React Leaflet** – Displaying the IP location on a map
- **IP Geolocation API** – Fetching IP address details

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/ip-address-tracker.git
   cd ip-address-tracker
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your API key:
   ```env
   VITE_IP_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```sh
   npm run dev
   ```

## Usage
- Enter an **IP address** (e.g., `8.8.8.8`) or a **domain name** (e.g., `google.com`) in the search bar.
- Click the **Search** button to fetch and display the IP details.
- If a domain name is entered, it is first resolved to an IP address before fetching data.
- The results, along with a map, are displayed on the page.


## API Reference
This project uses an **IP Geolocation API**. To use it, obtain an API key from a provider such as:
- [ipify](https://www.ipify.org/)
- [IP Geolocation API](https://ipgeolocation.io/)

Example API request:
```sh
GET https://api.ipgeolocation.io/ipgeo?apiKey=YOUR_API_KEY&ip=8.8.8.8
```

## Future Enhancements
- Improve error handling and user feedback
- Add dark mode
- Allow users to track their own public IP automatically

## License
This project is licensed under the [MIT License](LICENSE).

## Acknowledgments
- Frontend Mentor for the challenge inspiration
- Open-source libraries used in this project
