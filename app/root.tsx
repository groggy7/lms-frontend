import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./index.css";
import Navbar from "./components/estudy/Navbar";
import Footer from "./components/estudy/Footer";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  { rel: "stylesheet", href: "/estudy-assets/css/bootstrap.min.css" },
  { rel: "stylesheet", href: "/estudy-assets/css/owl.carousel.min.css" },
  { rel: "stylesheet", href: "/estudy-assets/css/animate.css" },
  { rel: "stylesheet", href: "/estudy-assets/css/all.min.css" },
  { rel: "stylesheet", href: "/estudy-assets/css/flaticon.css" },
  { rel: "stylesheet", href: "/estudy-assets/css/theme-default.css" },
  { rel: "stylesheet", href: "/estudy-assets/css/meanmenu.min.css" },
  { rel: "stylesheet", href: "/estudy-assets/css/owl.transitions.css" },
  { rel: "stylesheet", href: "/estudy-assets/venobox/venobox.css" },
  { rel: "stylesheet", href: "/estudy-assets/css/bootstrap-icons.css" },
  { rel: "stylesheet", href: "/estudy-assets/css/style.css" },
  { rel: "stylesheet", href: "/estudy-assets/css/dropdown.css" },
  { rel: "stylesheet", href: "/estudy-assets/css/responsive.css" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="main-wrapper">
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
