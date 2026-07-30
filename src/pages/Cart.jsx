import { Link } from 'react-router-dom'
import { products, formatPrice } from '../data/products'
import { useCart, buildTotals, FREE_DELIVERY_OVER } from '../store/cart'

export default function Cart() {
  const items = useCart((s) => s.items)
  const setQty = useCart((s) => s.setQty)
  const remove = useCart((s) => s.remove)

  const { lines, subtotal, delivery, total, remainingForFree } = buildTotals(items, products)

  if (lines.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 text-center">
        <p className="measure text-radish-500 mb-4">EMPTY CRATE</p>
        <h1 className="font-display text-4xl md:text-5xl text-soil-800 mb-4">
          Nothing in the basket
        </h1>
        <p className="text-soil-600/75 mb-8 max-w-sm mx-auto">
          Orders close Thursday at six for Saturday delivery.
        </p>
        <Link to="/shop" className="btn-soil">Start with a box</Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 md:py-16">
      <p className="measure text-radish-500 mb-3">YOUR CRATE</p>
      <h1 className="font-display text-5xl md:text-6xl text-soil-800 mb-10">Basket</h1>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-14 items-start">
        <div>
          {lines.map((line) => (
            <div key={line.slug} className="rule-dashed py-5 flex gap-5 first:border-t-0 first:pt-0">
              <Link to={`/product/${line.slug}`} className="shrink-0 w-24 h-24 bg-paper-100 rounded-[2px] flex items-center justify-center p-2">
                <img
                  src={line.image}
                  alt={line.name}
                  className="max-h-full w-auto object-contain mix-blend-multiply"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-4">
                  <div className="min-w-0">
                    <Link
                      to={`/product/${line.slug}`}
                      className="font-display text-xl text-soil-800 hover:text-radish-500 transition-colors block leading-tight"
                    >
                      {line.name}
                    </Link>
                    <p className="measure mt-1">
                      {formatPrice(line.price)} · {line.weight}
                    </p>
                  </div>
                  <p className="font-mono text-lg text-soil-800 shrink-0">
                    {formatPrice(line.lineTotal)}
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-3.5">
                  <div className="flex items-center border border-paper-200 rounded-[2px]">
                    <button
                      onClick={() => setQty(line.slug, line.qty - 1)}
                      className="px-3 py-1.5 text-soil-700 hover:bg-paper-100 transition-colors"
                      aria-label={`One fewer ${line.name}`}
                    >
                      −
                    </button>
                    <span className="font-mono text-sm w-8 text-center">{line.qty}</span>
                    <button
                      onClick={() => setQty(line.slug, line.qty + 1)}
                      className="px-3 py-1.5 text-soil-700 hover:bg-paper-100 transition-colors"
                      aria-label={`One more ${line.name}`}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => remove(line.slug)}
                    className="text-sm text-paper-400 hover:text-radish-500 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="seed-card p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-2xl text-soil-800 mb-5">Order summary</h2>

          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-soil-600/75">Subtotal</dt>
              <dd className="font-mono">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-soil-600/75">Delivery</dt>
              <dd className="font-mono">
                {delivery === 0 ? 'Free' : formatPrice(delivery)}
              </dd>
            </div>
          </dl>

          {remainingForFree > 0 && (
            <p className="mt-4 text-xs text-soil-600/70 bg-paper-50 border border-paper-200 rounded-[2px] px-3 py-2.5">
              Spend {formatPrice(remainingForFree)} more for free delivery
              (over {formatPrice(FREE_DELIVERY_OVER)}).
            </p>
          )}

          <div className="rule-dashed mt-5 pt-4 flex justify-between items-baseline">
            <span className="font-display text-xl text-soil-800">Total</span>
            <span className="font-mono text-2xl text-soil-800">{formatPrice(total)}</span>
          </div>

          <Link to="/checkout" className="btn-soil w-full mt-6">
            Checkout
          </Link>
          <Link
            to="/shop"
            className="block text-center text-sm text-soil-600/70 hover:text-radish-500 transition-colors mt-4"
          >
            Keep shopping
          </Link>
        </aside>
      </div>
    </div>
  )
}
