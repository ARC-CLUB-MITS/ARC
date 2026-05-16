
import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [buttonTransform, setButtonTransform] = useState({ x: 0, y: 0 });
  const navRef = useRef<HTMLElement>(null);
  const hasAnimatedRef = useRef(false);

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - buttonCenterX;
    const deltaY = e.clientY - buttonCenterY;
    
    const maxMove = 20;
    const limitedX = Math.max(-maxMove, Math.min(maxMove, deltaX * 0.3));
    const limitedY = Math.max(-maxMove, Math.min(maxMove, deltaY * 0.3));
    
    setButtonTransform({ x: limitedX, y: limitedY });
  };

  const handleButtonMouseLeave = () => {
    setButtonTransform({ x: 0, y: 0 });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav || hasAnimatedRef.current) return;

    hasAnimatedRef.current = true;

    // Smooth glide from top
    gsap.fromTo(nav,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
    );

    // Staggered children fade in
    gsap.fromTo(
      nav.querySelectorAll('.nav-logo, .nav-link, .nav-button, .nav-hamburger'),
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power2.out', delay: 1.5 }
    );
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const GitHubIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 128 128" 
      className="w-4 h-4"
    >
      <g fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"/>
        <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"/>
      </g>
    </svg>
  );

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link text-[10px] uppercase tracking-[0.2em] font-medium pb-1 transition-colors ${
      isActive
        ? 'text-[#d4a84a] border-b-2 border-[#d4a84a]'
        : 'text-[var(--nav-text-color)] border-b-2 border-transparent hover:text-[#d4a84a]'
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-[11px] uppercase tracking-[0.25em] font-medium py-2 transition-colors duration-300 ${
      isActive
        ? 'text-[#d4a84a] border-b-2 border-[#d4a84a]'
        : 'text-[var(--nav-text-color)] border-b-2 border-transparent hover:text-[#d4a84a]'
    }`;

  return (
    <>
      <nav 
        ref={navRef}
        style={{ 
          backgroundColor: isScrolled || isMobileMenuOpen ? 'rgba(var(--bg-color-rgb), 0.85)' : 'transparent',
        }}
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-3 transition-[background-color,box-shadow] duration-300 ${isScrolled || isMobileMenuOpen ? 'backdrop-blur-xl shadow-sm border-b border-[var(--text-color)]/10' : 'bg-transparent'}`}
      >
        <NavLink style={({isActive}) => ({color: isActive ? '#d4a84a' : 'var(--nav-text-color)'})} to="/" className="nav-logo flex gap-3 text-2xl font-serif font-bold tracking-tighter cursor-pointer" onClick={closeMobileMenu}>
          <img src="/arc_club_logo.png" alt="ARC Club logo" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[72px] lg:h-[72px] border-2 border-[#d4a84a]/0 hover:border-[#d4a84a]/40 rounded-full transition-all mr-4" />
        </NavLink>
        
        <div className="hidden md:flex items-center space-x-12">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/projects" className={navLinkClass}>Projects</NavLink>
          <NavLink to="/events" className={navLinkClass}>Events</NavLink>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => window.open('https://github.com/ARC-CLUB-MITS')}
            onMouseMove={handleButtonMouseMove}
            onMouseLeave={handleButtonMouseLeave}
            style={{
              transform: `translate(${buttonTransform.x}px, ${buttonTransform.y}px)`,
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
            className="nav-button flex bg-[#1e3a5f] text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#152d47] transition-colors duration-300 items-center gap-2 shadow-md hover:shadow-lg"
          >
            <GitHubIcon />
            <span className="hidden sm:inline">GitHub</span>
          </button>

          {/* Mobile */}
          <button
            onClick={toggleMobileMenu}
            className="nav-hamburger md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px] z-[60]"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`block w-5 h-[1.5px] bg-[var(--text-color)] rounded-full transition-all duration-300 ease-out origin-center ${
                isMobileMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-[var(--text-color)] rounded-full transition-all duration-300 ease-out ${
                isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-[var(--text-color)] rounded-full transition-all duration-300 ease-out origin-center ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />

        {/* Menu panel */}
        <div
          className={`absolute top-0 left-0 right-0 bg-[var(--bg-color)]/95 backdrop-blur-2xl border-b border-[var(--text-color)]/10 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isMobileMenuOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-full opacity-0'
          }`}
          style={{ paddingTop: '90px' }}
        >
          <div className="flex flex-col items-center gap-6 px-8 pb-10">
            <NavLink
              to="/"
              onClick={closeMobileMenu}
              className={mobileNavLinkClass}
            >
              Home
            </NavLink>
            <NavLink
              to="/projects"
              onClick={closeMobileMenu}
              className={mobileNavLinkClass}
            >
              Projects
            </NavLink>
            <NavLink
              to="/events"
              onClick={closeMobileMenu}
              className={mobileNavLinkClass}
            >
              Events
            </NavLink>

          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
