import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useCart } from '../store/cart'

const NAV = [
  { to: '/shop', label: 'Shop' },
  { to: '/seasons', label: 'What’s in season' },
  { to: '/growers', label: 'Our growers' },
]

export default function Header() {
  const count = useCart((s) => s.items.reduce((sum, i) => sum + i.qty, 0))
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-40 bg-paper-50/95 backdrop-blur-sm border-b border-paper-200">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-6">
          <Link to="/" className="shrink-0">
            <span className="font-display text-2xl md:text-[1.7rem] font-bold tracking-tight text-soil-800 block leading-none">
              VERDANT
            </span>
            <span className="measure text-[0.55rem]">EST. 2019 · DEVON</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-300 ${
                    isActive ? 'text-radish-500' : 'text-soil-700 hover:text-leaf-500'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="flex items-center gap-2 px-3.5 py-2 border border-soil-700 rounded-[2px] text-soil-700 transition-colors duration-300 hover:bg-soil-700 hover:text-paper-50"
              aria-label={`Basket, ${count} item${count === 1 ? '' : 's'}`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M4 7h16l-1.4 11.2a2 2 0 0 1-2 1.8H7.4a2 2 0 0 1-2-1.8L4 7z" strokeLinejoin="round" />
                <path d="M9 7V5.5a3 3 0 0 1 6 0V7" strokeLinecap="round" />
              </svg>
              <span className="font-mono text-xs">{count}</span>
            </Link>

            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden p-2 text-soil-700"
              aria-label="Menu"
              aria-expanded={open}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <nav className="md:hidden pb-4 flex flex-col border-t border-paper-200 pt-3">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`py-2 text-sm font-medium ${
                  pathname === item.to ? 'text-radish-500' : 'text-soil-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
