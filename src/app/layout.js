import './global.css'
import { Toaster } from 'sonner';

export const metadata = {
  title: "My Marketplace",
  description: "Built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster richColors closeButton position='top-right' />
        {children}
        </body>
    </html>
  );
}