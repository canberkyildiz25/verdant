import { Link } from 'react-router-dom'

const COLUMNS = [
  {
    heading: 'Shop',
    links: [
      { label: 'Vegetable boxes', to: '/shop?category=boxes' },
      { label: 'Single crops', to: '/shop' },
      { label: 'What’s in season', to: '/seasons' },
    ],
  },
  {
    heading: 'The farm',
    links: [
      { label: 'Our growers', to: '/growers' },
      { label: 'How delivery works', to: '/growers' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="mt-24 bg-soil-800 text-paper-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl font-bold mb-3">VERDANT</p>
            <p className="text-paper-200/70 text-sm max-w-xs leading-relaxed">
              Five family farms across Devon, Cornwall and Kent. Cut in the morning,
              packed the same hour, with you the next day.
            </p>
            <p className="measure mt-6 text-paper-400">ORDERS CLOSE THURSDAY 18:00</p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="measure mb-4 text-corn-400">{col.heading}</p>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-paper-200/80 transition-colors duration-300 hover:text-corn-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-paper-200/15 flex flex-col sm:flex-row gap-3 justify-between">
          <p className="measure text-paper-400">© 2026 VERDANT PRODUCE LTD</p>
          <p className="measure text-paper-400">SOIL ASSOCIATION CERT. 04412</p>
        </div>
      </div>
    </footer>
  )
}
