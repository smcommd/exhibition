"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navigation() {
  const pathname = usePathname() ?? '/'
  const [open, setOpen] = useState(false)
  const isHome = pathname === '/archives/years/2025' || pathname === '/'
  const isWorks = pathname.startsWith('/archives/years/2025/works')
  const isDesigners = pathname.startsWith('/archives/years/2025/designers')
  const isArchive = pathname.startsWith('/archives/years/2025/archive')

  useEffect(() => {
    // lock body scroll when menu is open
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <nav
      role="navigation"
      aria-label="Primary"
      className="nav-bar relative flex items-center justify-center h-[76px] px-[30px] overflow-x-auto overflow-y-visible scrollbar-hide"
    >
      <div className="nav-links flex items-center justify-center whitespace-nowrap gap-[10px] sm:gap-4 md:gap-6 lg:gap-8 overflow-visible mx-auto max-w-full">
        <Link 
          href="/archives/years/2025" 
          className={`flex items-center justify-center text-black transform -rotate-2 px-0.5 xxs:px-1 xs:px-2 sm:px-3 md:px-4 lg:px-5 py-1 xxs:py-1 xs:py-2 md:py-3 lg:py-4 no-underline transition-colors duration-200 whitespace-nowrap rounded-none overflow-visible ${
            isHome ? 'bg-[#B5EEFF]' : 'bg-[#DFDFDF]'
          } hover:bg-[#DDFF8E]`}
          style={{
            fontFamily: '"rixdongnimgothic-pro", sans-serif',
            fontSize: 'clamp(18px, 5vw, 32px)',
            width: 'clamp(92px, 24vw, 132px)',
            height: 'clamp(34px, 9vw, 40px)',
            boxSizing: 'border-box'
          }}
        >
          Home
        </Link>
        <Link 
          href="/archives/years/2025/works" 
          className={`flex items-center justify-center text-black transform rotate-2 px-0.5 xxs:px-1 xs:px-2 sm:px-3 md:px-4 lg:px-5 py-1 xxs:py-1 xs:py-2 md:py-3 lg:py-4 no-underline transition-colors duration-200 whitespace-nowrap rounded-none overflow-visible ${
            isWorks ? 'bg-[#B5EEFF]' : 'bg-[#DFDFDF]'
          } hover:bg-[#DDFF8E]`}
          style={{
            fontFamily: '"rixdongnimgothic-pro", sans-serif',
            fontSize: 'clamp(18px, 5vw, 32px)',
            width: 'clamp(98px, 26vw, 140px)',
            height: 'clamp(34px, 9vw, 40px)',
            boxSizing: 'border-box'
          }}
        >
          Works
        </Link>
        <Link 
          href="/archives/years/2025/designers" 
          className={`flex items-center justify-center text-black transform -rotate-2 px-0.5 xxs:px-1 xs:px-2 sm:px-3 md:px-4 lg:px-5 py-1 xxs:py-1 xs:py-2 md:py-3 lg:py-4 no-underline transition-colors duration-200 whitespace-nowrap rounded-none overflow-visible ${
            isDesigners ? 'bg-[#B5EEFF]' : 'bg-[#DFDFDF]'
          } hover:bg-[#DDFF8E]`}
          style={{
            fontFamily: '"rixdongnimgothic-pro", sans-serif',
            fontSize: 'clamp(18px, 5vw, 32px)',
            width: 'clamp(130px, 34vw, 188px)',
            height: 'clamp(34px, 9vw, 40px)',
            boxSizing: 'border-box'
          }}
        >
          Designer
        </Link>
        <Link 
          href="/archives/years/2025/archive" 
          className={`flex items-center justify-center text-black transform rotate-2 px-0.5 xxs:px-1 xs:px-2 sm:px-3 md:px-4 lg:px-5 py-1 xxs:py-1 xs:py-2 md:py-3 lg:py-4 no-underline transition-colors duration-200 whitespace-nowrap rounded-none overflow-visible ${
            isArchive ? 'bg-[#B5EEFF]' : 'bg-[#DFDFDF]'
          } hover:bg-[#DDFF8E]`}
          style={{
            fontFamily: '"rixdongnimgothic-pro", sans-serif',
            fontSize: 'clamp(18px, 5vw, 32px)',
            width: 'clamp(118px, 30vw, 170px)',
            height: 'clamp(34px, 9vw, 40px)',
            boxSizing: 'border-box'
          }}
        >
          Archive
        </Link>
      </div>

      {/* Hamburger for <=600px */}
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className={`nav-hamburger ${open ? 'open' : ''}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">Open menu</span>
        <span className="bar top" />
        <span className="bar middle" />
        <span className="bar bottom" />
      </button>

      {/* Mobile overlay menu (<=600px) */}
      {open && (
        <div id="mobile-menu" className="nav-overlay open">
          <div className="nav-panel">
            <ul className="nav-list">
              <li>
                <Link href="/archives/years/2025" onClick={() => setOpen(false)} className={isHome ? 'active' : ''}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/archives/years/2025/works" onClick={() => setOpen(false)} className={isWorks ? 'active' : ''}>
                  Works
                </Link>
              </li>
              <li>
                <Link href="/archives/years/2025/designers" onClick={() => setOpen(false)} className={isDesigners ? 'active' : ''}>
                  Designer
                </Link>
              </li>
              <li>
                <Link href="/archives/years/2025/archive" onClick={() => setOpen(false)} className={isArchive ? 'active' : ''}>
                  Archive
                </Link>
              </li>
            </ul>
          </div>
          <button aria-label="Close overlay" className="nav-backdrop" onClick={() => setOpen(false)} />
        </div>
      )}
    </nav>
  )
}
