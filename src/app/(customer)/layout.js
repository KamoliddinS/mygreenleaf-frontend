import { Header } from "./components/Header";
import { PromoCode } from "./components/PromoCode";

export default function CustomerLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Header />
        </header>
        <section>
          <PromoCode />
        </section>
        <main className="px-4">{children}</main>
      </body>
    </html>
  );
}