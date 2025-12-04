"use client"

// import { useState, useEffect } from "react";
// import { useJsApiLoader } from "@react-google-maps/api";
import { GlobalProvider } from "./components/context/GlobalContext";
import { Header } from "./components/Header";
import { PromoCode } from "./components/PromoCode";
import CartProvider from "./components/store/CartProvider";
// import LocationModal from "./components/LocationModal";

export default function CustomerLayout({ children }) {
  //   const [openLocationModal, setOpenLocationModal] = useState(false);

  // const { isLoaded, loadError } = useJsApiLoader({
  //   googleMapsApiKey: "AIzaSyDAfvQNep6qw_BRwuXS8XYGugJgpvSWduU",
  //   libraries: ["places"],
  // });

  // useEffect(() => {
  //   // Open modal automatically when this component mounts
  //   setOpenLocationModal(true);
  // }, []);

  // const handleLocationSelected = (loc) => {
  //   console.log("User selected location:", loc);
  //   setOpenLocationModal(false);
  // };

  return (
    <GlobalProvider>
      {/* <LocationModal
       open={openLocationModal}
        setOpen={setOpenLocationModal}
        onLocationSelected={handleLocationSelected}
        isLoaded={isLoaded}
      /> */}
      <CartProvider>
        <header>
          <Header />
        </header>

        <section>
          <PromoCode />
        </section>

        <main className="px-4">{children}</main>
      </CartProvider>
    </GlobalProvider>
  );
}