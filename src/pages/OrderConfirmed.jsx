import { Link, Navigate } from 'react-router-dom'
import { formatPrice } from '../data/products'
import { useCart } from '../store/cart'

const SLOT_LABELS = {
  'sat-am': 'Saturday, 7am – 12pm',
  'sat-pm': 'Saturday, 12pm – 6pm',
  'sun-am': 'Sunday, 8am – 1pm',
}

export default function OrderConfirmed() {
  const lastOrder = useCart((s) => s.lastOrder)

  // Doğrudan bu adrese gelen biri için sipariş yok — mağazaya al
  if (!lastOrder) return <Navigate to="/shop" replace />

  const { details, totals, ref } = lastOrder

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-16 md:py-24">
      <div className="seed-card p-8 md:p-12">
        <p className="measure text-leaf-500 mb-4">ORDER RECEIVED</p>

        <h1 className="font-display text-4xl md:text-5xl text-soil-800 mb-4">
          We’ll start cutting on Friday
        </h1>

        <p className="text-soil-600/80 leading-relaxed mb-8">
          A confirmation is on its way to{' '}
          <span className="text-soil-800 font-medium">{details.email}</span>. We invoice
          on delivery, so there is nothing else to pay now.
        </p>

        <dl className="rule-dashed pt-6 space-y-4 text-sm">
          <Row label="REFERENCE" value={<span className="font-mono">{ref}</span>} />
          <Row label="DELIVERING TO" value={`${details.name}, ${details.address}, ${details.postcode}`} />
          <Row label="SLOT" value={SLOT_LABELS[details.slot]} />
          <Row label="ITEMS" value={`${totals.count} ${totals.count === 1 ? 'line' : 'lines'}`} />
          <Row
            label="TOTAL"
            value={<span className="font-mono text-lg text-soil-800">{formatPrice(totals.total)}</span>}
          />
          {details.notes && <Row label="NOTES" value={details.notes} />}
        </dl>

        <div className="flex flex-wrap gap-3 mt-10">
          <Link to="/shop" className="btn-soil">Order something else</Link>
          <Link to="/seasons" className="btn-outline">See next month’s crops</Link>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-6">
      <dt className="measure sm:w-36 shrink-0 mb-1 sm:mb-0">{label}</dt>
      <dd className="text-soil-700">{value}</dd>
    </div>
  )
}
