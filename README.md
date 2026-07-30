# VERDANT

An organic vegetable box shop for a co-operative of five family farms in Devon,
Cornwall and Kent.

Built as a full storefront rather than a landing page: a filterable catalogue, product
pages, a basket that survives a refresh, and a checkout that ends in a real order
summary.

## The seasonal band

The piece the shop is built around. Every crop carries the months it is actually in the
ground, and the band renders that data as a twelve-month grid you can step through.
Pick a month and the shop tells you what is cut then — the same data drives the "in
season now" stamps on the cards and the season filter in the shop.

It is the honest version of a produce site: if a crop is not in the band this month, it
is not in the box.

## Stack

- React 19 + Vite
- React Router 7
- Zustand with `persist` for the basket
- Tailwind CSS 4, design tokens declared in `@theme`

Typography is Fraunces (display, with the `WONK` axis on), Familjen Grotesk (body) and
Sometype Mono for prices, weights and lot numbers.

## Running it

```bash
npm install
npm run dev
```

## Notes

- No payment step. Checkout collects delivery details and issues an order reference —
  the copy says invoicing happens on delivery, which is how most UK veg box schemes
  actually work.
- Product data lives in `src/data/products.js`. Adding a crop means adding its season
  array; the band, the filters and the stamps all read from it.
