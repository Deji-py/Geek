import { League_Spartan } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ReduxProvider } from "@/providers/ReduxProvider";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/nano/theme.css";
import "primereact/resources/primereact.min.css";
import { Suspense } from "react";

const league = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league",
});

export const metadata = {
  title: "The Best Tool Directory for Designers and Developers",
  description:
    "Geek.tools stands as an essential resource hub meticulously crafted for developers and designers alike",
};
export const viewport = {
  themeColor: "hsl(223 100% 59%)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background hideScroll  font-league antialiased",
          league.variable
        )}
      >
        <script
          src="https://accounts.google.com/o/oauth2/v2/auth"
          async
        ></script>
        <ReduxProvider>
          <PrimeReactProvider>
            <Suspense>{children}</Suspense>
          </PrimeReactProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
