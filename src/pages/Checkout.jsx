import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { products, formatPrice } from '../data/products'
import { useCart, buildTotals } from '../store/cart'

const SLOTS = [
  { id: 'sat-am', label: 'Saturday, 7am – 12pm' },
  { id: 'sat-pm', label: 'Saturday, 12pm – 6pm' },
  { id: 'sun-am', label: 'Sunday, 8am – 1pm' },
]

export default function Checkout() {
  const navigate = useNavigate()
  const items = useCart((s) => s.items)
  const placeOrder = useCart((s) => s.placeOrder)
  const { lines, subtotal, delivery, total } = buildTotals(items, products)

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    postcode: '',
    slot: 'sat-am',
    notes: '',
  })

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    placeOrder(form, { subtotal, delivery, total, count: lines.length })
    navigate('/order-confirmed')
  }

  if (lines.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 text-center">
        <h1 className="font-display text-4xl text-soil-800 mb-4">Your basket is empty</h1>
        <Link to="/shop" className="btn-soil">Back to the shop</Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 md:py-16">
      <p className="measure text-radish-500 mb-3">LAST STEP</p>
      <h1 className="font-display text-5xl md:text-6xl text-soil-800 mb-10">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-14 items-start">
        <div className="space-y-8">
          <fieldset>
            <legend className="measure text-radish-500 mb-4">WHERE IT GOES</legend>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" id="name" value={form.name} onChange={update('name')} required />
              <Field label="Email" id="email" type="email" value={form.email} onChange={update('email')} required />
              <div className="sm:col-span-2">
                <Field label="Street address" id="address" value={form.address} onChange={update('address')} required />
              </div>
              <Field label="Postcode" id="postcode" value={form.postcode} onChange={update('postcode')} required />
            </div>
          </fieldset>

          <fieldset>
            <legend className="measure text-radish-500 mb-4">WHEN WE COME</legend>
            <div className="space-y-2.5">
              {SLOTS.map((slot) => (
                <label
                  key={slot.id}
                  className={`flex items-center gap-3 px-4 py-3.5 border rounded-[2px] transition-colors ${
                    form.slot === slot.id
                      ? 'border-soil-700 bg-paper-100'
                      : 'border-paper-200 hover:border-paper-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="slot"
                    value={slot.id}
                    checked={form.slot === slot.id}
                    onChange={update('slot')}
                    className="accent-radish-500"
                  />
                  <span className="text-sm text-soil-700">{slot.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="measure text-radish-500 mb-4">ANYTHING ELSE</legend>
            <label htmlFor="notes" className="sr-only">Notes for the driver</label>
            <textarea
              id="notes"
              value={form.notes}
              onChange={update('notes')}
              rows={3}
              placeholder="Leave it by the side gate, the dog is friendly…"
              className="w-full px-4 py-3 bg-paper-100 border border-paper-200 rounded-[2px] text-sm text-soil-800 placeholder-paper-400 focus:border-soil-700 focus:outline-none transition-colors"
            />
          </fieldset>
        </div>

        <aside className="seed-card p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-2xl text-soil-800 mb-5">Your crate</h2>

          <ul className="space-y-3 mb-5">
            {lines.map((line) => (
              <li key={line.slug} className="flex justify-between gap-3 text-sm">
                <span className="text-soil-700">
                  {line.name}
                  <span className="text-paper-400 font-mono text-xs"> × {line.qty}</span>
                </span>
                <span className="font-mono shrink-0">{formatPrice(line.lineTotal)}</span>
              </li>
            ))}
          </ul>

          <dl className="rule-dashed pt-4 space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-soil-600/75">Subtotal</dt>
              <dd className="font-mono">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-soil-600/75">Delivery</dt>
              <dd className="font-mono">{delivery === 0 ? 'Free' : formatPrice(delivery)}</dd>
            </div>
          </dl>

          <div className="rule-dashed mt-4 pt-4 flex justify-between items-baseline">
            <span className="font-display text-xl text-soil-800">Total</span>
            <span className="font-mono text-2xl text-soil-800">{formatPrice(total)}</span>
          </div>

          <button type="submit" className="btn-soil w-full mt-6">
            Place order
          </button>
          <p className="measure mt-4 text-center leading-relaxed">
            NO CARD TAKEN — WE INVOICE ON DELIVERY
          </p>
        </aside>
      </form>
    </div>
  )
}

function Field({ label, id, type = 'text', value, onChange, required }) {
  return (
    <div>
      <label htmlFor={id} className="measure block mb-1.5">
        {label.toUpperCase()}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 bg-paper-100 border border-paper-200 rounded-[2px] text-sm text-soil-800 focus:border-soil-700 focus:outline-none transition-colors"
      />
    </div>
  )
}
