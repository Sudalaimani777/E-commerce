# 🛒 Vue E-commerce

A modern, responsive e-commerce web application built with **Vue 3**, **TypeScript**, and **Vite**. This project demonstrates best practices for building scalable web applications with state management, routing, and a beautiful Material Design interface.

## 🚀 Features

### Core Functionality

- **📱 Responsive Design** - Fully responsive UI that works on desktop, tablet, and mobile
- **🛍️ Product Catalog** - Browse and search through products with detailed information
- **🛒 Shopping Cart** - Add/remove items, adjust quantities, and manage your cart
- **❤️ Favorites** - Save products to favorites for later viewing
- **📄 Product Details** - Detailed product pages with images, descriptions, and ratings
- **🎊 Interactive Elements** - Confetti animations and smooth transitions

### Technical Features

- **⚡ Fast Performance** - Built with Vite for lightning-fast development and builds
- **🔧 TypeScript** - Full TypeScript support for better development experience
- **📦 State Management** - Pinia stores for cart, favorites, and product management
- **🎨 Material Design** - Beautiful UI components with Vuetify
- **📱 Progressive Web App** - Service worker ready for offline functionality
- **🔄 API Integration** - Axios for HTTP requests and data fetching

## 🛠️ Tech Stack

- **Frontend Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Framework**: Vuetify 3
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **HTTP Client**: Axios
- **Icons**: Material Design Icons
- **Carousel**: Swiper.js
- **Animations**: Vue Confetti Explosion

## 📁 Project Structure

```
E-commerce/
├── public/                  # Static assets
│   └── favicon.ico
├── src/
│   ├── App.vue             # Root component with navigation
│   ├── main.ts             # Application entry point
│   ├── components/         # Reusable components
│   │   └── ProductCard.vue # Product display component
│   ├── router/             # Vue Router configuration
│   │   └── index.ts
│   ├── services/           # API and external services
│   │   └── api.ts         # HTTP client and API calls
│   ├── stores/             # Pinia state management
│   │   ├── cart.ts        # Shopping cart store
│   │   ├── favorites.ts   # Favorites store
│   │   └── products.ts    # Products store
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── views/              # Page components
│   │   ├── CartView.vue           # Shopping cart page
│   │   ├── ConfettiExplosion.vue  # Animation component
│   │   ├── FavoritesView.vue      # Favorites page
│   │   ├── HomeView.vue           # Landing page
│   │   ├── ProductDetailsView.vue # Product detail page
│   │   └── ProductsView.vue       # Product listing page
│   └── config files...    # TypeScript and Vue configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.js         # Vite build configuration
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v20.19.0 or v22.12.0+)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sudalaimani777/E-commerce.git
   cd E-commerce
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

## 📜 Available Scripts

- **`npm run dev`** - Start development server with hot-reload
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build locally

## 🎯 Usage

### Navigation

- **Home** (`/`) - Landing page with featured products
- **Products** (`/products`) - Browse all available products
- **Product Details** (`/product/:id`) - View detailed product information
- **Cart** (`/cart`) - Manage items in your shopping cart
- **Favorites** (`/favorites`) - View your saved favorite products

### Key Interactions

- Click on product cards to view details
- Use the heart icon to add/remove favorites
- Add products to cart from product listings or detail pages
- Manage cart quantities and remove items
- Responsive navigation with badge indicators

## 💻 Development

### Recommended IDE Setup

- **[VS Code](https://code.visualstudio.com/)** with the following extensions:
  - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (Vue 3 support)
  - [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
  - Disable Vetur if previously installed

### Code Style

- Follow Vue 3 Composition API patterns
- Use TypeScript for type safety
- Implement reactive state management with Pinia
- Maintain component modularity and reusability

## 🔧 Configuration

- **Vite Configuration**: See `vite.config.js`
- **TypeScript**: Configured in `tsconfig.json`
- **Vue**: Type definitions in `src/shims-vue.d.ts`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vue.js](https://vuejs.org/) - The Progressive JavaScript Framework
- [Vuetify](https://vuetifyjs.com/) - Material Design Framework
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Pinia](https://pinia.vuejs.org/) - The Vue Store
- [FakeStore API](https://fakestoreapi.com/) - Free fake API for testing and prototyping

---

**Built with ❤️ using Vue 3 + TypeScript + Vite**
