<template>
  <div>
    <h1 class="text-h4 mb-6 text-center">Welcome to Our Store</h1>

    <!-- Hero Carousel -->
    <div class="carousel-container mb-8">
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="30"
        :loop="true"
        :autoplay="{
          delay: 4000,
          disableOnInteraction: false,
        }"
        :navigation="true"
        :pagination="{ clickable: true }"
        :effect="'coverflow'"
        :grab-cursor="true"
        :centered-slides="true"
        :coverflow-effect="{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }"
        class="hero-swiper"
      >
        <swiper-slide v-for="slide in carouselSlides" :key="slide.id" @click="navigateToCategory(slide.category)">
          <div class="slide-content">
            <v-img
              :src="slide.image"
              :alt="slide.title"
              height="400"
              cover
              class="slide-image"
            >
              <div class="slide-overlay">
                <div class="slide-text">
                  <h2 class="text-h3 font-weight-bold text-white mb-2">{{ slide.title }}</h2>
                  <p class="text-h6 text-white mb-4">{{ slide.description }}</p>
                  <v-btn
                    color="primary"
                    size="large"
                    variant="elevated"
                    class="explore-btn"
                  >
                    Explore {{ slide.category }}
                    <v-icon end>mdi-arrow-right</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-img>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <!-- Featured Categories -->
    <div class="featured-categories mb-8">
      <h2 class="text-h4 text-center mb-6">Shop by Category</h2>
      <v-row>
        <v-col v-for="category in featuredCategories" :key="category.name" cols="12" sm="6" md="3">
          <v-card
            class="category-card"
            elevation="4"
            hover
            @click="navigateToCategory(category.name)"
          >
            <v-img
              :src="category.image"
              height="200"
              cover
            >
              <div class="category-overlay">
                <h3 class="text-h5 font-weight-bold text-white">{{ category.displayName }}</h3>
              </div>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Offline/Error State -->
    <div v-if="productStore.error && !productStore.loading" class="offline-container">
      <v-card class="offline-card mx-auto" max-width="600" elevation="6">
        <v-card-text class="text-center pa-8">
          <div class="error-icon-container mb-6">
            <v-icon class="error-icon" color="orange-darken-2" size="120">mdi-wifi-off</v-icon>
            <div class="error-pulse"></div>
          </div>

          <h2 class="text-h4 font-weight-bold error-title mb-4">Connection Problem</h2>

          <p class="text-h6 text-medium-emphasis mb-6 error-subtitle">
            🌐 Unable to load products. Please check your internet connection.
          </p>

          <div class="troubleshooting mb-6">
            <v-chip class="ma-1" color="orange" variant="outlined" size="small">
              <v-icon start size="small">mdi-wifi</v-icon>
              Check WiFi
            </v-chip>
            <v-chip class="ma-1" color="red" variant="outlined" size="small">
              <v-icon start size="small">mdi-router-network</v-icon>
              Router status
            </v-chip>
            <v-chip class="ma-1" color="blue" variant="outlined" size="small">
              <v-icon start size="small">mdi-refresh</v-icon>
              Retry connection
            </v-chip>
          </div>

          <div class="action-section">
            <v-btn color="primary" size="large" variant="elevated" prepend-icon="mdi-refresh" @click="retryConnection"
              :loading="isRetrying" class="retry-btn mb-4">
              {{ isRetrying ? 'Connecting...' : 'Try Again' }}
            </v-btn>

            <div class="offline-tips">
              <p class="text-body-2 text-medium-emphasis mb-2">
                <v-icon size="small" class="mr-1">mdi-lightbulb</v-icon>
                Tips while offline:
              </p>
              <div class="tips-grid">
                <v-chip size="small" variant="text" class="ma-1">
                  <v-icon start size="small">mdi-heart</v-icon>
                  Browse favorites
                </v-chip>
                <v-chip size="small" variant="text" class="ma-1">
                  <v-icon start size="small">mdi-cart</v-icon>
                  View cart
                </v-chip>
                <v-chip size="small" variant="text" class="ma-1">
                  <v-icon start size="small">mdi-account</v-icon>
                  Check profile
                </v-chip>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '@/stores/products';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const productStore = useProductStore();
const router = useRouter();
const isRetrying = ref(false);

const modules = [Navigation, Pagination, Autoplay, EffectCoverflow];

// Carousel slides data
const carouselSlides = ref([
  {
    id: 1,
    title: "Latest Fashion Trends",
    description: "Discover the newest styles in men's and women's clothing",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "clothing"
  },
  {
    id: 2,
    title: "Premium Electronics",
    description: "Cutting-edge technology and gadgets for modern life",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "electronics"
  },
  {
    id: 3,
    title: "Elegant Jewelry",
    description: "Exquisite pieces to complement your style",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "jewelery"
  },
  {
    id: 4,
    title: "Men's Collection",
    description: "Sophisticated styles for the modern gentleman",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "men's clothing"
  },
  {
    id: 5,
    title: "Women's Fashion",
    description: "Trendy and comfortable clothing for every occasion",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "women's clothing"
  }
]);

