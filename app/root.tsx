import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import "./index.css";
import Navbar from "./components/lumina/Navbar";
import Footer from "./components/lumina/Footer";
import Logo from "./components/Logo";
import ScrollToTop from "./components/ScrollToTop";
import { useMounted } from "./hooks/use-mounted";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  { rel: "stylesheet", href: "/lumina-assets/css/bootstrap.min.css" },
  { rel: "stylesheet", href: "/lumina-assets/css/owl.carousel.min.css" },
  { rel: "stylesheet", href: "/lumina-assets/css/animate.css" },
  { rel: "stylesheet", href: "/lumina-assets/css/all.min.css" },
  { rel: "stylesheet", href: "/lumina-assets/css/flaticon.css" },
  { rel: "stylesheet", href: "/lumina-assets/css/theme-default.css" },
  { rel: "stylesheet", href: "/lumina-assets/css/meanmenu.min.css" },
  { rel: "stylesheet", href: "/lumina-assets/css/owl.transitions.css" },
  { rel: "stylesheet", href: "/lumina-assets/venobox/venobox.css" },
  { rel: "stylesheet", href: "/lumina-assets/css/bootstrap-icons.css" },
  { rel: "stylesheet", href: "/lumina-assets/css/style.css" },
  { rel: "stylesheet", href: "/lumina-assets/css/dropdown.css" },
  { rel: "stylesheet", href: "/lumina-assets/css/responsive.css" },
  { rel: "icon", type: "image/png", sizes: "56x56", href: "/lumina-assets/images/fav-icon/icon.png" },
];

export const meta: MetaFunction = () => [
  { title: "Lumina Learning - Online Education & LMS" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const isMounted = useMounted();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body suppressHydrationWarning>
        <Navbar />
        
        {children}

        <Footer />

        {isMounted && <ScrollToTop />}

        {/* Start Sidebar Area */}
        <div className="sidebar-group info-group">
          <div className="sidebar-widget">
            <div className="sidebar-widget-container">
              <div className="widget-heading">
                <a href="#" className="close-side-widget">
                  <i className="bi bi-x-lg"></i>
                </a>
              </div>
              <div className="sidebar-textwidget">
                <div className="sidebar-info-contents">
                  <div className="content-inner">
                    <div className="sidebar-logo">
                      <Link to="/" className="no-underline border-none">
                        <Logo size={35} />
                      </Link>
                    </div>
                    <div className="sidebar-widget-menu">
                      <ul>
                        <li className="dropdown"><Link to="/">Home</Link></li>
                        <li className="dropdown"><Link to="/courses">Courses</Link></li>
                        <li className="dropdown"><Link to="/contact">Contacts</Link></li>
                      </ul>
                    </div>
                    <div className="contact-info">
                      <h2>Contact Info</h2>
                      <ul className="list-style-one">
                        <li><i className="bi bi-geo-alt-fill"></i>6391 Elgin St. Celina, Delaware</li>
                        <li><i className="bi bi-telephone-fill"></i>(+001) 123-456-789</li>
                        <li><i className="bi bi-envelope"></i> info@lumina-learning.com</li>
                      </ul>
                    </div>
                    <ul className="social-box">
                      <li className="facebook"><a href="#" className="fab fa-facebook-f"></a></li>
                      <li className="twitter"><a href="#" className="fab fa-instagram"></a></li>
                      <li className="linkedin"><a href="#" className="fab fa-twitter"></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scripts from template - Loaded only on client to avoid hydration mismatch */}
        {isMounted && (
          <>
            <script src="/lumina-assets/js/vendor/jquery-3.6.2.min.js"></script>
            <script src="/lumina-assets/js/popper.min.js"></script>
            <script src="/lumina-assets/js/bootstrap.min.js"></script>
            <script src="/lumina-assets/js/owl.carousel.min.js"></script>
            <script src="/lumina-assets/js/jquery.counterup.min.js"></script>
            <script src="/lumina-assets/js/waypoints.min.js"></script>
            <script src="/lumina-assets/js/wow.min.js"></script>
            <script src="/lumina-assets/js/imagesloaded.pkgd.min.js"></script>
            <script src="/lumina-assets/venobox/venobox.js"></script>
            <script src="/lumina-assets/js/animated-text.js"></script>
            <script src="/lumina-assets/js/isotope.pkgd.min.js"></script>
            <script src="/lumina-assets/js/jquery.meanmenu.js"></script>
            <script src="/lumina-assets/js/jquery.scrollUp.js"></script>
            <script src="/lumina-assets/js/jquery.barfiller.js"></script>
            <script src="/lumina-assets/js/rangeslider.js"></script>
            <script src="/lumina-assets/js/mixitup.min.js"></script>
            <script src="/lumina-assets/js/theme.js"></script>
            <script src="/lumina-assets/js/script.js"></script>
          </>
        )}

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
