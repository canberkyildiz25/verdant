import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MONTHS, products, inSeason } from '../data/products'

const CURRENT_MONTH = new Date().getMonth() + 1

/**
 * İmza öğe: on iki aylık hasat şeridi.
 * Her ürünün tarlada olduğu aylar dolu blok olarak çizilir; bir aya tıklayınca
 * o ayın ürünleri listelenir. Süs değil — katalogdaki `season` verisini okur.
 */
export default function SeasonBand() {
  const [month, setMonth] = useState(CURRENT_MONTH)
  const crops = products.filter((p) => p.category !== 'boxes')
  const available = inSeason(month)

  return (
    <section className="py-20 md:py-28 bg-soil-800 text-paper-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="measure text-corn-400 mb-4">THE GROWING YEAR</p>
            <h2 className="font-display text-4xl md:text-5xl mb-3">
              Nothing is grown out of turn
            </h2>
            <p className="text-paper-200/70 max-w-lg leading-relaxed">
              We do not fly anything in. If a crop is not in this band for the month
              you are reading, it is not in the ground — and it will not be in your box.
            </p>
          </div>

          <p className="measure text-paper-400 shrink-0">
            VIEWING · {MONTHS[month - 1].toUpperCase()}
          </p>
        </div>

        {/* Ay seçici */}
        <div className="flex gap-1 mb-2 overflow-x-auto hide-scrollbar pb-1">
          {MONTHS.map((label, i) => {
            const m = i + 1
            const active = m === month
            return (
              <button
                key={label}
                onClick={() => setMonth(m)}
                className={`flex-1 min-w-[62px] py-2.5 text-xs font-mono tracking-wider rounded-[2px] transition-all duration-300 ${
                  active
                    ? 'bg-corn-500 text-soil-900 font-semibold'
                    : 'bg-soil-700 text-paper-200/60 hover:bg-soil-600 hover:text-paper-100'
                }`}
              >
                {label.toUpperCase()}
                {m === CURRENT_MONTH && (
                  <span className="block text-[0.55rem] mt-0.5 opacity-70">now</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Hasat ızgarası — her satır bir ürün, dolu bloklar mevsimi */}
        <div className="space-y-1.5 mb-12">
          {crops.map((crop) => (
            <div key={crop.slug} className="flex items-center gap-4">
              <Link
                to={`/product/${crop.slug}`}
                className="w-36 sm:w-48 shrink-0 text-sm text-paper-200/80 hover:text-corn-400 transition-colors truncate"
              >
                {crop.name}
              </Link>
              <div className="flex-1 flex gap-1">
                {MONTHS.map((_, i) => {
                  const m = i + 1
                  const growing = crop.season.includes(m)
                  const selected = m === month
                  return (
                    <span
                      key={m}
                      className={`h-6 flex-1 rounded-[1px] transition-all duration-300 ${
                        growing
                          ? selected
                            ? 'bg-corn-400'
                            : 'bg-leaf-500'
                          : selected
                            ? 'bg-soil-600'
                            : 'bg-soil-700'
                      }`}
                      title={`${crop.name} · ${MONTHS[i]}`}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="rule-dashed border-paper-200/20 pt-8">
          <p className="text-paper-200/70 mb-5">
            {available.length > 0 ? (
              <>
                <span className="text-corn-400 font-semibold">{available.length} crops</span>{' '}
                are cut in {MONTHS[month - 1]}.
              </>
            ) : (
              <>Nothing is cut in {MONTHS[month - 1]} — the boxes run on stores that month.</>
            )}
          </p>

          <div className="flex flex-wrap gap-2">
            {available.map((crop) => (
              <Link
                key={crop.slug}
                to={`/product/${crop.slug}`}
                className="px-3.5 py-2 border border-paper-200/25 rounded-[2px] text-sm transition-all duration-300 hover:border-corn-400 hover:text-corn-400"
              >
                {crop.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
