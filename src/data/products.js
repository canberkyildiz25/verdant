/**
 * VERDANT kataloğu.
 * Fiyatlar kilogram başına sterlin; kutular sabit fiyatlı.
 * `season` = ürünün tarlada olduğu aylar (1 = Ocak). Mevsim şeridi bunu okur.
 */

export const CATEGORIES = [
  { id: 'boxes', label: 'Vegetable boxes' },
  { id: 'roots', label: 'Roots & tubers' },
  { id: 'greens', label: 'Leaves & stems' },
  { id: 'fruiting', label: 'Fruiting crops' },
  { id: 'fungi', label: 'Mushrooms' },
]

export const products = [
  // ── Kutular ───────────────────────────────────────────────
  {
    slug: 'weekly-small-box',
    name: 'The Weekly Small',
    category: 'boxes',
    price: 18.0,
    unit: 'box',
    weight: '3.5 kg',
    serves: 'Feeds 1–2 people',
    image: '/img/order/order-img.webp',
    season: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    grower: 'Rotating — five farms',
    lot: 'VD-01',
    short: 'Seven or eight varieties, picked the morning it leaves us.',
    description:
      'The box we send most. Whatever is at its peak that week goes in — usually seven or eight varieties, always a root, always something leafy. Packed at dawn, on your step within a day.',
    stock: 42,
  },
  {
    slug: 'weekly-family-box',
    name: 'The Weekly Family',
    category: 'boxes',
    price: 32.0,
    unit: 'box',
    weight: '7 kg',
    serves: 'Feeds 4–5 people',
    image: '/img/order/order-img-tab.webp',
    season: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    grower: 'Rotating — five farms',
    lot: 'VD-02',
    short: 'Twice the small box, with more of the storing vegetables.',
    description:
      'Built for a household that cooks every night. Same picking standard as the small box, weighted towards potatoes, onions and squash so it lasts the full week.',
    stock: 28,
  },
  {
    slug: 'roots-box',
    name: 'The Root Cellar',
    category: 'boxes',
    price: 24.0,
    unit: 'box',
    weight: '6 kg',
    serves: 'Keeps for three weeks',
    image: '/img/how/HowDesctop.webp',
    season: [9, 10, 11, 12, 1, 2, 3],
    grower: 'Ashcombe Farm, Devon',
    lot: 'VD-03',
    short: 'Everything that keeps: carrots, potatoes, celeriac, beetroot.',
    description:
      'A cold-weather box of vegetables that improve in storage. Kept unwashed, exactly as they came out of the ground, because the soil is what keeps them from drying out.',
    stock: 15,
  },

  // ── Tekil ürünler ─────────────────────────────────────────
  {
    slug: 'carrots',
    name: 'Nantes Carrots',
    category: 'roots',
    price: 2.4,
    unit: 'kg',
    weight: 'per kg',
    image: '/img/vegetables/carrot.webp',
    season: [6, 7, 8, 9, 10, 11],
    grower: 'Ashcombe Farm, Devon',
    lot: 'VD-11',
    short: 'Sweet, blunt-tipped, pulled with the tops still on.',
    description:
      'The Nantes is a blunt, almost cylindrical carrot with very little core, which is why it tastes sweeter than the supermarket types. We send them with the tops on — cut them off when you get home or they will pull moisture out of the root.',
    stock: 120,
  },
  {
    slug: 'sweet-potatoes',
    name: 'Beauregard Sweet Potatoes',
    category: 'roots',
    price: 3.1,
    unit: 'kg',
    weight: 'per kg',
    image: '/img/vegetables/sweet-potatoes.webp',
    season: [9, 10, 11, 12],
    grower: 'Trelow Fields, Cornwall',
    lot: 'VD-12',
    short: 'Deep orange, cured three weeks for sweetness.',
    description:
      'Lifted in early autumn and cured for three weeks before they reach you, which is when the starch turns to sugar. Roast them whole rather than boiling — the skin does the work.',
    stock: 64,
  },
  {
    slug: 'leeks',
    name: 'Musselburgh Leeks',
    category: 'greens',
    price: 2.8,
    unit: 'kg',
    weight: 'per kg',
    image: '/img/vegetables/leek.webp',
    season: [10, 11, 12, 1, 2, 3],
    grower: 'Ashcombe Farm, Devon',
    lot: 'VD-13',
    short: 'A hard old Scottish variety that takes frost well.',
    description:
      'A nineteenth-century variety, short and thick, that stands through frost without turning to mush. The dark green tops are worth keeping for stock even though most recipes tell you to throw them away.',
    stock: 88,
  },
  {
    slug: 'sweetcorn',
    name: 'Field Sweetcorn',
    category: 'fruiting',
    price: 1.2,
    unit: 'each',
    weight: 'per cob',
    image: '/img/vegetables/corn.webp',
    season: [7, 8, 9],
    grower: 'Marsh Lane, Kent',
    lot: 'VD-14',
    short: 'Cut at dawn — sugar turns to starch within hours.',
    description:
      'Cut before six in the morning and dispatched the same day, because sweetcorn starts converting its sugar to starch the moment it leaves the stalk. Nine weeks of the year, and worth waiting for.',
    stock: 210,
  },
  {
    slug: 'aubergines',
    name: 'Glasshouse Aubergines',
    category: 'fruiting',
    price: 4.2,
    unit: 'kg',
    weight: 'per kg',
    image: '/img/vegetables/eggplant.webp',
    season: [7, 8, 9, 10],
    grower: 'Marsh Lane, Kent',
    lot: 'VD-15',
    short: 'Grown under glass, picked while the skin still shines.',
    description:
      'Picked young, when the skin is tight and glossy and the seeds have not set. A dull skin means it sat too long on the plant and will taste bitter — so we cut them small and send them fast.',
    stock: 47,
  },
  {
    slug: 'chestnut-mushrooms',
    name: 'Chestnut Mushrooms',
    category: 'fungi',
    price: 5.6,
    unit: 'kg',
    weight: 'per kg',
    image: '/img/vegetables/mushrooms.webp',
    season: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    grower: 'Wealden Mushroom Co.',
    lot: 'VD-16',
    short: 'Grown on oak substrate in the dark, all year round.',
    description:
      'The only thing we sell that has no season, grown on spent oak in a dark shed in Sussex. Firmer and nuttier than a white button. Keep them in paper, never plastic.',
    stock: 73,
  },
]

export const findProduct = (slug) => products.find((p) => p.slug === slug)

export const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

/** Verilen ay için tarlada olan ürünler (kutular hariç — onlar her ay var). */
export const inSeason = (month) =>
  products.filter((p) => p.category !== 'boxes' && p.season.includes(month))

export const formatPrice = (value) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(value)
