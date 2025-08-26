# 🛒 Vue E-commerce

Welcome to a modern e-commerce web application built with **Vue 3** and **Vite**!  
Browse products, add items to your cart, and manage your favorites with a sleek, responsive UI powered by [Vuetify](https://vuetifyjs.com/).  
Perfect for learning or launching your own online store! 🚀

This template should help get you started developing with Vue 3 in Vite.

## Features

- Product listing with details, ratings, and images
- Add products to cart and manage quantities
- Mark products as favorites
- Responsive UI using Vuetify
- Routing for Home, Product Details, Cart, and Favorites views

## Folder Structure

```
├── public/              # Static assets
├── src/
│   ├── App.vue          # Root Vue component
│   ├── main.ts          # App entry point
│   ├── components/
│   │   └── ProductCard.vue
│   ├── router/
│   │   └── index.ts     # Vue Router setup
│   ├── services/
│   │   └── api.ts       # API calls
│   ├── stores/
│   │   ├── cart.ts      # Cart store (Pinia)
│   │   ├── favorites.ts # Favorites store
│   │   └── products.ts  # Products store
│   ├── types/
│   │   └── index.ts     # TypeScript types
│   ├── views/
│   │   ├── CartView.vue
│   │   ├── FavoritesView.vue
│   │   ├── HomeView.vue
│   │   └── ProductDetailsView.vue
│   └── ...              # Other config and shims
├── package.json         # Project metadata and scripts
├── tsconfig.json        # TypeScript config
├── vite.config.js       # Vite config
└── README.md            # Project documentation
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Linting

```sh
npm run lint
```

## License

This project is licensed under the MIT License.
