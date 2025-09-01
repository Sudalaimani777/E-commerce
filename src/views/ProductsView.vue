<template>
    <div>
        <div class="page-header mb-6">
            <h1 class="text-h3 font-weight-bold text-primary">Our Products</h1>
            <p class="text-h6 text-medium-emphasis">Discover amazing products at great prices</p>
        </div>

        <!-- Search and Filter Section -->
        <v-card class="mb-6" elevation="2">
            <v-card-text>
                <v-row align="center">
                    <v-col cols="12" md="8">
                        <v-text-field v-model="searchQuery" label="Search products..." prepend-inner-icon="mdi-magnify"
                            variant="outlined" density="compact" clearable hide-details></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-select v-model="selectedCategory" :items="categories" label="Category"
                            prepend-inner-icon="mdi-tag" variant="outlined" density="compact" clearable
                            hide-details></v-select>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <!-- Product Stats -->
        <div class="stats-section mb-6">
            <v-chip class="ma-1" color="primary" variant="outlined">
                <v-icon start>mdi-package-variant</v-icon>
                {{ filteredProducts.length }} Products
            </v-chip>
            <v-chip class="ma-1" color="success" variant="outlined">
                <v-icon start>mdi-star</v-icon>
                Top Rated
            </v-chip>
            <v-chip class="ma-1" color="orange" variant="outlined">
                <v-icon start>mdi-fire</v-icon>
                Trending
            </v-chip>
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
                        <v-btn color="primary" size="large" variant="elevated" prepend-icon="mdi-refresh"
                            @click="retryConnection" :loading="isRetrying" class="retry-btn">
                            {{ isRetrying ? 'Connecting...' : 'Try Again' }}
                        </v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </div>

        <!-- Loading State -->
        <div v-else-if="productStore.loading" class="loading-section">
            <v-row>
                <v-col v-for="i in 8" :key="i" cols="12" sm="6" md="4" lg="3">
                    <v-skeleton-loader type="card" class="mb-4" elevation="2"></v-skeleton-loader>
                </v-col>
            </v-row>
        </div>

        <!-- Products Grid -->
        <div v-else-if="filteredProducts.length > 0">
            <v-row>
                <v-col v-for="product in filteredProducts" :key="product.id" cols="12" sm="6" md="4" lg="3">
                    <ProductCard :product="product" />
                </v-col>
            </v-row>
        </div>

        <!-- No Products Found -->
        <div v-else class="no-products-container">
            <v-card class="no-products-card mx-auto" max-width="500" elevation="4">
                <v-card-text class="text-center pa-8">
                    <div class="search-icon-container mb-6">
                        <v-icon class="search-icon" color="grey-darken-1" size="100">mdi-package-variant-closed</v-icon>
                        <div class="search-pulse"></div>
                    </div>

                    <h2 class="text-h4 font-weight-bold no-products-title mb-4">No Products Found</h2>

                    <p class="text-h6 text-medium-emphasis mb-6">
                        🔍 Try adjusting your search or filter criteria
                    </p>

                    <div class="action-section">
                        <v-btn color="primary" variant="outlined" prepend-icon="mdi-refresh" @click="clearFilters"
                            class="clear-btn">
                            Clear Filters
                        </v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useProductStore } from '@/stores/products';
import ProductCard from '@/components/ProductCard.vue';

const productStore = useProductStore();
const isRetrying = ref(false);
const searchQuery = ref('');
const selectedCategory = ref('');

const categories = ref([
    'electronics',
    'jewelery',
    'men\'s clothing',
    'women\'s clothing'
]);

const filteredProducts = computed(() => {
    let filtered = productStore.products;

    // Filter by search query
    if (searchQuery.value) {
        filtered = filtered.filter(product =>
            product.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }

    // Filter by category
    if (selectedCategory.value) {
        filtered = filtered.filter(product =>
            product.category.toLowerCase() === selectedCategory.value.toLowerCase()
        );
    }

    return filtered;
});

onMounted(async () => {
    await productStore.fetchProducts();
});

async function retryConnection() {
    isRetrying.value = true;
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await productStore.fetchProducts();
    } finally {
        isRetrying.value = false;
    }
}

function clearFilters() {
    searchQuery.value = '';
    selectedCategory.value = '';
}
</script>

<style scoped>
.page-header {
    text-align: center;
    margin-bottom: 2rem;
}

.stats-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
}

/* Offline State Styles */
.offline-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
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

/* No Products Found Styles */
.no-products-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    animation: fadeInUp 0.8s ease-out;
}

.no-products-card {
    border-radius: 16px !important;
    background: linear-gradient(135deg, #f3e5f5 0%, #ce93d8 50%, #ba68c8 100%);
    position: relative;
    overflow: visible;
    border: 1px solid rgba(186, 104, 200, 0.2);
}

.search-icon-container {
    position: relative;
    display: inline-block;
}

.search-icon {
    animation: searchBounce 2s ease-in-out infinite;
    position: relative;
    z-index: 2;
}

.search-pulse {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    border: 3px solid #9c27b0;
    border-radius: 50%;
    animation: searchRipple 3s infinite;
    opacity: 0;
}

.no-products-title {
    color: #7b1fa2;
    animation: slideInUp 0.8s ease-out 0.3s both;
}

.clear-btn {
    transition: all 0.3s ease;
    border-radius: 25px !important;
}

.clear-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(156, 39, 176, 0.3);
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

@keyframes searchBounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
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

@keyframes searchRipple {
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

    .offline-card,
    .no-products-card {
        margin: 0 16px;
    }

    .error-icon,
    .search-icon {
        font-size: 80px !important;
    }

    .error-pulse,
    .search-pulse {
        width: 80px;
        height: 80px;
    }

    .retry-btn,
    .clear-btn {
        width: 100%;
    }
}
</style>
