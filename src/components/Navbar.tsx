"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { useCartStore } from '@/store/useCartStore'
import gsap from 'gsap'
import { usePathname } from 'next/navigation'

import { User } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'
import { User as UserIcon } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const { totalItems } = useCartStore()
  const supabase = createClient()

  useEffect(() => {
    setMounted(true)
    
    // Check initial auth state
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  // Close menu on route change
  useEffect(() => {
    if (isOpen) {
      toggleMenu()
    }
  }, [pathname])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleMouseEnter = () => {
    gsap.to(btnRef.current, {
      backgroundColor: 'transparent',
      color: 'var(--color-white)',
      duration: 0.4,
      ease: 'power2.out'
    })
  }

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, {
      backgroundColor: 'var(--color-white)',
      color: 'var(--color-primary-dark)',
      duration: 0.4,
      ease: 'power2.out'
    })
  }

  useEffect(() => {
    if (isOpen) {
      // Open Animation
      gsap.to(menuRef.current, {
        y: '0%',
        duration: 0.8,
        ease: 'expo.inOut'
      })
      
      if (linksRef.current) {
        gsap.fromTo(linksRef.current.children, 
          { y: 100, opacity: 0, rotateX: 20 },
          { 
            y: 0, 
            opacity: 1, 
            rotateX: 0,
            duration: 0.8, 
            stagger: 0.05, 
            ease: 'expo.out',
            delay: 0.4
          }
        )
      }
    } else {
      // Close Animation
      gsap.to(menuRef.current, {
        y: '-100%',
        duration: 0.8,
        ease: 'expo.inOut'
      })
    }
  }, [isOpen])

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-[60] px-6 md:px-12 py-8 mix-blend-difference text-white pointer-events-none">
        <div className="flex justify-between items-center w-full pointer-events-auto">
          <Link href="/" className="hover:opacity-70 transition-opacity">
            <div className="relative w-20 h-6 md:w-24 md:h-7">
              <Image 
                src="/logos/zero-code-logo-transparent-light.png"
                alt="Zero Code Logo"
                fill
                className="object-contain select-none"
                priority
                onContextMenu={(e) => e.preventDefault()}
                draggable={false}
              />
            </div>
          </Link>
          
          <div className="flex items-center gap-4 md:gap-6">
            {mounted && (
              <div className="relative group hidden md:block">
                {user ? (
                  <div className="cursor-pointer font-outfit text-[11px] md:text-sm tracking-[0.2em] uppercase hover:text-[var(--color-accent)] transition-colors flex items-center gap-2 py-2">
                    <UserIcon className="w-4 h-4" />
                    <span className="mt-[2px]">{user.user_metadata?.full_name?.split(' ')[0] || 'Profile'}</span>
                  </div>
                ) : (
                  <Link 
                    href="/login" 
                    className="font-outfit text-[11px] md:text-sm tracking-[0.2em] uppercase hover:text-[var(--color-accent)] transition-colors flex items-center gap-2 py-2"
                  >
                    <span className="mt-[2px]">Login / Sign Up</span>
                  </Link>
                )}
                
                {user && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white text-black rounded shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col mix-blend-normal overflow-hidden pointer-events-none group-hover:pointer-events-auto">
                    <Link href="/orders" className="px-4 py-3 font-outfit text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors border-b border-gray-100">
                      Your Orders
                    </Link>
                    <Link href="/profile" className="px-4 py-3 font-outfit text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors border-b border-gray-100">
                      Change Password
                    </Link>
                    <button 
                      onClick={async () => { 
                        await supabase.auth.signOut(); 
                        window.location.href = '/'; 
                      }} 
                      className="px-4 py-3 text-left font-outfit text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
            
            <button 
              ref={btnRef}
              onClick={toggleMenu}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="group flex items-center gap-2.5 px-5 py-1.5 md:py-2 rounded-full font-outfit text-[11px] md:text-sm tracking-[0.2em] uppercase cursor-pointer border border-[var(--color-white)]"
              style={{ backgroundColor: 'var(--color-white)', color: 'var(--color-primary-dark)' }}
            >
              <span className="mt-[1px]">{isOpen ? 'Close' : 'Menu'}</span>
              <div className="flex flex-col justify-center items-center gap-[2px] w-3 h-3">
                <span className={`w-full h-[2px] bg-current transition-transform duration-500 ease-out origin-center ${isOpen ? 'rotate-45 translate-y-[2px]' : ''}`}></span>
                <span className={`w-full h-[2px] bg-current transition-transform duration-500 ease-out origin-center ${isOpen ? '-rotate-45 -translate-y-[2px]' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* GSAP Menu Overlay */}
      <div 
        ref={menuRef} 
        className="fixed inset-0 z-50 flex flex-col justify-center items-center pointer-events-auto bg-[var(--color-sec-800)]"
        style={{ transform: 'translateY(-100%)' }}
      >
        <div ref={linksRef} className="flex flex-col items-center space-y-6 md:space-y-8 perspective-[1000px]">
          <Link href="/" className="font-outfit uppercase text-6xl md:text-8xl lg:text-[9rem] text-[var(--color-primary-light)] hover:text-[var(--color-accent)] transition-colors duration-300 leading-none">
            Home
          </Link>
          <Link href="/products" className="font-outfit uppercase text-6xl md:text-8xl lg:text-[9rem] text-[var(--color-primary-light)] hover:text-[var(--color-accent)] transition-colors duration-300 leading-none">
            Collection
          </Link>
          <Link href="/about" className="font-outfit uppercase text-6xl md:text-8xl lg:text-[9rem] text-[var(--color-primary-light)] hover:text-[var(--color-accent)] transition-colors duration-300 leading-none">
            About
          </Link>
          <Link href="/cart" className="font-outfit uppercase text-6xl md:text-8xl lg:text-[9rem] text-[var(--color-primary-light)] hover:text-[var(--color-accent)] transition-colors duration-300 leading-none flex items-center gap-4">
            Cart <span className="font-nohemi text-xl md:text-3xl mb-4 md:mb-8">({mounted ? totalItems() : 0})</span>
          </Link>
        </div>
        
        {/* Footer info inside menu */}
        <div className="absolute bottom-12 w-full px-12 flex justify-between items-end">
          <div className="font-nohemi text-sm tracking-widest text-[var(--color-sec-400)] uppercase">
            Classic Form. Modern Execution.
          </div>
          <div className="flex gap-6 font-nohemi text-sm tracking-widest text-[var(--color-sec-400)] uppercase">
            <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </>
  )
}
