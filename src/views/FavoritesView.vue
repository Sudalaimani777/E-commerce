<template>
  <div>
    <h1 class="text-h4 mb-6">Favorites</h1>

    <!-- Empty Favorites State -->
    <div v-if="favorites.items.length === 0" class="empty-favorites-container">
      <v-card
        class="empty-favorites-card mx-auto"
        max-width="500"
        elevation="4"
      >
        <v-card-text class="text-center pa-8">
          <div class="heart-icon-container mb-6">
            <v-icon class="heart-icon" color="pink-lighten-1" size="100"
              >mdi-heart-outline</v-icon
            >
            <div class="heart-pulse"></div>
          </div>

          <h2 class="text-h4 font-weight-bold empty-title mb-4">
            No Favorites Yet
          </h2>

          <p class="text-h6 text-medium-emphasis mb-6 empty-subtitle">
            💝 Start building your wishlist by adding products you love!
          </p>

          <div class="features-list mb-6">
            <v-chip class="ma-1" color="pink" variant="outlined" size="small">
              <v-icon start size="small">mdi-heart-plus</v-icon>
              Save favorites
            </v-chip>
            <v-chip class="ma-1" color="purple" variant="outlined" size="small">
              <v-icon start size="small">mdi-compare</v-icon>
              Easy comparison
            </v-chip>
            <v-chip class="ma-1" color="indigo" variant="outlined" size="small">
              <v-icon start size="small">mdi-bell-ring</v-icon>
              Price alerts
            </v-chip>
          </div>

          <div class="action-section">
            <v-btn
              color="primary"
              size="large"
              variant="elevated"
              prepend-icon="mdi-storefront"
              to="/"
              class="browse-btn"
            >
              Browse Products
            </v-btn>

            <p class="text-caption mt-4 text-medium-emphasis">
              Tip: Click the ❤️ icon on any product to add it to your favorites
            </p>
          </div>
        </v-card-text>
      </v-card>
    </div>

    <v-row v-else>
      <v-col
        v-for="product in favorites.items"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <ProductCard :product="product" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useFavoritesStore } from "@/stores/favorites";
import ProductCard from "@/components/ProductCard.vue";

const favorites = useFavoritesStore();
</script>

<style scoped>
.empty-favorites-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  animation: fadeInUp 0.8s ease-out;
}

.empty-favorites-card {
  border-radius: 16px !important;
  background: linear-gradient(135deg, #fce4ec 0%, #f8bbd9 50%, #e1bee7 100%);
  position: relative;
  overflow: visible;
  border: 1px solid rgba(233, 30, 99, 0.1);
}

.heart-icon-container {
  position: relative;
  display: inline-block;
}

.heart-icon {
  animation: heartBeat 2s ease-in-out infinite;
  position: relative;
  z-index: 2;
}

.heart-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border: 2px solid #e91e63;
  border-radius: 50%;
  animation: heartRipple 3s infinite;
  opacity: 0;
}

.empty-title {
  color: #ad1457;
  animation: slideInUp 0.8s ease-out 0.3s both;
}

.empty-subtitle {
  animation: slideInUp 0.8s ease-out 0.5s both;
}

.features-list {
  animation: slideInUp 0.8s ease-out 0.7s both;
}

.action-section {
  animation: slideInUp 0.8s ease-out 0.9s both;
}

.browse-btn {
  transition: all 0.3s ease;
  border-radius: 25px !important;
  background: linear-gradient(45deg, #e91e63, #9c27b0) !important;
}

.browse-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(233, 30, 99, 0.4);
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

@keyframes heartBeat {
  0%,
  100% {
    transform: scale(1);
  }

  14% {
    transform: scale(1.1);
  }

  28% {
    transform: scale(1);
  }

  42% {
    transform: scale(1.1);
  }

  70% {
    transform: scale(1);
  }
}

@keyframes heartRipple {
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
  .empty-favorites-card {
    margin: 0 16px;
  }

  .heart-icon {
    font-size: 80px !important;
  }

  .heart-pulse {
    width: 80px;
    height: 80px;
  }

  .features-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
}
</style>
