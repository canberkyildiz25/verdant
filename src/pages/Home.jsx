import { Link } from 'react-router-dom'
import { products, MONTHS } from '../data/products'
import ProductCard from '../components/ProductCard'
import SeasonBand from '../components/SeasonBand'

const CURRENT_MONTH = new Date().getMonth() + 1

const STEPS = [
  {
    n: '01',
    title: 'Order by Thursday',
    body: 'Pick a box or single crops. The list changes every week because the fields do.',
  },
  {
    n: '02',
    title: 'We cut on Friday',
    body: 'Everything is harvested between five and eight in the morning, then packed the same hour.',
  },
  {
    n: '03',
    title: 'On your step Saturday',
    body: 'Unwashed, in a paper-lined crate. Leave the crate out and we take it back next week.',
  },
]

export default function Home() {
  const boxes = products.filter((p) => p.category === 'boxes')
  const peaking = products
    .filter((p) => p.category !== 'boxes' && p.season.includes(CURRENT_MONTH))
    .slice(0, 4)

  return (
    <>
      {/* Hero — ürünün kendi dünyasından tek bir görüntü, üstünde künye */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-12 md:pt-20 pb-16">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
            <div className="animate-grow">
              <p className="measure text-radish-500 mb-5">
                CUT {MONTHS[CURRENT_MONTH - 1].toUpperCase()} · DEVON · CORNWALL · KENT
              </p>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-[4.5rem] text-soil-800 mb-6">
                Vegetables that
                <br />
                still smell
                <br />
                <span className="italic text-leaf-500">of the field.</span>
              </h1>

              <p className="text-lg text-soil-600/80 max-w-md mb-9 leading-relaxed">
                Five family farms, one crate, no cold store. We cut on Friday morning
                and you cook it on Saturday — that is the whole idea.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to="/shop?category=boxes" className="btn-soil">
                  Choose a box
                </Link>
                <Link to="/seasons" className="btn-outline">
                  See what’s in season
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
                {[
                  ['5', 'family farms'],
                  ['18h', 'field to door'],
                  ['0', 'air-freighted crops'],
                ].map(([figure, label]) => (
                  <div key={label}>
                    <p className="font-display text-3xl text-soil-800 leading-none">{figure}</p>
                    <p className="measure mt-1.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="/img/hero/hero-img-laptop-black.webp"
                alt="A wooden crate of just-picked vegetables carried across grass"
                className="w-full h-auto rounded-[3px]"
              />
              {/* kasa etiketi */}
              <div className="absolute -bottom-5 -left-3 sm:left-6 bg-paper-50 border border-paper-200 px-5 py-3.5 rounded-[2px] shadow-lg max-w-[15rem]">
                <p className="measure text-radish-500">THIS WEEK’S CRATE</p>
                <p className="font-display text-lg text-soil-800 mt-1 leading-tight">
                  Artichoke, chard, beetroot, sweetcorn
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kutular */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <p className="measure text-radish-500 mb-3">THE BOXES</p>
              <h2 className="font-display text-4xl md:text-5xl text-soil-800">
                Pick a size, we do the choosing
              </h2>
            </div>
            <Link to="/shop" className="hidden sm:block text-sm font-medium text-soil-700 hover:text-radish-500 transition-colors shrink-0">
              All products →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {boxes.map((box) => (
              <ProductCard key={box.slug} product={box} />
            ))}
          </div>
        </div>
      </section>

      {/* Nasıl çalışır — gerçek bir sıra olduğu için numaralandırma burada bilgi taşıyor */}
      <section className="py-16 md:py-20 bg-paper-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <p className="measure text-radish-500 mb-3">THE WEEK</p>
          <h2 className="font-display text-4xl md:text-5xl text-soil-800 mb-12 max-w-lg">
            Three days from soil to kitchen
          </h2>

          <div className="grid gap-10 md:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.n}>
                <p className="font-mono text-sm text-radish-500 mb-3">{step.n}</p>
                <h3 className="font-display text-2xl text-soil-800 mb-2.5">{step.title}</h3>
                <p className="text-soil-600/75 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SeasonBand />

      {/* Bu ay tarlada olanlar */}
      {peaking.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="flex items-end justify-between gap-6 mb-10">
              <div>
                <p className="measure text-radish-500 mb-3">
                  CUT THIS WEEK
                </p>
                <h2 className="font-display text-4xl md:text-5xl text-soil-800">
                  At its best right now
                </h2>
              </div>
              <Link to="/shop" className="hidden sm:block text-sm font-medium text-soil-700 hover:text-radish-500 transition-colors shrink-0">
                All products →
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {peaking.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
