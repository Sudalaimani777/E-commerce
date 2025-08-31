<template>
  <div>
    <h1 class="text-h4 mb-6">Products</h1>

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

    <div v-if="productStore.loading">
      <v-skeleton-loader v-for="i in 6" :key="i" type="card" class="mb-4"></v-skeleton-loader>
    </div>

    <v-row v-else>
      <v-col v-for="product in productStore.products" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <ProductCard :product="product" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useProductStore } from '@/stores/products';
import ProductCard from '@/components/ProductCard.vue';

const productStore = useProductStore();
const isRetrying = ref(false);

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
</script>

<style scoped>
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
}
</style>