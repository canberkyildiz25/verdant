import { Link } from 'react-router-dom'
import { formatPrice } from '../data/products'
import { useCart } from '../store/cart'

const CURRENT_MONTH = new Date().getMonth() + 1

export default function ProductCard({ product }) {
  const add = useCart((s) => s.add)
  const qty = useCart((s) => s.items.find((i) => i.slug === product.slug)?.qty ?? 0)

  const isBox = product.category === 'boxes'
  const peaking = !isBox && product.season.includes(CURRENT_MONTH)

  return (
    <article className="seed-card flex flex-col">
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative pt-6 px-5">
          {/* parti numarası — tohum paketi künyesi */}
          <span className="measure absolute top-8 right-5 text-paper-400">{product.lot}</span>

          <div className="h-40 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="max-h-40 w-auto object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        <div className="px-5 pt-4">
          {peaking && (
            <span className="stamp text-leaf-500 mb-2.5">In season now</span>
          )}
          {isBox && <span className="stamp text-radish-500 mb-2.5">Weekly box</span>}

          <h3 className="font-display text-xl text-soil-800 leading-tight mb-1.5">
            {product.name}
          </h3>
          <p className="text-sm text-soil-600/75 line-clamp-2 leading-snug">{product.short}</p>
        </div>
      </Link>

      <div className="px-5 pb-5 pt-4 mt-auto">
        <div className="rule-dashed pt-3.5 flex items-end justify-between gap-3">
          <div>
            <p className="font-mono text-lg text-soil-800 leading-none">
              {formatPrice(product.price)}
            </p>
            <p className="measure mt-1">{product.weight}</p>
          </div>

          <button
            onClick={() => add(product.slug)}
            className="btn-soil !px-4 !py-2.5 !text-sm"
            aria-label={`Add ${product.name} to basket`}
          >
            {qty > 0 ? `In basket · ${qty}` : 'Add'}
          </button>
        </div>
      </div>
    </article>
  )
}
