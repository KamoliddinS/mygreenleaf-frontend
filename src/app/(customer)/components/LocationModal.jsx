"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const MAP_CONTAINER_STYLE = {
  width: "100%",
  height: "300px",
};

const DEFAULT_CENTER = { lat: 41.3111, lng: 69.2796 }; // Tashkent

export default function LocationModal({
  open,
  setOpen,
  onLocationSelected,
  isLoaded,
}) {
  const [manualMode, setManualMode] = useState(false);
  const [mapMode, setMapMode] = useState(false);
  const [markerPos, setMarkerPos] = useState(null);
  const [geoError, setGeoError] = useState("");
  const [address, setAddress] = useState("");
  const searchBoxRef = useRef(null);
  const mapRef = useRef(null);

  const onClose = () => setOpen(false);

  const handleUseMyLocation = () => {
    setGeoError("");
    if (!navigator?.geolocation) {
      setGeoError("Geolocation is not available.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setMarkerPos({ lat: latitude, lng: longitude });
        mapRef.current?.panTo({ lat: latitude, lng: longitude });
        onLocationSelected({ latitude, longitude });
      },
      (err) => setGeoError(err.message)
    );
  };

  const handlePlacesChanged = () => {
    if (!searchBoxRef.current) return;

    const places = searchBoxRef.current.getPlaces();
    if (!places?.length) return;

    const place = places[0];
    const location = place.geometry.location;
    const lat = location.lat();
    const lng = location.lng();

    setMarkerPos({ lat, lng });
    setAddress(place.formatted_address || place.name);
    mapRef.current?.panTo({ lat, lng });
    onLocationSelected({ latitude: lat, longitude: lng, address: place.formatted_address });
  };

  const onMapLoad = (map) => {
    mapRef.current = map;

    // Custom locate button
    const controlDiv = document.createElement("div");
    controlDiv.className = "bg-white rounded-full shadow-md p-2 cursor-pointer";
    controlDiv.style.margin = "10px";

    const controlIcon = document.createElement("div");
    controlIcon.innerHTML = "📍";
    controlDiv.appendChild(controlIcon);
    controlDiv.onclick = handleUseMyLocation;

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);
  };

  if (!isLoaded) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-white rounded-2xl p-6 w-[95%] min-w-[350px] max-w-[400px] max-h-[90vh] oveflow-y-auto shadow-xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            {/* Close button */}
            <button
              aria-label="close"
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              ✕
            </button>

            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <MapPin size={20} className="text-green-700" />
              </div>
            </div>

            {/* First screen */}
            {!manualMode ? (
              <>
                <h2 className="text-xl font-semibold text-center mb-2">
                  Welcome to GreenLeaf
                </h2>
                <p className="text-gray-500 text-center mb-6">
                  We need your location to show available products
                </p>

                <button
                  onClick={handleUseMyLocation}
                  className="w-full flex items-center justify-center gap-[10px] bg-green-600 text-white py-3 rounded-xl font-medium mb-4"
                >
                  <MapPin size={20} /> Use My Current Location
                </button>

                <button
                  onClick={() => setManualMode(true)}
                  className="w-full border border-gray-300 py-3 rounded-xl font-medium"
                >
                  Enter Address Manually
                </button>

                {geoError && (
                  <div className="mt-4 text-sm text-red-600">{geoError}</div>
                )}
              </>
            ) : (
              <>
                {/* Manual Address Mode */}
                {!mapMode ? (
                  <>
                    <h2 className="text-xl font-semibold text-center mb-2">
                      Enter Delivery Address
                    </h2>

                    <StandaloneSearchBox
                      onLoad={(ref) => (searchBoxRef.current = ref)}
                      onPlacesChanged={handlePlacesChanged}
                    >
                      <input
                        type="text"
                        placeholder="Search your address"
                        className="w-full border border-gray-300 rounded-xl py-3 px-4 mb-2"
                      />
                    </StandaloneSearchBox>

                    <button
                      onClick={() => setMapMode(true)}
                      className="w-full border border-gray-300 py-3 rounded-xl font-medium mt-2"
                    >
                      Pick From Map
                    </button>

                    <button
                      onClick={() => setManualMode(false)}
                      className="text-center block mx-auto text-gray-600 hover:underline mt-2"
                    >
                      Back
                    </button>
                  </>
                ) : (
                  <>
                    {/* Map Picker */}
                    <h2 className="text-xl font-semibold text-center mb-2">
                      Pick Location on Map
                    </h2>

                    <GoogleMap
                      mapContainerStyle={MAP_CONTAINER_STYLE}
                      center={markerPos || DEFAULT_CENTER}
                      zoom={13}
                      onClick={(e) =>
                        setMarkerPos({ lat: e.latLng.lat(), lng: e.latLng.lng() })
                      }
                      onLoad={onMapLoad}
                    >
                      {markerPos && <Marker position={markerPos} draggable />}
                    </GoogleMap>

                    <div className="flex justify-between mt-2">
                      <button
                        onClick={() => {
                          if (!markerPos) {
                            setGeoError("Select a location on map.");
                            return;
                          }
                          onLocationSelected({
                            latitude: markerPos.lat,
                            longitude: markerPos.lng,
                            address,
                          });
                          onClose();
                        }}
                        className="bg-green-600 text-white py-2 px-4 rounded-xl font-medium"
                      >
                        Confirm Location
                      </button>

                      <button
                        onClick={() => setMapMode(false)}
                        className="text-gray-600 hover:underline py-2 px-4"
                      >
                        Back
                      </button>
                    </div>

                    {geoError && (
                      <div className="mt-2 text-sm text-red-600">{geoError}</div>
                    )}
                  </>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}