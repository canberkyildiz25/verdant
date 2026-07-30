import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { findProduct, formatPrice, products, MONTHS } from '../data/products'
import ProductCard from '../components/ProductCard'
import { useCart } from '../store/cart'

const CURRENT_MONTH = new Date().getMonth() + 1

export default function Product() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const product = findProduct(slug)
  const add = useCart((s) => s.add)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 text-center">
        <h1 className="font-display text-4xl text-soil-800 mb-4">We don’t grow that</h1>
        <Link to="/shop" className="btn-soil">Back to the shop</Link>
      </div>
    )
  }

  const isBox = product.category === 'boxes'
  const peaking = !isBox && product.season.includes(CURRENT_MONTH)
  const related = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 4)

  const handleAdd = () => {
    add(product.slug, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 md:py-14">
      <nav className="measure mb-8 flex items-center gap-2">
        <Link to="/shop" className="hover:text-radish-500 transition-colors">SHOP</Link>
        <span>/</span>
        <span className="text-soil-700">{product.name.toUpperCase()}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="seed-card p-8 flex items-center justify-center min-h-[22rem]">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-80 w-auto object-contain mix-blend-multiply"
          />
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {peaking && <span className="stamp text-leaf-500">In season now</span>}
            {isBox && <span className="stamp text-radish-500">Weekly box</span>}
            <span className="stamp text-paper-400">LOT {product.lot}</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl text-soil-800 mb-4">
            {product.name}
          </h1>

          <p className="text-lg text-soil-600/80 leading-relaxed mb-8">
            {product.description}
          </p>

          <dl className="rule-dashed border-b pb-6 mb-6 grid grid-cols-2 gap-y-4 text-sm">
            <div>
              <dt className="measure mb-1">GROWER</dt>
              <dd className="text-soil-700">{product.grower}</dd>
            </div>
            <div>
              <dt className="measure mb-1">SOLD BY</dt>
              <dd className="text-soil-700">{product.weight}</dd>
            </div>
            {product.serves && (
              <div>
                <dt className="measure mb-1">SERVES</dt>
                <dd className="text-soil-700">{product.serves}</dd>
              </div>
            )}
            <div>
              <dt className="measure mb-1">IN THE GROUND</dt>
              <dd className="text-soil-700">
                {product.season.length === 12
                  ? 'All year'
                  : product.season.map((m) => MONTHS[m - 1]).join(' · ')}
              </dd>
            </div>
          </dl>

          <div className="flex items-end justify-between gap-6 mb-6">
            <div>
              <p className="font-mono text-3xl text-soil-800 leading-none">
                {formatPrice(product.price)}
              </p>
              <p className="measure mt-1.5">{product.stock} left this week</p>
            </div>

            <div className="flex items-center border border-paper-200 rounded-[2px]">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3.5 py-2.5 text-soil-700 hover:bg-paper-100 transition-colors"
                aria-label="One fewer"
              >
                −
              </button>
              <span className="font-mono text-sm w-9 text-center">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="px-3.5 py-2.5 text-soil-700 hover:bg-paper-100 transition-colors"
                aria-label="One more"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={handleAdd} className="btn-soil flex-1 min-w-[10rem]">
              {added ? '✓ Added to basket' : `Add ${qty} to basket`}
            </button>
            <button onClick={() => { add(product.slug, qty); navigate('/cart') }} className="btn-radish">
              Buy now
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-3xl text-soil-800 mb-8">More like this</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
