import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products, CATEGORIES, MONTHS } from '../data/products'
import ProductCard from '../components/ProductCard'

const CURRENT_MONTH = new Date().getMonth() + 1

const SORTS = [
  { id: 'name', label: 'Name' },
  { id: 'price-asc', label: 'Price, low first' },
  { id: 'price-desc', label: 'Price, high first' },
]

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') ?? 'all'
  const [seasonOnly, setSeasonOnly] = useState(false)
  const [sort, setSort] = useState('name')

  const setCategory = (id) => {
    if (id === 'all') {
      params.delete('category')
    } else {
      params.set('category', id)
    }
    setParams(params, { replace: true })
  }

  const visible = useMemo(() => {
    let list = products

    if (category !== 'all') list = list.filter((p) => p.category === category)
    if (seasonOnly) {
      list = list.filter((p) => p.category === 'boxes' || p.season.includes(CURRENT_MONTH))
    }

    const sorted = [...list]
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    else sorted.sort((a, b) => a.name.localeCompare(b.name))

    return sorted
  }, [category, seasonOnly, sort])

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 md:py-16">
      <header className="mb-10">
        <p className="measure text-radish-500 mb-3">THE LIST</p>
        <h1 className="font-display text-5xl md:text-6xl text-soil-800 mb-3">Shop</h1>
        <p className="text-soil-600/75 max-w-xl leading-relaxed">
          Everything we have cut this week, plus the boxes. Orders close Thursday at
          six for Saturday delivery.
        </p>
      </header>

      {/* Filtreler */}
      <div className="rule-dashed border-t-0 border-b pb-6 mb-8 flex flex-col gap-5">
        <div className="flex flex-wrap gap-2">
          <FilterChip active={category === 'all'} onClick={() => setCategory('all')}>
            Everything
          </FilterChip>
          {CATEGORIES.map((cat) => (
            <FilterChip
              key={cat.id}
              active={category === cat.id}
              onClick={() => setCategory(cat.id)}
            >
              {cat.label}
            </FilterChip>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <label className="flex items-center gap-2.5 text-sm text-soil-700 select-none">
            <input
              type="checkbox"
              checked={seasonOnly}
              onChange={(e) => setSeasonOnly(e.target.checked)}
              className="w-4 h-4 accent-radish-500"
            />
            Only what’s in season in {MONTHS[CURRENT_MONTH - 1]}
          </label>

          <div className="flex items-center gap-2.5">
            <label htmlFor="sort" className="measure">
              SORT
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-paper-100 border border-paper-200 rounded-[2px] px-3 py-1.5 text-sm text-soil-700"
            >
              {SORTS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <p className="measure mb-6">
        {visible.length} {visible.length === 1 ? 'PRODUCT' : 'PRODUCTS'}
      </p>

      {visible.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="font-display text-2xl text-soil-800 mb-3">Nothing here this month</p>
          <p className="text-soil-600/70">
            Try clearing the season filter — the boxes run all year.
          </p>
        </div>
      )}
    </div>
  )
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-[2px] text-sm transition-all duration-300 border ${
        active
          ? 'bg-soil-700 text-paper-50 border-soil-700 font-medium'
          : 'bg-transparent text-soil-700 border-paper-200 hover:border-soil-700'
      }`}
    >
      {children}
    </button>
  )
}
