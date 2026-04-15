import React, { useState, useEffect } from 'react';
import { Link, useLocation } from '@remix-run/react';
import Logo from '../Logo';
import { Menu, X, LayoutDashboard, LogIn, ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    const storedUser = localStorage.getItem('lumina_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      
      // Verify session with backend
      const verifySession = async () => {
        try {
          const { getApiUrl } = await import('../../lib/config');
          const response = await fetch(`${getApiUrl()}/me`, {
            credentials: 'include'
          });
          
          if (!response.ok) {
            // Cookie is likely gone or invalid
            localStorage.removeItem('lumina_user');
            setUser(null);
          }
        } catch (err) {
          console.error('Session verification failed:', err);
        }
      };
      
      verifySession();
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';
  
  // Logic for navbar appearance
  const navBgClass = isHomePage 
    ? (isScrolled ? 'bg-white/80 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-4' : 'bg-transparent py-10')
    : 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-4'; // Always white on other pages

  const textColorClass = isHomePage 
    ? (isScrolled ? 'text-slate-600 hover:text-blue-600' : 'text-white hover:text-blue-400')
    : 'text-slate-600 hover:text-blue-600';

  const logoColor = isHomePage 
    ? (isScrolled ? "text-slate-900" : "text-white")
    : "text-slate-900";

  const navLinks = [
    { name: 'Solutions', path: '/', dropdown: ['Enterprise', 'Scale', 'Security'] },
    { name: 'Courses', path: '/courses' },
    { name: 'Infrastructure', path: '/' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${navBgClass}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo Group */}
            <div className="flex items-center gap-12">
              <Link to="/" className="flex items-center hover:opacity-80 transition-opacity no-underline border-none outline-none">
                <Logo 
                  size={38} 
                  textColor={logoColor} 
                />
              </Link>

              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center gap-10">
                {navLinks.map((link) => (
                  <div key={link.name} className="group relative">
                    <Link 
                      to={link.path}
                      className={`text-[13px] font-black uppercase tracking-[0.15em] flex items-center gap-1.5 transition-colors no-underline ${textColorClass}`}
                    >
                      {link.name}
                      {link.dropdown && <ChevronDown className="w-3 h-3 opacity-50 group-hover:rotate-180 transition-transform" />}
                    </Link>
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-8">
              {user ? (
                <Link 
                  to="/console" 
                  className="flex items-center gap-2.5 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all no-underline"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Console
                </Link>
              ) : (
                <div className="flex items-center gap-8">
                  <Link 
                    to="/auth" 
                    className={`text-[13px] font-black uppercase tracking-[0.15em] transition-colors no-underline ${
                      isHomePage && !isScrolled ? 'text-white hover:text-blue-400' : 'text-slate-900 hover:text-blue-600'
                    }`}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/auth" 
                    className={`px-7 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all no-underline ${
                      (isHomePage && !isScrolled)
                        ? 'bg-white text-slate-900 hover:bg-blue-50 shadow-xl'
                        : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10'
                    }`}
                  >
                    Join Lumina
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className={`lg:hidden p-2 transition-colors ${
                (isHomePage && !isScrolled) ? 'text-white' : 'text-slate-900'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Full-screen Mobile Overlay */}
        <div className={`lg:hidden fixed inset-0 top-[72px] bg-white z-50 transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
        }`}>
          <div className="p-8 flex flex-col h-full">
            <div className="space-y-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  className="block text-4xl font-black text-slate-900 tracking-tighter no-underline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="mt-auto space-y-4">
              {user ? (
                <Link 
                  to="/course/go-concurrency" 
                  className="flex items-center justify-center gap-3 py-5 bg-blue-600 text-white rounded-3xl font-black text-lg no-underline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard />
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link 
                    to="/auth" 
                    className="flex items-center justify-center py-5 bg-slate-100 text-slate-900 rounded-3xl font-black text-lg no-underline"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/auth" 
                    className="flex items-center justify-center py-5 bg-blue-600 text-white rounded-3xl font-black text-lg no-underline"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Background spacer for fixed nav if needed on other pages */}
      <div className={isHomePage ? '' : 'h-[80px]'} />
    </>
  );
};

export default Navbar;
