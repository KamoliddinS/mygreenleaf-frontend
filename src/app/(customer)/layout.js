import { GlobalProvider } from "./components/context/GlobalContext";
import { Header } from "./components/Header";
import { PromoCode } from "./components/PromoCode";
import CartProvider from "./components/store/CartProvider";

export default function CustomerLayout({ children }) {
  return (
    <html lang="en">
      <body>
       <GlobalProvider>
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
      </body>
    </html>
  );
}