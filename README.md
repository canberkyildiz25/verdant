# VERDANT

An organic vegetable box shop for a co-operative of five family farms in Devon, Cornwall and Kent.

**Live:** https://verdant-produce.netlify.app/

It is built as a full storefront, not a landing page: a filterable catalogue, product pages, a basket that survives a refresh, and a checkout that ends in a real order summary. The co-operative, its farms and its prices are invented for the project.

## The seasonal band

The piece the shop is built around. Every crop carries the months it is actually in the ground, and the band draws that data as a twelve-month grid you can step through. Pick a month and the shop tells you what is cut then. The same data drives the "in season now" stamps on the cards and the season filter in the shop.

It is the honest version of a produce site: if a crop is not in the band this month, it is not in the box.

## What else it does

- **Shop**: every crop, filtered by kind and by season.
- **Product pages**: the grower, the weight, the months it is cut.
- **Basket**: kept in the browser, so a refresh or a closed tab does not empty it.
- **Checkout**: delivery details, then an order reference and a summary. There is no payment step; the copy says invoicing happens on delivery, which is how most UK veg box schemes work.
- **Growers**: the five farms and what each one sends.
- **Seasons**: the whole year of the band on one page.

## Stack

- React 19 and Vite
- React Router 7
- Zustand with `persist` for the basket
- Tailwind CSS 4, with the design tokens declared in `@theme`

The type is Fraunces for display (with the `WONK` axis on), Familjen Grotesk for body, and Sometype Mono for prices, weights and lot numbers.

## Running it

Node 22.

```bash
npm install
npm run dev        # the address Vite prints, usually http://localhost:5173
npm run build      # the production build, into dist/
npm run preview    # serve that build locally
```

There are no environment variables and no server.

## Layout of the code

```
src/
  App.jsx                routes
  pages/                 Home, Shop, Product, Seasons, Growers, Cart, Checkout, OrderConfirmed
  components/            Header, Footer, ProductCard, SeasonBand
  data/products.js       every crop: grower, price, weight and its season months
  store/cart.js          the basket, kept in the browser
  styles.css             Tailwind, the tokens and the few global rules
netlify.toml             the build, and the fallback a single-page app needs
```

Adding a crop means adding an entry to `src/data/products.js` with its season array. The band, the filters and the stamps all read from it.

## Deploying

A static site. The live copy is on Netlify, built with `npm run build` and published from `dist`.

## Author

[Canberk Yıldız](https://canberkyildiz.netlify.app)
