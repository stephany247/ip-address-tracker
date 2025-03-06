import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import locationIcon from "./../assets/images/icon-location.svg";
import L from "leaflet";
import { useEffect } from "react";

const customIcon = L.icon({
  iconUrl: locationIcon,
  iconSize: [22, 32],
  iconAnchor: [0, 0],
  popupAnchor: [10, 1],
});

interface MapProps {
  lat: number;
  lng: number;
  city: string;
  country: string;
}

const Map = ({ lat, lng, city, country }: MapProps) => {
  function SetViewOnLoad() {
    const map = useMap();
    useEffect(() => {
      map.setView([lat, lng], 13);
    }, [map]);

    return null;
  }

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={16}
      scrollWheelZoom={true}
      className="w-full h-[500px] relative z-10 shadow-md"
    >
      {/* Tile layer (background map) */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* Marker on the map */}
      <Marker position={[lat, lng]} icon={customIcon}>
        <Popup>{`${city}, ${country}`}</Popup>
      </Marker>
      <SetViewOnLoad /> {/* This ensures the map centers on load */}
    </MapContainer>
  );
};

export default Map;
