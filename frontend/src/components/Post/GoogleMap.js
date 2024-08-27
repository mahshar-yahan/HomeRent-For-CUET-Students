import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import React, { useEffect, useRef, useState } from "react";
import "./map.css";

const GoogleMap = ({ latitude, longitude }) => {
  // console.log(latitude, longitude);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const tokyo = { longitude: longitude, latitude: latitude };
  const [zoom] = useState(14);
  maptilersdk.config.apiKey = process.env.REACT_APP_MAP_KEY;
  //   console.log(process.env.REACT_APP_MAP_KEY);

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [tokyo.longitude, tokyo.latitude],
      zoom: zoom,
    });

    new maptilersdk.Marker({ color: "#FF0000" })
      .setLngLat([longitude, latitude])
      .addTo(map.current);
  }, [tokyo.longitude, tokyo.latitude, zoom]);

  return (
    <>
      <div className="map-wrap rounded-lg border-current">
        <div ref={mapContainer} className="map" />
      </div>
    </>
  );
};

export default GoogleMap;
