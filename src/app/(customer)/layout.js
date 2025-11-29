export default function CustomerLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <a href="/">Home</a> | <a href="/auth/login">AUTH</a>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}