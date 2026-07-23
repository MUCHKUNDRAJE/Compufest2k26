"use client"

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

const pixelFont = { fontFamily: 'var(--font-press-start-2p)' };

const NAV_ITEMS = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '#about' },
  { label: 'EVENTS', href: '/event' },
  { label: 'TIMELINE', href: '#highlights' },
  { label: 'INSTAGRAM', href: 'https://www.instagram.com/compufest_2k26?igsh=MTF6dDN4aTdlaGhlMw==' },
  { label: 'COMITTEE', href: '/comiittee' },
];

function Nav() {
  const [showNav, setShowNav] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const router = useRouter();
  const pathname = usePathname();

  // On any route other than "/", there's nothing to scroll-detect (the
  // #about / #highlights sections only exist on the home page), so the
  // active item should just reflect the route itself: "/event" -> "event",
  // "/comiittee" -> "comiittee". This runs immediately on route change,
  // instead of waiting for a scroll event that will never come on those pages.
  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection(pathname.slice(1));
    } else {
      setActiveSection('home');
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/') return;

    const detectSection = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setShowNav(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      lastScrollY.current = currentScrollY;

      // near the very top of the home page -> HOME is active
      if (currentScrollY < 120) {
        setActiveSection('home');
        return;
      }

      const sections = NAV_ITEMS
        .filter(item => item.href.startsWith('#'))
        .map(item => item.href.slice(1));

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    // run once immediately so the correct section is highlighted on load,
    // not just after the first scroll event
    detectSection();

    window.addEventListener('scroll', detectSection, { passive: true });
    return () => window.removeEventListener('scroll', detectSection);
  }, [pathname]);

  // lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // If we've just navigated to "/" from another route to reach a section,
  // pick up the pending target from sessionStorage and scroll to it once
  // the page has mounted. We never rely on a URL hash for this — Next's
  // <Link> can double up an existing hash (e.g. "/#highlights#highlights"),
  // so we handle the whole thing ourselves instead.
  useEffect(() => {
    if (pathname !== '/') return;
    const id = sessionStorage.getItem('cf-scroll-target');
    if (!id) return;
    sessionStorage.removeItem('cf-scroll-target');
    const timeout = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [pathname]);

  // Section links keep a plain "/#id" href for accessibility/middle-click/
  // right-click-open-in-new-tab, but every normal left click is intercepted
  // and handled manually below so the browser/Next never touch the hash.
  const getHref = (href: string) => (href.startsWith('#') ? `/${href}` : href);

  const handleSectionClick = (e: React.MouseEvent, href: string) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    setMenuOpen(false);
    const id = href.slice(1);

    if (pathname !== '/') {
      sessionStorage.setItem('cf-scroll-target', id);
      router.push('/');
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        style={pixelFont}
        className={`fixed w-full z-50 bg-[#0a1420]/90 backdrop-blur-sm border-b border-green-800 p-4 transition-transform duration-300 scroll-smooth ${
          showNav ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className='h-12 w-12 scale-90 '>
             <img className='h-full w-full object-cover' src="/logo.png" alt="" />
        </div>
            <div>
              <h1 className="text-white  text-[10px] font-bold">CT's Techfest</h1>
            </div>
          </div>

          {/* desktop links */}
          <div className="hidden md:flex gap-6 text-white text-[8px] uppercase items-center">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={getHref(item.href)}
                scroll={!item.href.startsWith('#')}
                onClick={(e) => handleSectionClick(e, item.href)}
                className={`hover:text-green-400 transition-colors ${
                  activeSection === (item.href === '/' ? 'home' : item.href.slice(1))
                    ? 'border-b-2 border-green-400 text-green-400'
                    : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-500 transition-transform hover:scale-105 border-b-4 border-green-800">
              REGISTER NOW →
            </button>
          </div>

          {/* hamburger button, mobile only */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(true)}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 z-50"
          >
            <span className="block w-6 h-0.5 bg-green-400"></span>
            <span className="block w-6 h-0.5 bg-green-400"></span>
            <span className="block w-4 h-0.5 bg-green-400 self-end"></span>
          </button>
        </div>
      </nav>

      {/* backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* sliding panel */}
      <div
        style={pixelFont}
        className={`fixed top-0 right-0 h-full w-64 bg-[#0a1420] border-l-2 border-green-800 z-50 transition-transform duration-300 md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-green-800">
          <span className="text-green-400 text-[10px]">MENU</span>
          <button
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="text-white text-lg leading-none w-8 h-8 flex items-center justify-center hover:text-green-400"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-2 p-4 text-white text-[9px] uppercase">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={getHref(item.href)}
              scroll={!item.href.startsWith('#')}
              onClick={(e) => handleSectionClick(e, item.href)}
              className={`py-3 px-2 border-b border-green-900 hover:text-green-400 hover:bg-green-950/40 transition-colors ${
                activeSection === (item.href === '/' ? 'home' : item.href.slice(1)) ? 'text-green-400' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => setMenuOpen(false)}
            className="mt-4 bg-green-600 px-4 py-3 rounded-md hover:bg-green-500 transition-transform hover:scale-105 border-b-4 border-green-800 text-[9px]"
          >
            REGISTER NOW →
          </button>
        </div>
      </div>
    </>
  )
}

export default Nav