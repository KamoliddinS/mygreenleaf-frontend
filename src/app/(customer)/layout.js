export default function CustomerLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <a href="/">Home</a> | <a href="/admin">Admin</a>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}