// Featured categories for the grid below
const featuredCategories = ref([
  {
    name: "men's clothing",
    displayName: "Men's Fashion",
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "women's clothing",
    displayName: "Women's Fashion", 
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "jewelery",
    displayName: "Jewelry",
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "electronics",
    displayName: "Electronics",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  }
]);

onMounted(async () => {
  await productStore.fetchProducts();
});

async function retryConnection() {
  isRetrying.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Small delay for UX
    await productStore.fetchProducts();
  } finally {
    isRetrying.value = false;
  }
}

function navigateToCategory(category: string) {
  // Navigate to products page with category filter
  router.push({ 
    name: 'products', 
    query: { category: category.toLowerCase() }
  });
}
</script>

<style scoped>
/* Carousel Styles */
.carousel-container {
  margin: 0 -20px;
}

.hero-swiper {
  height: 450px;
  width: 100%;
}

.slide-content {
  position: relative;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.slide-content:hover {
  transform: scale(1.02);
}

.slide-image {
  border-radius: 12px;
}

.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.slide-text {
  text-align: center;
  padding: 2rem;
  max-width: 600px;
}

.explore-btn {
  background: linear-gradient(45deg, #1976d2, #42a5f5) !important;
  border-radius: 25px !important;
  transition: all 0.3s ease;
}

.explore-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(25, 118, 210, 0.4);
}

/* Featured Categories */
.featured-categories {
  padding: 0 20px;
}

.category-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 12px !important;
  overflow: hidden;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.category-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 20px;
  text-align: center;
}

/* Swiper Navigation Buttons */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #1976d2 !important;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  width: 45px !important;
  height: 45px !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

:deep(.swiper-button-next):hover,
:deep(.swiper-button-prev):hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
}

:deep(.swiper-button-next):after,
:deep(.swiper-button-prev):after {
  font-size: 18px !important;
  font-weight: bold;
}

/* Swiper Pagination */
:deep(.swiper-pagination-bullet) {
  width: 12px !important;
  height: 12px !important;
  background: rgba(255, 255, 255, 0.7) !important;
  opacity: 1 !important;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background: #1976d2 !important;
  transform: scale(1.2);
}

/* Offline/Error State Styles */
.offline-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  animation: fadeInUp 0.8s ease-out;
}

.offline-card {
  border-radius: 16px !important;
  background: linear-gradient(135deg, #fff3e0 0%, #ffcc80 50%, #ff9800 100%);
  position: relative;
  overflow: visible;
  border: 1px solid rgba(255, 152, 0, 0.2);
}

.error-icon-container {
  position: relative;
  display: inline-block;
}

.error-icon {
  animation: wifiPulse 2s ease-in-out infinite;
  position: relative;
  z-index: 2;
}

.error-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  border: 3px solid #f57c00;
  border-radius: 50%;
  animation: errorRipple 3s infinite;
  opacity: 0;
}

.error-title {
  color: #e65100;
  animation: slideInUp 0.8s ease-out 0.3s both;
}

.error-subtitle {
  animation: slideInUp 0.8s ease-out 0.5s both;
}

.troubleshooting {
  animation: slideInUp 0.8s ease-out 0.7s both;
}

.action-section {
  animation: slideInUp 0.8s ease-out 0.9s both;
}

.retry-btn {
  transition: all 0.3s ease;
  border-radius: 25px !important;
  background: linear-gradient(45deg, #ff9800, #f57c00) !important;
  min-width: 160px;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 152, 0, 0.4);
}

.offline-tips {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  padding: 16px;
  margin-top: 16px;
}

.tips-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes wifiPulse {

  0%,
  100% {
    transform: scale(1);
    opacity: 0.8;
  }

  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}

@keyframes errorRipple {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }

  100% {
    transform: translate(-50%, -50%) scale(2.5);
    opacity: 0;
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive design */
@media (max-width: 600px) {
  .carousel-container {
    margin: 0 -10px;
  }
  
  .hero-swiper {
    height: 350px;
  }
  
  .slide-text {
    padding: 1rem;
  }
  
  .slide-text h2 {
    font-size: 1.8rem !important;
  }
  
  .slide-text p {
    font-size: 1rem !important;
  }

  .offline-card {
    margin: 0 16px;
  }

  .error-icon {
    font-size: 100px !important;
  }

  .error-pulse {
    width: 100px;
    height: 100px;
  }

  .tips-grid {
    flex-direction: column;
    align-items: center;
  }

  .retry-btn {
    width: 100%;
  }
  
  .featured-categories {
    padding: 0 10px;
  }
}

@media (max-width: 768px) {
  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    display: none;
  }
}
</style>