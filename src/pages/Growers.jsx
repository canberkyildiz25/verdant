const FARMS = [
  {
    name: 'Ashcombe Farm',
    place: 'Devon',
    since: '2019',
    grows: 'Carrots, leeks, brassicas, potatoes',
    note:
      'The first farm to send us anything. Forty acres on clay, which is hard work in a wet spring but holds moisture through August better than sand ever will.',
    image: '/img/how/HowDesctop.webp',
  },
  {
    name: 'Trelow Fields',
    place: 'Cornwall',
    since: '2021',
    grows: 'Sweet potatoes, squash, chard',
    note:
      'Far enough south to get away with crops that fail elsewhere in the country. They cure the sweet potatoes in an old grain store for three weeks before we take them.',
    image: '/img/order/order-img.webp',
  },
  {
    name: 'Marsh Lane',
    place: 'Kent',
    since: '2022',
    grows: 'Sweetcorn, aubergines, tomatoes, peppers',
    image: '/img/hero/hero-img-tablet-black.webp',
    note:
      'Two glasshouses and eleven acres of open field. The sweetcorn is cut before six in the morning because the sugar starts turning the moment it comes off the stalk.',
  },
]

export default function Growers() {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 md:py-16">
      <p className="measure text-radish-500 mb-3">WHO GROWS IT</p>
      <h1 className="font-display text-5xl md:text-6xl text-soil-800 mb-5">Our growers</h1>
      <p className="text-lg text-soil-600/80 max-w-xl leading-relaxed mb-14">
        Five farms, none of them more than three hours from the packing shed. We pay
        them before the box is sold, which is the part of this that matters most.
      </p>

      <div className="space-y-16">
        {FARMS.map((farm, i) => (
          <article
            key={farm.name}
            className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
              i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
            }`}
          >
            <img
              src={farm.image}
              alt={`${farm.name} in ${farm.place}`}
              loading="lazy"
              className="w-full h-64 md:h-80 object-cover rounded-[3px]"
            />

            <div>
              <div className="flex items-baseline gap-3 mb-3">
                <h2 className="font-display text-3xl md:text-4xl text-soil-800">{farm.name}</h2>
                <span className="measure">{farm.place.toUpperCase()}</span>
              </div>

              <p className="text-soil-600/80 leading-relaxed mb-6">{farm.note}</p>

              <dl className="rule-dashed pt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="measure mb-1">WITH US SINCE</dt>
                  <dd className="text-soil-700 font-mono">{farm.since}</dd>
                </div>
                <div>
                  <dt className="measure mb-1">GROWS</dt>
                  <dd className="text-soil-700">{farm.grows}</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
