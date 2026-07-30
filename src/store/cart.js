import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const DELIVERY_FEE = 3.5
const FREE_DELIVERY_OVER = 40

export const useCart = create()(
  persist(
    (set, get) => ({
      items: [], // { slug, qty }
      lastOrder: null,

      add: (slug, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.slug === slug)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.slug === slug ? { ...i, qty: i.qty + qty } : i,
              ),
            }
          }
          return { items: [...state.items, { slug, qty }] }
        }),

      remove: (slug) =>
        set((state) => ({ items: state.items.filter((i) => i.slug !== slug) })),

      setQty: (slug, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.slug !== slug)
              : state.items.map((i) => (i.slug === slug ? { ...i, qty } : i)),
        })),

      clear: () => set({ items: [] }),

      qtyOf: (slug) => get().items.find((i) => i.slug === slug)?.qty ?? 0,

      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),

      /** Sipariş tamamlanınca sepeti boşaltır, özeti onay ekranı için saklar. */
      placeOrder: (details, totals) =>
        set({ items: [], lastOrder: { details, totals, ref: makeRef() } }),
    }),
    { name: 'verdant-cart' },
  ),
)

const makeRef = () =>
  'VD' + Math.random().toString(36).slice(2, 7).toUpperCase()

/** Sepet satırlarını katalogla birleştirip toplamları hesaplar. */
export function buildTotals(items, products) {
  const lines = items
    .map((item) => {
      const product = products.find((p) => p.slug === item.slug)
      if (!product) return null
      return { ...product, qty: item.qty, lineTotal: product.price * item.qty }
    })
    .filter(Boolean)

  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0)
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE
  const remainingForFree = Math.max(0, FREE_DELIVERY_OVER - subtotal)

  return { lines, subtotal, delivery, total: subtotal + delivery, remainingForFree }
}

export { DELIVERY_FEE, FREE_DELIVERY_OVER }
