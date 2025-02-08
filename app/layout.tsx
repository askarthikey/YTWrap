import { EdgeStoreProvider } from "../lib/edgestore";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" />
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
      </body>
    </html>
  );
}
